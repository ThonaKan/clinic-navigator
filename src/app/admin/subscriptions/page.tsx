import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilePlus } from "lucide-react";

export default function AdminSubscriptionsPage() {
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <h1 className="text-3xl font-headline">Manage Subscriptions</h1>
        <Button>
          <FilePlus className="mr-2 h-4 w-4" /> Create New Plan
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plans &amp; Billing</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Manage subscription plans and view billing information.</p>
          {/* Placeholder for subscription plans and billing info */}
          <div className="mt-4 p-4 border rounded-md bg-muted/50">
            <p className="text-muted-foreground">Subscription details will be displayed here.</p>
             <img src="https://placehold.co/600x300.png" alt="Subscription plans" data-ai-hint="financial chart" className="mt-2 rounded-md shadow-md w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}