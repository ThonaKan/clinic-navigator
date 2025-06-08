
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";

export default function NurseSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline">Nurse Profile Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Manage your profile details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nurseName">Full Name</Label>
            <Input id="nurseName" defaultValue="Nurse Example (Read-only for now)" readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nurseEmail">Email</Label>
            <Input id="nurseEmail" type="email" defaultValue="nurse@example.com (Read-only)" readOnly />
          </div>
          <p className="text-sm text-muted-foreground">Full profile editing for this role will be implemented later.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent>
           <p className="text-sm text-muted-foreground">Preferences settings for nurses will appear here.</p>
            <img src="https://placehold.co/600x200.png" alt="Settings placeholder" data-ai-hint="checklist options" className="mt-2 rounded-md shadow-md w-full opacity-30" />
        </CardContent>
      </Card>
    </div>
  );
}
