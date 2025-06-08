import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline">Admin Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Welcome to the Admin Dashboard. Manage clinics, users, subscriptions, and system settings.</p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card data-ai-hint="clinic building">
              <CardHeader><CardTitle>Clinics</CardTitle></CardHeader>
              <CardContent><p>Total Clinics: 10</p><img src="https://placehold.co/300x200.png" alt="Clinics" className="mt-2 rounded-md shadow-md" /></CardContent>
            </Card>
            <Card data-ai-hint="users group">
              <CardHeader><CardTitle>Users</CardTitle></CardHeader>
              <CardContent><p>Total Users: 150</p><img src="https://placehold.co/300x200.png" alt="Users" className="mt-2 rounded-md shadow-md" /></CardContent>
            </Card>
             <Card data-ai-hint="subscription plan">
              <CardHeader><CardTitle>Subscriptions</CardTitle></CardHeader>
              <CardContent><p>Active Plans: 5</p><img src="https://placehold.co/300x200.png" alt="Subscriptions" className="mt-2 rounded-md shadow-md" /></CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}