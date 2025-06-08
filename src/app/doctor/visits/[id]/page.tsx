
"use client";

import type { ChangeEvent, FormEvent } from 'react';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Loader2, UserCircle, CalendarIcon as CalendarIconLucide, History, List } from "lucide-react";
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, addDoc, collection, serverTimestamp, Timestamp, query, where, orderBy, getDocs } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { format, parseISO } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

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

interface VisitRecord extends VisitFormData {
  id: string;
  doctorId: string;
  patientId: string;
  createdAt: Timestamp;
  vitals: {
    temperature: string;
    bp: string;
    heartRate: string;
    respiratoryRate: string;
  };
  // visitDate is already a string in YYYY-MM-DD, but firestore stores it as Timestamp
  visitDateFirestore: Timestamp;
}


export default function DoctorVisitPage() {
  const router = useRouter();
  const params = useParams();
  const patientId = params.id as string;
  const { toast } = useToast();

  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [pastVisits, setPastVisits] = useState<VisitRecord[]>([]);
  const [isLoadingPastVisits, setIsLoadingPastVisits] = useState(true);
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
      const fetchPatientAndVisitData = async () => {
        setIsLoadingPatient(true);
        setIsLoadingPastVisits(true);
        try {
          // Fetch Patient Data
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
            router.push('/doctor/patients');
            return;
          }

          // Fetch Past Visits
          const visitsRef = collection(db, "visits");
          const q = query(visitsRef, where("patientId", "==", patientId), orderBy("visitDate", "desc"));
          const querySnapshot = await getDocs(q);
          const fetchedVisits: VisitRecord[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            fetchedVisits.push({
              id: doc.id,
              patientId: data.patientId,
              doctorId: data.doctorId,
              visitDateFirestore: data.visitDate, // This is the Timestamp
              visitDate: format(data.visitDate.toDate(), 'yyyy-MM-dd'), // Format for display/editing consistency
              vitals: data.vitals || { temperature: '', bp: '', heartRate: '', respiratoryRate: ''},
              temperature: data.vitals?.temperature || '',
              bp: data.vitals?.bp || '',
              heartRate: data.vitals?.heartRate || '',
              respiratoryRate: data.vitals?.respiratoryRate || '',
              symptoms: data.symptoms || '',
              diagnosis: data.diagnosis || '',
              treatmentPlan: data.treatmentPlan || '',
              notes: data.notes || '',
              createdAt: data.createdAt,
            });
          });
          setPastVisits(fetchedVisits);

        } catch (error) {
          console.error("Error fetching patient/visit data:", error);
          toast({
            title: "Error",
            description: "Could not fetch patient or visit data.",
            variant: "destructive",
          });
        } finally {
          setIsLoadingPatient(false);
          setIsLoadingPastVisits(false);
        }
      };
      fetchPatientAndVisitData();
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

      const docRef = await addDoc(collection(db, "visits"), visitDataToSave);

      // Add new visit to the top of the pastVisits list locally for immediate UI update
      const newVisitForState: VisitRecord = {
        id: docRef.id,
        ...visitDataToSave,
        visitDateFirestore: visitDataToSave.visitDate, // store timestamp
        visitDate: formData.visitDate, // keep string for consistency
        temperature: formData.temperature,
        bp: formData.bp,
        heartRate: formData.heartRate,
        respiratoryRate: formData.respiratoryRate,
        createdAt: Timestamp.now(), // Approximate, Firestore will set actual
      };
      setPastVisits(prev => [newVisitForState, ...prev]);


      toast({
        title: "Consultation Saved",
        description: "The visit details have been successfully recorded.",
      });
      setFormData({ 
        visitDate: formData.visitDate, // Keep date or reset?
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
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-headline">
          Consultations for {patientData?.fullName || `Patient ID: ${patientId.substring(0,8)}...`}
        </h1>
         {patientData?.dateOfBirth && (
            <p className="text-sm text-muted-foreground">
                DOB: {format(parseISO(patientData.dateOfBirth), 'PPP')}
            </p>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><History className="mr-2 h-5 w-5"/>Consultation History</CardTitle>
          <CardDescription>Previous visit records for this patient.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingPastVisits ? (
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : pastVisits.length > 0 ? (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {pastVisits.map(visit => (
                <Card key={visit.id} className="bg-muted/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex justify-between items-center">
                      Visit on {format(visit.visitDateFirestore.toDate(), 'PPP')}
                      <span className="text-xs font-normal text-muted-foreground">
                        Recorded: {format(visit.createdAt.toDate(), 'PPp')}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p><strong>Doctor:</strong> (Doctor name if stored, or ID: {visit.doctorId.substring(0,8)}...)</p>
                    <p><strong>Symptoms:</strong> {visit.symptoms || "N/A"}</p>
                    <p><strong>Diagnosis:</strong> {visit.diagnosis || "N/A"}</p>
                    <p><strong>Treatment Plan:</strong> {visit.treatmentPlan || "N/A"}</p>
                    {visit.vitals && (
                      <p className="text-xs text-muted-foreground">
                        Vitals: T: {visit.vitals.temperature}°C, BP: {visit.vitals.bp} mmHg, HR: {visit.vitals.heartRate} bpm, RR: {visit.vitals.respiratoryRate} breaths/min
                      </p>
                    )}
                    {visit.notes && <p className="text-xs italic"><strong>Notes:</strong> {visit.notes}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <List className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No past consultation records found for this patient.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>New Consultation / Update Visit Notes</CardTitle>
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
    </div>
  );
}


    