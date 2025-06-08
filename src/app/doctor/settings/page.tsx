
"use client";

import type { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Palette, Loader2 } from "lucide-react";
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
import { doc, getDoc, setDoc } from "firebase/firestore";
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

export default function DoctorSettingsPage() {
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
            role: dbData.role || 'Doctor', // Set role from DB or default to Doctor
            dateOfBirth: dbData.dateOfBirth || undefined,
            gender: dbData.gender || '',
            address: dbData.address || '',
          });
        } else {
          setProfileData(prev => ({ ...prev, email: currentUser.email || '', role: 'Doctor' }));
          toast({
            title: "Error",
            description: "User profile not found in database.",
            variant: "destructive",
          });
        }
      } else {
        setUser(null);
        // Optionally redirect or show a message if not logged in
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
      // Ensure email and role are not overwritten directly by form but preserved from auth/initial data
      const dataToSave: Partial<UserProfileData> = { 
        fullName: profileData.fullName,
        phone: profileData.phone,
        dateOfBirth: profileData.dateOfBirth,
        gender: profileData.gender,
        address: profileData.address,
        email: user.email, // Keep original email
        role: profileData.role // Keep original role
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
        <h1 className="text-3xl font-headline">Doctor Profile Settings</h1>
        <p>Please log in to view and edit your profile.</p>
        <Button onClick={() => window.location.href = '/login'}>Go to Login</Button>
      </div>
    );
  }

  const dobDate = profileData.dateOfBirth ? parseISO(profileData.dateOfBirth) : undefined;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline">Doctor Profile Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Manage your profile details. Email and Role are managed by administrators.</CardDescription>
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
                placeholder="123 Medical Dr, Health City, USA"
                rows={3}
                disabled={isSaving}
              />
            </div>
          </div>
           <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input 
                    id="role" 
                    value={profileData.role || 'Doctor'} 
                    readOnly 
                    disabled 
                    className="bg-muted/50 cursor-not-allowed"
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
          <CardTitle>Professional Details &amp; Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
           <p className="text-sm text-muted-foreground">Additional professional details like specialization, license number, etc., and specific preferences can be added here in the future.</p>
            <img src="https://placehold.co/600x200.png" alt="Settings placeholder" data-ai-hint="settings gear document" className="mt-2 rounded-md shadow-md w-full opacity-30" />
          <div className="space-y-2 opacity-50 mt-4">
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
            <p className="text-xs text-muted-foreground">Language preference is managed in the header.</p>
          </div>
        </CardContent>
         <CardFooter className="border-t pt-6 flex justify-end">
          <Button disabled> 
            <Save className="mr-2 h-4 w-4" /> Update Preferences
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

    