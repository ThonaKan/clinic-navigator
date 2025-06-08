import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserPlus, Search } from "lucide-react";

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-headline">Manage Users</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Add New User
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Input placeholder="Search users..." className="max-w-sm" />
            <Button variant="outline"><Search className="h-4 w-4" /></Button>
          </div>
          <p>Manage all users across all clinics.</p>
          {/* Placeholder for user list table */}
          <div className="mt-4 p-4 border rounded-md bg-muted/50">
            <p className="text-muted-foreground">User list will be displayed here.</p>
            <img src="https://placehold.co/600x300.png" alt="User list placeholder" data-ai-hint="team people" className="mt-2 rounded-md shadow-md w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}