
"use client";

import type { ChangeEvent, FormEvent} from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

// Define role to path mapping for redirection
const roleToPath: { [key: string]: string } = {
  Admin: '/admin/dashboard',
  Doctor: '/doctor/dashboard',
  Nurse: '/nurse/dashboard',
  Receptionist: '/receptionist/dashboard',
  Cashier: '/cashier/dashboard',
  Patient: '/patient/dashboard',
};

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!email.trim() || !password.trim()) {
      toast({
        title: "Error",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user role from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const userRole = userData.role;

        if (userRole && roleToPath[userRole]) {
          toast({
            title: "Login Successful",
            description: `Welcome ${userData.fullName || user.email}! Redirecting to ${userRole} dashboard...`,
          });
          router.push(roleToPath[userRole]);
        } else {
          toast({
            title: "Login Successful, but Role Undefined",
            description: "Your role is not configured for redirection. Logging you out.",
            variant: "destructive",
          });
          await auth.signOut(); // Sign out user if role is problematic
          router.push('/login');
        }
      } else {
        toast({
          title: "User Data Not Found",
          description: "Could not find user data. Please contact support. Logging you out.",
          variant: "destructive",
        });
        await auth.signOut(); // Sign out user if Firestore data is missing
        router.push('/login');
      }
    } catch (error: any) {
      console.error("Login error:", error);
      let errorMessage = "Login failed. Please check your credentials and try again.";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMessage = "Invalid email or password.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email format.";
      }
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl font-headline text-center">Login to Clinic Navigator</CardTitle>
        <CardDescription className="text-center">
          Enter your email and password to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Button variant="link" asChild className="p-0 h-auto">
            <Link href="/register">Register here</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
