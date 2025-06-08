
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";

export default function CashierSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline">Cashier Profile Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Manage your profile details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cashierName">Full Name</Label>
            <Input id="cashierName" defaultValue="Cashier Example (Read-only for now)" readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cashierEmail">Email</Label>
            <Input id="cashierEmail" type="email" defaultValue="cashier@example.com (Read-only)" readOnly />
          </div>
           <p className="text-sm text-muted-foreground">Full profile editing for this role will be implemented later.</p>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent>
           <p className="text-sm text-muted-foreground">Preferences settings for cashiers will appear here.</p>
           <img src="https://placehold.co/600x200.png" alt="Settings placeholder" data-ai-hint="money calculator" className="mt-2 rounded-md shadow-md w-full opacity-30" />
        </CardContent>
      </Card>
    </div>
  );
}
