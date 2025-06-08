
"use client";

import type { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User, CalendarIcon as Calendar, PhoneIcon, Mail } from "lucide-react";
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { collection, query, where, getDocs, DocumentData } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

interface Patient {
  uid: string;
  fullName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string; // Stored as YYYY-MM-DD
  // Add other relevant fields as needed
}

export default function DoctorPatientsPage() {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        fetchAssignedPatients(user.uid);
      } else {
        setPatients([]);
        setFilteredPatients([]);
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchAssignedPatients = async (doctorId: string) => {
    setIsLoading(true);
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("role", "==", "Patient"), where("assignedDoctorId", "==", doctorId));
      const querySnapshot = await getDocs(q);
      const fetchedPatients: Patient[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as DocumentData;
        fetchedPatients.push({
          uid: doc.id,
          fullName: data.fullName || "N/A",
          email: data.email || "N/A",
          phone: data.phone,
          dateOfBirth: data.dateOfBirth,
        });
      });
      setPatients(fetchedPatients);
      setFilteredPatients(fetchedPatients);
    } catch (error) {
      console.error("Error fetching assigned patients:", error);
      toast({
        title: "Error",
        description: "Could not fetch assigned patients. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredPatients(patients);
    } else {
      setFilteredPatients(
        patients.filter(patient =>
          patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.uid.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, patients]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-headline">My Patient Records</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Search Your Patients</CardTitle>
          <CardDescription>View and manage records for patients assigned to you.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-6">
            <Input
              placeholder="Search by name, email, or ID..."
              className="max-w-lg"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Button variant="outline"><Search className="h-4 w-4 mr-2" /> Search</Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <Card key={i}>
                  <CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader>
                  <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                  <CardFooter><Skeleton className="h-10 w-full" /></CardFooter>
                </Card>
              ))}
            </div>
          ) : filteredPatients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPatients.map(patient => (
                <Card key={patient.uid} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-6 w-6 text-primary" />
                      {patient.fullName}
                    </CardTitle>
                    <CardDescription>Patient ID: {patient.uid.substring(0, 8)}...</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm flex-grow">
                    <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" /> {patient.email}</p>
                    {patient.phone && <p className="flex items-center gap-2"><PhoneIcon className="h-4 w-4 text-muted-foreground" /> {patient.phone}</p>}
                    {patient.dateOfBirth && <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" /> DOB: {patient.dateOfBirth}</p>}
                  </CardContent>
                  <CardFooter>
                    {/* In a real app, this would link to a detailed patient view/visit page */}
                    <Button className="w-full" asChild>
                       <Link href={`/doctor/visits/${patient.uid}`}>View Details & Visits</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="mt-4 p-4 border rounded-md bg-muted/50 text-center">
              <p className="text-muted-foreground">
                {searchTerm ? "No patients found matching your search criteria." : "No patients are currently assigned to you."}
              </p>
              <img src="https://placehold.co/400x200.png" alt="No patients placeholder" data-ai-hint="empty list document" className="mt-4 rounded-md shadow-sm opacity-50 mx-auto" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
