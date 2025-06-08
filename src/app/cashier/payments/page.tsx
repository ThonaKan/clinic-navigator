import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, History, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function CashierPaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-headline">Record Payments</h1>
         <Button>
          <DollarSign className="mr-2 h-4 w-4" /> Record New Payment
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Record new payments and view transaction history.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Input placeholder="Search payments by patient or transaction ID..." className="max-w-lg" />
            <Button variant="outline"><Search className="h-4 w-4 mr-2" /> Search</Button>
          </div>
          {/* Placeholder for payment list */}
          <div className="mt-4 p-4 border rounded-md bg-muted/50">
             <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Payment #PAY00567 - Patient: Sarah Davis</h3>
               <span className="text-sm text-green-600 font-medium">Completed</span>
            </div>
            <p className="text-sm text-muted-foreground">Date: 2024-07-28 | Amount: $120.00 | Method: Credit Card</p>
            <img src="https://placehold.co/600x150.png" alt="Payment history placeholder" data-ai-hint="financial transaction" className="mt-2 rounded-md shadow-md w-full opacity-20" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}