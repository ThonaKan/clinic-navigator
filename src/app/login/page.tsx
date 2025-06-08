import LoginForm from '@/components/auth/LoginForm';
import { Compass } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-background to-secondary">
      <div className="flex items-center mb-8 text-primary">
        <Compass size={48} className="mr-3" />
        <h1 className="text-5xl font-headline">Clinic Navigator</h1>
      </div>
      <LoginForm />
    </main>
  );
}