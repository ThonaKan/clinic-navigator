import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UserPlus, Save } from "lucide-react";
import { DatePicker } from '@/components/ui/date-picker'; // Assuming a date picker component exists

export default function ReceptionistPatientsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline">Patient Registration</h1>
      <Card>
        <CardHeader>
          <CardTitle>Register New Patient</CardTitle>
          <CardDescription>Enter the details for the new patient.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              {/* Replace with actual DatePicker component if available */}
              <Input id="dob" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              {/* Replace with actual Select component if available */}
              <Input id="gender" placeholder="Male / Female / Other" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="+1 234 567 8900" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address (Optional)</Label>
            <Input id="email" type="email" placeholder="john.doe@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" placeholder="123 Main St, Anytown, USA" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>
            <Save className="mr-2 h-4 w-4" /> Register Patient
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// Create a placeholder DatePicker if not available, or import from shadcn if it is.
// For this iteration, the Input type="date" is a fallback.
// If shadcn has a DatePicker, it should be added to components/ui and imported like:
// import { DatePicker } from "@/components/ui/date-picker"; (and ensure its props are handled)
