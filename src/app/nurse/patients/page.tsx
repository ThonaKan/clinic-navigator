import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UploadCloud, Thermometer } from "lucide-react";

export default function NursePatientsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline">Manage Patients</h1>
      <Card>
        <CardHeader>
          <CardTitle>Patient List</CardTitle>
          <CardDescription>Search for patients to record vitals or upload lab results.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Input placeholder="Search patients by name or ID..." className="max-w-lg" />
            <Button variant="outline"><Search className="h-4 w-4 mr-2" /> Search</Button>
          </div>
          {/* Placeholder for patient list and actions */}
          <div className="mt-4 p-4 border rounded-md bg-muted/50">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Patient: Alice Johnson</h3>
              <div className="space-x-2">
                <Button variant="outline" size="sm"><Thermometer className="mr-2 h-4 w-4" /> Record Vitals</Button>
                <Button variant="outline" size="sm"><UploadCloud className="mr-2 h-4 w-4" /> Upload Labs</Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">ID: P00789 | Last Visit: 2024-07-25</p>
            <img src="https://placehold.co/600x150.png" alt="Patient actions placeholder" data-ai-hint="nurse patient" className="mt-2 rounded-md shadow-md w-full opacity-20" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}