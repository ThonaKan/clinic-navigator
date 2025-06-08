import LoginForm from '@/components/auth/LoginForm';
import { Compass } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-background to-secondary">
      <div className="flex items-center mb-8 text-primary">
        <Compass size={48} className="mr-3" />
        <h1 className="text-5xl font-headline">Clinic Navigator</h1>
      </div>
      <LoginForm />
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
           Explore public clinic pages or view terms.
        </p>
        <div className="space-x-2 mt-2">
            <Button variant="link" asChild>
                <Link href="/clinic/sunnyvale-medical">View Example Clinic</Link>
            </Button>
            <Button variant="link" asChild>
                <Link href="/terms">Terms & Privacy</Link>
            </Button>
        </div>
      </div>
    </main>
  );
}
