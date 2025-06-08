"use client";

import type { ChangeEvent, FormEvent } from 'react';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Loader2, UserCircle, CalendarIcon as CalendarIconLucide } from "lucide-react";
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, addDoc, collection, serverTimestamp, Timestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { format, parseISO } from 'date-fns';

interface PatientData {
  fullName: string;
  dateOfBirth?: string; // Stored as YYYY-MM-DD
}

interface VisitFormData {
  visitDate: string;
  temperature: string;
  bp: string; // Blood Pressure
  heartRate: string;
  respiratoryRate: string;
  symptoms: string;
  diagnosis: string;
  treatmentPlan: string;
  notes: string;
}

export default function DoctorVisitPage() {
  const router = useRouter();
  const params = useParams();
  const patientId = params.id as string;
  const { toast } = useToast();

  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [formData, setFormData] = useState<VisitFormData>({
    visitDate: format(new Date(), 'yyyy-MM-dd'),
    temperature: '',
    bp: '',
    heartRate: '',
    respiratoryRate: '',
    symptoms: '',
    diagnosis: '',
    treatmentPlan: '',
    notes: '',
  });
  const [isLoadingPatient, setIsLoadingPatient] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (patientId) {
      const fetchPatientData = async () => {
        setIsLoadingPatient(true);
        try {
          const patientDocRef = doc(db, "users", patientId);
          const patientDocSnap = await getDoc(patientDocRef);
          if (patientDocSnap.exists()) {
            const data = patientDocSnap.data();
            setPatientData({
              fullName: data.fullName || "N/A",
              dateOfBirth: data.dateOfBirth,
            });
          } else {
            toast({
              title: "Error",
              description: "Patient data not found.",
              variant: "destructive",
            });
            router.push('/doctor/patients'); // Redirect if patient not found
          }
        } catch (error) {
          console.error("Error fetching patient data:", error);
          toast({
            title: "Error",
            description: "Could not fetch patient data.",
            variant: "destructive",
          });
        } finally {
          setIsLoadingPatient(false);
        }
      };
      fetchPatientData();
    }
  }, [patientId, toast, router]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, visitDate: e.target.value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!auth.currentUser) {
      toast({ title: "Authentication Error", description: "You must be logged in to save a consultation.", variant: "destructive" });
      return;
    }
    setIsSaving(true);
    try {
      const doctorId = auth.currentUser.uid;
      const visitDataToSave = {
        patientId,
        doctorId,
        visitDate: Timestamp.fromDate(parseISO(formData.visitDate)),
        vitals: {
          temperature: formData.temperature,
          bp: formData.bp,
          heartRate: formData.heartRate,
          respiratoryRate: formData.respiratoryRate,
        },
        symptoms: formData.symptoms,
        diagnosis: formData.diagnosis,
        treatmentPlan: formData.treatmentPlan,
        notes: formData.notes,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "visits"), visitDataToSave);

      toast({
        title: "Consultation Saved",
        description: "The visit details have been successfully recorded.",
      });
      // Optionally, reset form or navigate away
      // router.push(`/doctor/patients/${patientId}`); // Or back to patient list
      setFormData({ // Reset form partially, keep visit date?
        visitDate: formData.visitDate,
        temperature: '', bp: '', heartRate: '', respiratoryRate: '',
        symptoms: '', diagnosis: '', treatmentPlan: '', notes: '',
      });

    } catch (error) {
      console.error("Error saving consultation:", error);
      toast({
        title: "Save Error",
        description: "Could not save consultation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoadingPatient) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4">Loading patient details...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-headline">
          Consultation for {patientData?.fullName || `Patient ID: ${patientId.substring(0,8)}...`}
        </h1>
         {patientData?.dateOfBirth && (
            <p className="text-sm text-muted-foreground">
                DOB: {format(parseISO(patientData.dateOfBirth), 'PPP')}
            </p>
        )}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Patient Vitals &amp; Consultation Notes</CardTitle>
          <CardDescription>Record patient vitals, symptoms, diagnosis, and treatment plan for this visit.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <div className="space-y-2">
              <Label htmlFor="patientNameDisplay"><UserCircle className="inline h-4 w-4 mr-1"/>Patient Name</Label>
              <Input id="patientNameDisplay" value={patientData?.fullName || "Loading..."} readOnly className="bg-muted/50"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="visitDate"><CalendarIconLucide className="inline h-4 w-4 mr-1"/>Visit Date</Label>
              <Input 
                id="visitDate" 
                type="date" 
                value={formData.visitDate} 
                onChange={handleDateChange} 
                required 
                disabled={isSaving}
              />
            </div>
          </div>
          
          <fieldset className="border p-4 rounded-md shadow-sm">
            <legend className="text-lg font-medium px-1 mb-2">Vitals</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <Label htmlFor="temperature">Temperature (°C)</Label>
                <Input id="temperature" placeholder="e.g., 37.5" value={formData.temperature} onChange={handleInputChange} disabled={isSaving}/>
              </div>
              <div className="space-y-1">
                <Label htmlFor="bp">Blood Pressure (mmHg)</Label>
                <Input id="bp" placeholder="e.g., 120/80" value={formData.bp} onChange={handleInputChange} disabled={isSaving}/>
              </div>
              <div className="space-y-1">
                <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                <Input id="heartRate" placeholder="e.g., 75" value={formData.heartRate} onChange={handleInputChange} disabled={isSaving}/>
              </div>
              <div className="space-y-1">
                <Label htmlFor="respiratoryRate">Resp. Rate (breaths/min)</Label>
                <Input id="respiratoryRate" placeholder="e.g., 16" value={formData.respiratoryRate} onChange={handleInputChange} disabled={isSaving}/>
              </div>
            </div>
          </fieldset>

          <div className="space-y-2">
            <Label htmlFor="symptoms">Symptoms</Label>
            <Textarea id="symptoms" placeholder="Describe patient's symptoms..." rows={3} value={formData.symptoms} onChange={handleInputChange} disabled={isSaving} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="diagnosis">Diagnosis</Label>
            <Textarea id="diagnosis" placeholder="Enter diagnosis (e.g., ICD-10 codes if applicable)..." rows={3} value={formData.diagnosis} onChange={handleInputChange} disabled={isSaving} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="treatmentPlan">Treatment Plan</Label>
            <Textarea id="treatmentPlan" placeholder="Outline treatment plan, medications, follow-up..." rows={4} value={formData.treatmentPlan} onChange={handleInputChange} disabled={isSaving} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea id="notes" placeholder="Any other relevant notes for this visit..." rows={2} value={formData.notes} onChange={handleInputChange} disabled={isSaving} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 border-t pt-6">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSaving}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving || isLoadingPatient}>
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {isSaving ? 'Saving...' : 'Save Consultation'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}