import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Receipt, DollarSign, History } from "lucide-react";

export default function CashierDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline">Cashier Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card data-ai-hint="invoice document">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            <Receipt className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
            <img src="https://placehold.co/300x150.png" alt="Pending invoices" className="mt-2 rounded-md shadow-sm" />
          </CardContent>
        </Card>
        <Card data-ai-hint="money payment">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Collections</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,250.00</div>
            <p className="text-xs text-muted-foreground">Total received today</p>
            <img src="https://placehold.co/300x150.png" alt="Today's collections" className="mt-2 rounded-md shadow-sm" />
          </CardContent>
        </Card>
        <Card data-ai-hint="payment history">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Transactions</CardTitle>
            <History className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">Processed today</p>
             <img src="https://placehold.co/300x150.png" alt="Recent transactions" className="mt-2 rounded-md shadow-sm" />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Billing Operations</CardTitle>
          <CardDescription>Manage invoices and payments.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
           <button className="p-4 border rounded-lg hover:bg-accent transition-colors text-left">
            <h3 className="font-semibold">Create Invoice</h3>
            <p className="text-sm text-muted-foreground">Generate a new bill for a patient.</p>
          </button>
          <button className="p-4 border rounded-lg hover:bg-accent transition-colors text-left">
            <h3 className="font-semibold">Record Payment</h3>
            <p className="text-sm text-muted-foreground">Log received payments.</p>
          </button>
        </CardContent>
      </Card>
    </div>
  );
}