import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/admin/dashboard'); // Redirect to Admin Dashboard for testing
  return null; 
}
