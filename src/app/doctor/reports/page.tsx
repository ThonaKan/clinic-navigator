import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function DoctorReportsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline">Patient Reports</h1>
      <Card>
        <CardHeader>
          <CardTitle>Patient Summaries &amp; Case History</CardTitle>
          <CardDescription>Generate and view detailed patient reports.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="flex items-center gap-2 mb-4">
            <Input placeholder="Search reports by patient ID or name..." className="max-w-lg" />
            <Button variant="outline"><Search className="h-4 w-4 mr-2" /> Search</Button>
          </div>
          {/* Placeholder for reports list */}
          <div className="mt-4 p-4 border rounded-md bg-muted/50">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Case History: John Doe - #R67890</h3>
               <Button variant="ghost" size="sm"><Download className="mr-2 h-4 w-4" /> Download PDF</Button>
            </div>
            <p className="text-sm text-muted-foreground">Generated: 2024-07-27</p>
            <p className="text-sm mt-1">This report contains a summary of patient visits, diagnoses, and treatments over the past year.</p>
            <img src="https://placehold.co/600x200.png" alt="Report placeholder" data-ai-hint="medical chart" className="mt-2 rounded-md shadow-md w-full opacity-20" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}