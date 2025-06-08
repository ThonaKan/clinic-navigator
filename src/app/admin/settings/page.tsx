import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Save } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline">Global System Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="systemName">System Name</Label>
            <Input id="systemName" defaultValue="Clinic Navigator" />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="maintenanceMode" />
            <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="defaultLanguage">Default Language</Label>
            {/* In a real app, this would be a select dropdown */}
            <Input id="defaultLanguage" defaultValue="English" />
          </div>
          <div className="flex justify-end">
            <Button>
              <Save className="mr-2 h-4 w-4" /> Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}