"use client";

import type { ChangeEvent, FormEvent} from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginRouter, type LoginRouterInput } from '@/ai/flows/login-router';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function LoginForm() {
  const [userDescription, setUserDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!userDescription.trim()) {
      toast({
        title: "Error",
        description: "Please describe yourself or your reason for logging in.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const input: LoginRouterInput = { userDescription };
      const result = await loginRouter(input);
      
      if (result && result.dashboardRoute) {
        toast({
          title: "Login Successful",
          description: `Redirecting to ${result.role} dashboard...`,
        });
        router.push(result.dashboardRoute);
      } else {
        throw new Error("AI router did not return a valid route.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "Could not determine your role or dashboard. Please try again or contact support.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl font-headline text-center">Welcome to Clinic Navigator</CardTitle>
        <CardDescription className="text-center">
          Please describe who you are or why you are logging in.
          <br /> For example: "I am a doctor here to check my appointments" or "I'm John Doe, a patient."
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="userDescription" className="text-sm">Your Role / Purpose</Label>
            <Textarea
              id="userDescription"
              placeholder="e.g., Admin, Doctor, Patient, or your task..."
              value={userDescription}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setUserDescription(e.target.value)}
              rows={4}
              className="resize-none focus:ring-primary"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
            {isLoading ? 'Processing...' : 'Login / Proceed'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}