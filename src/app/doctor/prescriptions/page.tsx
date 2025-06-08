import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilePlus, Printer, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function DoctorPrescriptionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-headline">Prescriptions</h1>
        <Button>
          <FilePlus className="mr-2 h-4 w-4" /> Create New Prescription
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage &amp; View Prescriptions</CardTitle>
          <CardDescription>Generate new prescriptions and view history.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Input placeholder="Search prescriptions by patient or drug..." className="max-w-lg" />
            <Button variant="outline"><Search className="h-4 w-4 mr-2" /> Search</Button>
          </div>
          {/* Placeholder for prescription list */}
          <div className="mt-4 p-4 border rounded-md bg-muted/50">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Prescription for Jane Smith - #P12345</h3>
              <Button variant="ghost" size="sm"><Printer className="mr-2 h-4 w-4" /> Print</Button>
            </div>
            <p className="text-sm text-muted-foreground">Date: 2024-07-28</p>
            <ul className="list-disc list-inside mt-1 text-sm">
              <li>Amoxicillin 500mg - 1 tab 3 times a day for 7 days</li>
              <li>Paracetamol 500mg - 1-2 tabs as needed for pain</li>
            </ul>
             <img src="https://placehold.co/600x200.png" alt="Prescription details" data-ai-hint="medical document" className="mt-2 rounded-md shadow-md w-full opacity-20" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}