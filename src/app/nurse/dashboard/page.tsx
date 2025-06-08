import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Users, Activity, UploadCloud } from "lucide-react";

export default function NurseDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline">Nurse Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card data-ai-hint="patient queue">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patients Waiting</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">For vital signs check</p>
             <img src="https://placehold.co/300x150.png" alt="Patients waiting" className="mt-2 rounded-md shadow-sm" />
          </CardContent>
        </Card>
        <Card data-ai-hint="lab results">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Lab Uploads</CardTitle>
            <UploadCloud className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Uploaded today</p>
             <img src="https://placehold.co/300x150.png" alt="Lab uploads" className="mt-2 rounded-md shadow-sm" />
          </CardContent>
        </Card>
        <Card data-ai-hint="medical equipment">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks for Today</CardTitle>
            <Activity className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Pending tasks</p>
             <img src="https://placehold.co/300x150.png" alt="Tasks" className="mt-2 rounded-md shadow-sm" />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Perform common nursing tasks efficiently.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
           <button className="p-4 border rounded-lg hover:bg-accent transition-colors text-left">
            <h3 className="font-semibold">Record Vitals</h3>
            <p className="text-sm text-muted-foreground">Input patient vital signs.</p>
          </button>
          <button className="p-4 border rounded-lg hover:bg-accent transition-colors text-left">
            <h3 className="font-semibold">Upload Lab Results</h3>
            <p className="text-sm text-muted-foreground">Attach new lab reports to patient files.</p>
          </button>
        </CardContent>
      </Card>
    </div>
  );
}