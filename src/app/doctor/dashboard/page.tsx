import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { CalendarCheck, Users, FileText } from "lucide-react";

export default function DoctorDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline">Doctor Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card data-ai-hint="calendar appointment">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <CalendarCheck className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
            <img src="https://placehold.co/300x150.png" alt="Appointments" className="mt-2 rounded-md shadow-sm" />
          </CardContent>
        </Card>
        <Card data-ai-hint="patient group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Patients</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Seen today</p>
             <img src="https://placehold.co/300x150.png" alt="Patients" className="mt-2 rounded-md shadow-sm" />
          </CardContent>
        </Card>
        <Card data-ai-hint="medical report">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Awaiting signature</p>
            <img src="https://placehold.co/300x150.png" alt="Reports" className="mt-2 rounded-md shadow-sm" />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
          <CardDescription>Access common tasks quickly.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <button className="p-4 border rounded-lg hover:bg-accent transition-colors text-left">
            <h3 className="font-semibold">View Patient Records</h3>
            <p className="text-sm text-muted-foreground">Search and access patient files.</p>
          </button>
          <button className="p-4 border rounded-lg hover:bg-accent transition-colors text-left">
            <h3 className="font-semibold">Create Prescription</h3>
            <p className="text-sm text-muted-foreground">Generate a new prescription.</p>
          </button>
        </CardContent>
      </Card>
    </div>
  );
}