import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Compass, MapPin, Phone, Globe as GlobeIcon } from "lucide-react"; // Renamed Globe to GlobeIcon to avoid conflict
import Image from 'next/image';

// Mock data for a clinic
const getClinicData = async (slug: string) => {
  // In a real app, this would fetch from a DB
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  if (slug === "sunnyvale-medical") {
    return {
      name: "Sunnyvale Medical Center",
      slug: "sunnyvale-medical",
      logoUrl: "https://placehold.co/150x150.png?text=SMC",
      themeColor: "#4A90E2", // Example theme color (blue)
      description: "Providing excellent healthcare services to the Sunnyvale community for over 20 years. Our dedicated team of professionals is here to support your health and well-being.",
      address: "123 Health St, Sunnyvale, CA 94086",
      phone: "(408) 555-1234",
      website: "www.sunnyvalemedical.com",
      services: ["General Checkups", "Pediatrics", "Cardiology", "Urgent Care"],
      coverImageUrl: "https://placehold.co/1200x400.png",
      dataAiHint: "modern hospital"
    };
  }
  return null;
};


export default async function ClinicPage({ params }: { params: { slug: string } }) {
  const clinic = await getClinicData(params.slug);

  if (!clinic) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <Compass size={64} className="text-destructive mb-4" />
        <h1 className="text-4xl font-headline text-destructive mb-2">Clinic Not Found</h1>
        <p className="text-muted-foreground">The clinic page you are looking for does not exist or could not be loaded.</p>
        <Button variant="link" asChild className="mt-4">
          <a href="/">Return Home</a>
        </Button>
      </main>
    );
  }

  // Apply theme color dynamically if possible, e.g., to a banner or specific elements
  // For simplicity, we'll just display it. A real app might use CSS variables.
  const themeStyle = {
    borderTopColor: clinic.themeColor,
    '--clinic-theme-color': clinic.themeColor, // For potential use in CSS
  } as React.CSSProperties;


  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <header className="relative h-64 md:h-80" style={{ backgroundColor: clinic.themeColor || 'var(--primary)'}}>
        <Image 
            src={clinic.coverImageUrl} 
            alt={`${clinic.name} cover image`} 
            layout="fill" 
            objectFit="cover" 
            className="opacity-50"
            data-ai-hint={clinic.dataAiHint}
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center p-4">
          <Image src={clinic.logoUrl} alt={`${clinic.name} Logo`} width={100} height={100} className="rounded-full border-4 border-white shadow-lg mb-4" />
          <h1 className="text-4xl md:text-5xl font-headline text-white shadow-md">{clinic.name}</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Card className="shadow-xl -mt-16 z-10 relative" style={themeStyle}>
          <CardHeader className="border-t-4 rounded-t-lg pt-8"> {/* Dynamic top border */}
            <CardTitle className="text-3xl text-center font-headline" style={{ color: clinic.themeColor }}>Welcome to {clinic.name}</CardTitle>
            <CardDescription className="text-center text-lg mt-2">
              {clinic.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-semibold mb-3" style={{ color: clinic.themeColor }}>Our Services</h2>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {clinic.services.map(service => <li key={service}>{service}</li>)}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3" style={{ color: clinic.themeColor }}>Contact Information</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p className="flex items-center"><MapPin size={18} className="mr-2 flex-shrink-0" style={{ color: clinic.themeColor }}/> {clinic.address}</p>
                  <p className="flex items-center"><Phone size={18} className="mr-2 flex-shrink-0" style={{ color: clinic.themeColor }}/> {clinic.phone}</p>
                  <p className="flex items-center"><GlobeIcon size={18} className="mr-2 flex-shrink-0" style={{ color: clinic.themeColor }}/> <a href={`http://${clinic.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{clinic.website}</a></p>
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <Button size="lg" style={{ backgroundColor: clinic.themeColor, color: 'white' }} className="hover:opacity-90">
                Book an Appointment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
       <footer className="text-center py-8 text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {clinic.name}. Powered by Clinic Navigator.</p>
        </footer>
    </main>
  );
}

// Dynamic metadata for clinic pages
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const clinic = await getClinicData(params.slug);
  if (!clinic) {
    return { title: 'Clinic Not Found - Clinic Navigator' };
  }
  return {
    title: `${clinic.name} - Clinic Navigator`,
    description: clinic.description,
  };
}

// Optional: Generate static paths if you have a known list of clinics
// export async function generateStaticParams() {
//   // const clinics = await fetch('...').then((res) => res.json())
//   // return clinics.map((clinic) => ({ slug: clinic.slug }))
//   return [{ slug: "sunnyvale-medical" }]; // Example
// }
