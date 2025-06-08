import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Compass, UserPlus } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-background to-secondary">
      <div className="flex items-center mb-8 text-primary">
        <Compass size={48} className="mr-3" />
        <h1 className="text-5xl font-headline">Clinic Navigator</h1>
      </div>
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-center">Register Account</CardTitle>
          <CardDescription className="text-center">
            Create a new account or register your clinic.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* This is a placeholder. Registration logic would be complex. */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name / Clinic Name</Label>
            <Input id="fullName" placeholder="e.g., Dr. Jane Doe or City Central Clinic" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" />
          </div>
           <Button type="submit" className="w-full">
            <UserPlus className="mr-2 h-4 w-4" /> Register
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
           <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Button variant="link" asChild className="p-0 h-auto">
              <Link href="/login">Login here</Link>
            </Button>
          </p>
           <img src="https://placehold.co/400x100.png" alt="Registration illustration" data-ai-hint="user registration" className="mt-4 rounded-md shadow-md w-full opacity-30" />
        </CardFooter>
      </Card>
    </main>
  );
}