import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { CalendarDays, ClipboardList, UserCircle, Bell } from "lucide-react";

export default function PatientDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline">Welcome, Patient!</h1>
      <Card data-ai-hint="notification bell">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Notifications</CardTitle>
          <Bell className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">You have an upcoming appointment tomorrow at 10:00 AM with Dr. Smith.</p>
          <img src="https://placehold.co/600x100.png" alt="Notification placeholder" className="mt-2 rounded-md shadow-sm opacity-30" />
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow" data-ai-hint="calendar schedule">
          <CardHeader>
            <CalendarDays className="h-8 w-8 text-accent mb-2" />
            <CardTitle>My Appointments</CardTitle>
            <CardDescription>View upcoming and past appointments.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Next appointment: July 29, 2024</p>
            <img src="https://placehold.co/300x150.png" alt="Appointments" className="mt-2 rounded-md shadow-sm" />
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow" data-ai-hint="medical record">
          <CardHeader>
            <ClipboardList className="h-8 w-8 text-accent mb-2" />
            <CardTitle>My Records</CardTitle>
            <CardDescription>Access your visit summaries and prescriptions.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Last visit: July 15, 2024</p>
            <img src="https://placehold.co/300x150.png" alt="Medical records" className="mt-2 rounded-md shadow-sm" />
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow" data-ai-hint="profile settings">
          <CardHeader>
            <UserCircle className="h-8 w-8 text-accent mb-2" />
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Manage your personal information and password.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Update your contact details.</p>
            <img src="https://placehold.co/300x150.png" alt="Profile settings" className="mt-2 rounded-md shadow-sm" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}