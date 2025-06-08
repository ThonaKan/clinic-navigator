import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

export default function DoctorVisitPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline">Consultation for Visit ID: {params.id}</h1>
      <Card>
        <CardHeader>
          <CardTitle>Patient Vitals &amp; Consultation Notes</CardTitle>
          <CardDescription>Record patient vitals, symptoms, diagnosis, and treatment plan.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientName">Patient Name</Label>
              <Input id="patientName" defaultValue="John Doe (Read-only)" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="visitDate">Visit Date</Label>
              <Input id="visitDate" type="date" defaultValue={new Date().toISOString().substring(0,10)} />
            </div>
          </div>
          
          <fieldset className="border p-4 rounded-md">
            <legend className="text-lg font-medium px-1">Vitals</legend>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              <div className="space-y-1">
                <Label htmlFor="temperature">Temperature (°C)</Label>
                <Input id="temperature" placeholder="e.g., 37.5" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="bp">Blood Pressure</Label>
                <Input id="bp" placeholder="e.g., 120/80" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                <Input id="heartRate" placeholder="e.g., 75" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="respiratoryRate">Respiratory Rate</Label>
                <Input id="respiratoryRate" placeholder="e.g., 16" />
              </div>
            </div>
          </fieldset>

          <div className="space-y-2">
            <Label htmlFor="symptoms">Symptoms</Label>
            <Textarea id="symptoms" placeholder="Describe patient's symptoms..." rows={3} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="diagnosis">Diagnosis</Label>
            <Textarea id="diagnosis" placeholder="Enter diagnosis..." rows={3} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="treatmentPlan">Treatment Plan</Label>
            <Textarea id="treatmentPlan" placeholder="Outline treatment plan..." rows={3} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea id="notes" placeholder="Any other notes..." rows={2} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>
            <Save className="mr-2 h-4 w-4" /> Save Consultation
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}