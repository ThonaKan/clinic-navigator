import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilePlus, Printer, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function CashierInvoicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-headline">Manage Invoices</h1>
        <Button>
          <FilePlus className="mr-2 h-4 w-4" /> Create New Invoice
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Invoice List</CardTitle>
          <CardDescription>Create, view, and print invoices.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Input placeholder="Search invoices by patient ID or invoice number..." className="max-w-lg" />
            <Button variant="outline"><Search className="h-4 w-4 mr-2" /> Search</Button>
          </div>
          {/* Placeholder for invoice list */}
          <div className="mt-4 p-4 border rounded-md bg-muted/50">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Invoice #INV00123 - Patient: Michael Brown</h3>
               <Button variant="ghost" size="sm"><Printer className="mr-2 h-4 w-4" /> Print</Button>
            </div>
            <p className="text-sm text-muted-foreground">Date: 2024-07-28 | Amount: $75.00 | Status: Paid</p>
            <img src="https://placehold.co/600x150.png" alt="Invoice placeholder" data-ai-hint="bill document" className="mt-2 rounded-md shadow-md w-full opacity-20" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}