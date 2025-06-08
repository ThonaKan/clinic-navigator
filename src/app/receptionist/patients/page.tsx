
"use client";

import type { ChangeEvent, FormEvent } from 'react';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UserPlus } from "lucide-react";
import { format } from 'date-fns';

interface PatientFormData {
  firstName: string;
  lastName: string;
  email: string;
  passwordOne: string;
  passwordTwo: string;
  dateOfBirth?: Date;
  gender: string;
  phone: string;
  address: string;
  assignedDoctorId: string;
}

interface Doctor {
  uid: string;
  fullName: string;
}

const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];

export default function ReceptionistPatientsPage() {
  const [formData, setFormData] = useState<PatientFormData>({
    firstName: '',
    lastName: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    dateOfBirth: undefined,
    gender: '',
    phone: '',
    address: '',
    assignedDoctorId: '',
  });
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoadingDoctors, setIsLoadingDoctors] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoadingDoctors(true);
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("role", "==", "Doctor"));
        const querySnapshot = await getDocs(q);
        const fetchedDoctors: Doctor[] = [];
        querySnapshot.forEach((doc) => {
          fetchedDoctors.push({ uid: doc.id, fullName: doc.data().fullName || `Doctor ${doc.id.substring(0,5)}` });
        });
        setDoctors(fetchedDoctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        toast({
          title: "Error Fetching Doctors",
          description: "Could not load the list of doctors. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingDoctors(false);
      }
    };
    fetchDoctors();
  }, [toast]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleDateChange = (date?: Date) => {
    setFormData(prev => ({ ...prev, dateOfBirth: date }));
  };

  const handleSelectChange = (id: keyof PatientFormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      toast({ title: "Missing Information", description: "Please fill in first name, last name, and email.", variant: "destructive" });
      setIsSaving(false);
      return;
    }
    if (formData.passwordOne.length < 6) {
      toast({ title: "Weak Password", description: "Password must be at least 6 characters long.", variant: "destructive" });
      setIsSaving(false);
      return;
    }
    if (formData.passwordOne !== formData.passwordTwo) {
      toast({ title: "Password Mismatch", description: "Passwords do not match.", variant: "destructive" });
      setIsSaving(false);
      return;
    }
    if (!formData.assignedDoctorId) {
      toast({ title: "Doctor Not Assigned", description: "Please assign a doctor to the patient.", variant: "destructive" });
      setIsSaving(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.passwordOne);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        fullName: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth ? format(formData.dateOfBirth, 'yyyy-MM-dd') : null,
        gender: formData.gender,
        address: formData.address,
        role: "Patient",
        assignedDoctorId: formData.assignedDoctorId,
        createdAt: Timestamp.now(),
        registeredBy: auth.currentUser?.uid || "Receptionist", // Track who registered
      });

      toast({ title: "Patient Registered", description: `${formData.firstName} ${formData.lastName} has been successfully registered.` });
      setFormData({ // Reset form
        firstName: '', lastName: '', email: '', passwordOne: '', passwordTwo: '',
        dateOfBirth: undefined, gender: '', phone: '', address: '', assignedDoctorId: '',
      });

    } catch (error: any) {
      console.error("Error registering patient:", error);
      let errorMessage = "Could not register patient. Please try again.";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "This email address is already in use by another account.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "The password is too weak. It must be at least 6 characters.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "The email address is not valid.";
      }
      toast({ title: "Registration Failed", description: errorMessage, variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline">Patient Registration</h1>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Register New Patient</CardTitle>
            <CardDescription>Enter the patient's details and assign a doctor.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" value={formData.firstName} onChange={handleInputChange} required disabled={isSaving} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" value={formData.lastName} onChange={handleInputChange} required disabled={isSaving} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="patient@example.com" value={formData.email} onChange={handleInputChange} required disabled={isSaving} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 234 567 8900" value={formData.phone} onChange={handleInputChange} disabled={isSaving} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="passwordOne">Password</Label>
                    <Input id="passwordOne" type="password" placeholder="Min. 6 characters" value={formData.passwordOne} onChange={handleInputChange} required disabled={isSaving} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="passwordTwo">Confirm Password</Label>
                    <Input id="passwordTwo" type="password" placeholder="Re-enter password" value={formData.passwordTwo} onChange={handleInputChange} required disabled={isSaving} />
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <DatePicker date={formData.dateOfBirth} setDate={handleDateChange} className={isSaving ? "disabled:opacity-50" : ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={handleSelectChange('gender')} disabled={isSaving}>
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
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" placeholder="123 Main St, Anytown, USA" value={formData.address} onChange={handleInputChange} rows={3} disabled={isSaving} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignedDoctorId">Assign to Doctor</Label>
              <Select value={formData.assignedDoctorId} onValueChange={handleSelectChange('assignedDoctorId')} required disabled={isSaving || isLoadingDoctors}>
                <SelectTrigger id="assignedDoctorId">
                  <SelectValue placeholder={isLoadingDoctors ? "Loading doctors..." : "Select a doctor"} />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingDoctors ? (
                    <SelectItem value="loading" disabled>Loading doctors...</SelectItem>
                  ) : doctors.length > 0 ? (
                    doctors.map(doctor => (
                      <SelectItem key={doctor.uid} value={doctor.uid}>{doctor.fullName}</SelectItem>
                    ))
                  ) : (
                     <SelectItem value="no-doctors" disabled>No doctors available</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isSaving || isLoadingDoctors}>
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
              {isSaving ? 'Registering Patient...' : 'Register Patient'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

    