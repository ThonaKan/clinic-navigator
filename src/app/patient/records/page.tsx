import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, ClipboardList, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PatientRecordsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline">My Medical Records</h1>
      <Tabs defaultValue="summaries" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="summaries"><ClipboardList className="mr-2 h-4 w-4" />Visit Summaries</TabsTrigger>
          <TabsTrigger value="prescriptions"><FileText className="mr-2 h-4 w-4" />Prescriptions</TabsTrigger>
        </TabsList>
        <TabsContent value="summaries">
          <Card>
            <CardHeader>
              <CardTitle>Visit Summaries</CardTitle>
              <CardDescription>View summaries of your past consultations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Placeholder for visit summaries */}
              <div className="p-4 border rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Visit on July 15, 2024 with Dr. A. Smith</h3>
                    <p className="text-sm text-muted-foreground">Diagnosis: Common Cold</p>
                  </div>
                  <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4"/>Download PDF</Button>
                </div>
                 <img src="https://placehold.co/600x100.png" alt="Visit summary placeholder" data-ai-hint="document report" className="mt-2 rounded-md shadow-md w-full opacity-20" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="prescriptions">
          <Card>
            <CardHeader>
              <CardTitle>Prescriptions</CardTitle>
              <CardDescription>View your medication history.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Placeholder for prescriptions */}
              <div className="p-4 border rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Prescription from Dr. A. Smith - July 15, 2024</h3>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      <li>Amoxicillin 250mg - 1 tablet twice a day</li>
                    </ul>
                  </div>
                  <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4"/>Download PDF</Button>
                </div>
                <img src="https://placehold.co/600x100.png" alt="Prescription placeholder" data-ai-hint="medication pill" className="mt-2 rounded-md shadow-md w-full opacity-20" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}