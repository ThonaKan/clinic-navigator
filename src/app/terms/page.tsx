import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="flex items-center justify-center mb-8 text-primary">
          <Compass size={40} className="mr-3" />
          <h1 className="text-4xl font-headline">Clinic Navigator</h1>
        </div>
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-headline">Terms and Privacy Policy</CardTitle>
            <CardDescription>Last Updated: {new Date().toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none dark:prose-invert">
            <section>
              <h2 className="font-semibold text-xl">1. Introduction</h2>
              <p>Welcome to Clinic Navigator ("Service"). These Terms and Conditions ("Terms") govern your use of our Service. By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>
            </section>
            <section>
              <h2 className="font-semibold text-xl">2. Privacy Policy</h2>
              <p>Our Privacy Policy describes how we handle the information you provide to us when you use our Services. You understand that through your use of the Services you consent to the collection and use (as set forth in the Privacy Policy) of this information, including the transfer of this information for storage, processing and use by Clinic Navigator.</p>
              <p>We are committed to protecting the privacy of your personal health information in accordance with applicable laws, including HIPAA where applicable.</p>
            </section>
            <section>
              <h2 className="font-semibold text-xl">3. User Accounts</h2>
              <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
              <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.</p>
            </section>
             <section>
              <h2 className="font-semibold text-xl">4. Use of Service</h2>
              <p>You agree not to use the Service for any purpose that is illegal or prohibited by these Terms. You agree not to use the Service in any manner that could damage, disable, overburden, or impair the Service or interfere with any other party’s use and enjoyment of the Service.</p>
            </section>
            <section>
              <h2 className="font-semibold text-xl">5. Intellectual Property</h2>
              <p>The Service and its original content, features and functionality are and will remain the exclusive property of Clinic Navigator and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>
            </section>
            <section>
              <h2 className="font-semibold text-xl">6. Changes to Terms</h2>
              <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
            </section>
            <section>
              <h2 className="font-semibold text-xl">7. Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us at support@clinicnavigator.example.com.</p>
            </section>
             <img src="https://placehold.co/600x200.png" alt="Legal document" data-ai-hint="legal document" className="mt-4 rounded-md shadow-md w-full opacity-30" />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}