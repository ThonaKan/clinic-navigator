
"use client";

import type { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Save, Palette, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

interface UserProfileData {
  fullName: string;
  email: string;
  phone: string;
  role?: string;
}

export default function PatientSettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [profileData, setProfileData] = useState<UserProfileData>({
    fullName: '',
    email: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const dbData = userDocSnap.data();
          setProfileData({
            fullName: dbData.fullName || '',
            email: currentUser.email || dbData.email || '', // Prefer auth email, fallback to db
            phone: dbData.phone || '',
            role: dbData.role || 'Patient',
          });
        } else {
          // Should not happen if user registered correctly
          setProfileData(prev => ({ ...prev, email: currentUser.email || '' }));
          toast({
            title: "Error",
            description: "User profile not found in database.",
            variant: "destructive",
          });
        }
      } else {
        setUser(null);
        // Optionally, redirect to login or show a message
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [toast]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfileData(prev => ({ ...prev, [id]: value }));
  };

  const handleSaveProfile = async () => {
    if (!user) {
      toast({ title: "Not Authenticated", description: "Please log in to save.", variant: "destructive" });
      return;
    }
    setIsSaving(true);
    try {
      const userDocRef = doc(db, "users", user.uid);
      // Preserve role and email from auth, only update fullName and phone from form
      await setDoc(userDocRef, { 
        fullName: profileData.fullName,
        phone: profileData.phone,
        email: user.email, // Keep email from auth
        role: profileData.role // Preserve existing role
      }, { merge: true }); 
      toast({ title: "Profile Saved", description: "Your information has been updated." });
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({ title: "Save Error", description: "Could not save profile. Please try again.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-6 text-center">
        <h1 className="text-3xl font-headline">Profile Settings</h1>
        <p>Please log in to view and edit your profile.</p>
        <Button onClick={() => window.location.href = '/login'}>Go to Login</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline">Profile Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your contact details and preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input 
              id="fullName" 
              value={profileData.fullName} 
              onChange={handleInputChange} 
              disabled={isSaving}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              value={profileData.email} 
              readOnly 
              disabled // Email typically not changed here or requires re-authentication
              className="bg-muted/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              type="tel" 
              value={profileData.phone} 
              onChange={handleInputChange} 
              placeholder="e.g., +1 234 567 8900"
              disabled={isSaving}
            />
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6 flex justify-end">
          <Button onClick={handleSaveProfile} disabled={isSaving || isLoading}>
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {isSaving ? 'Saving...' : 'Save Profile'}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security &amp; Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Password change functionality would typically be handled by Firebase Auth methods */}
          <p className="text-sm text-muted-foreground">Password change functionality is typically handled via email reset or requires re-authentication. For this demo, it's not implemented here.</p>
          
          {/* Placeholder for password fields - non-functional in this update */}
          <div className="space-y-2 opacity-50">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" disabled />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-50">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" disabled />
            </div>
          </div>
           <div className="space-y-2">
            <Label htmlFor="language">Language Preference <Palette className="inline h-4 w-4 ml-1 text-muted-foreground" /></Label>
            <Select defaultValue="en" disabled>
              <SelectTrigger id="language" className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English (US)</SelectItem>
                <SelectItem value="km">Khmer (ភាសាខ្មែរ)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Language preference is managed in the header for now.</p>
          </div>
        </CardContent>
         <CardFooter className="border-t pt-6 flex justify-end">
          <Button disabled> {/* Kept disabled as per current scope */}
            <Save className="mr-2 h-4 w-4" /> Update Settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
