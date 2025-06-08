import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileScan, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function NurseLabsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-headline">Lab Result Uploads</h1>
        <Button>
          <UploadCloud className="mr-2 h-4 w-4" /> Upload New Lab Result
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Lab Results</CardTitle>
          <CardDescription>Upload and view lab results for patients.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Input placeholder="Search lab results by patient ID or test name..." className="max-w-lg" />
            <Button variant="outline"><Search className="h-4 w-4 mr-2" /> Search</Button>
          </div>
          {/* Placeholder for lab results list */}
          <div className="mt-4 p-4 border rounded-md bg-muted/50">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Lab Report: Blood Test - Patient Bob Williams</h3>
               <Button variant="ghost" size="sm"><FileScan className="mr-2 h-4 w-4" /> View Details</Button>
            </div>
            <p className="text-sm text-muted-foreground">Uploaded: 2024-07-28 by Nurse Eve</p>
            <img src="https://placehold.co/600x150.png" alt="Lab result placeholder" data-ai-hint="lab test" className="mt-2 rounded-md shadow-md w-full opacity-20" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}