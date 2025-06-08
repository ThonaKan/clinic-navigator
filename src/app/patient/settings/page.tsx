
"use client";

import type { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // For address if it needs more space
import { Save, Palette, Loader2, CalendarIcon as CalendarIconLucide } from "lucide-react"; // Renamed to avoid conflict
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { format, parseISO } from 'date-fns';

interface UserProfileData {
  fullName: string;
  email: string;
  phone: string;
  role?: string;
  dateOfBirth?: string; // Stored as YYYY-MM-DD string
  gender?: string;
  address?: string;
}

const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];

export default function PatientSettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [profileData, setProfileData] = useState<UserProfileData>({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: undefined,
    gender: '',
    address: '',
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
            email: currentUser.email || dbData.email || '',
            phone: dbData.phone || '',
            role: dbData.role || 'Patient',
            dateOfBirth: dbData.dateOfBirth || undefined, // Expects YYYY-MM-DD string
            gender: dbData.gender || '',
            address: dbData.address || '',
          });
        } else {
          setProfileData(prev => ({ ...prev, email: currentUser.email || '' }));
          toast({
            title: "Error",
            description: "User profile not found in database.",
            variant: "destructive",
          });
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [toast]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setProfileData(prev => ({ ...prev, [id]: value }));
  };

  const handleGenderChange = (value: string) => {
    setProfileData(prev => ({ ...prev, gender: value }));
  };

  const handleDateOfBirthChange = (date?: Date) => {
    setProfileData(prev => ({ ...prev, dateOfBirth: date ? format(date, 'yyyy-MM-dd') : undefined }));
  };

  const handleSaveProfile = async () => {
    if (!user) {
      toast({ title: "Not Authenticated", description: "Please log in to save.", variant: "destructive" });
      return;
    }
    setIsSaving(true);
    try {
      const userDocRef = doc(db, "users", user.uid);
      const dataToSave: Partial<UserProfileData> = { 
        fullName: profileData.fullName,
        phone: profileData.phone,
        dateOfBirth: profileData.dateOfBirth,
        gender: profileData.gender,
        address: profileData.address,
        // email and role are not updated from this form directly
        email: user.email, 
        role: profileData.role 
      };
      
      // Remove undefined fields before saving
      Object.keys(dataToSave).forEach(key => {
        if (dataToSave[key as keyof UserProfileData] === undefined) {
          delete dataToSave[key as keyof UserProfileData];
        }
      });

      await setDoc(userDocRef, dataToSave, { merge: true }); 
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

  // Convert string date to Date object for DatePicker
  const dobDate = profileData.dateOfBirth ? parseISO(profileData.dateOfBirth) : undefined;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline">Profile Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your contact details and preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                value={profileData.fullName} 
                onChange={handleInputChange} 
                disabled={isSaving}
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={profileData.email} 
                readOnly 
                disabled 
                className="bg-muted/50 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <DatePicker
                date={dobDate}
                setDate={handleDateOfBirthChange}
                className={isSaving ? "disabled:opacity-50" : ""}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select 
                value={profileData.gender} 
                onValueChange={handleGenderChange}
                disabled={isSaving}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {genderOptions.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={profileData.address}
                onChange={handleInputChange}
                placeholder="123 Main St, Anytown, USA"
                rows={3}
                disabled={isSaving}
              />
            </div>
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
          <p className="text-sm text-muted-foreground">Password change functionality is typically handled via email reset or requires re-authentication. For this demo, it's not implemented here.</p>
          
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
          <Button disabled> 
            <Save className="mr-2 h-4 w-4" /> Update Settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

    