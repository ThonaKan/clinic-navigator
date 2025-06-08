import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/login'); // Redirect to Login page as auth is being implemented
  return null; 
}
