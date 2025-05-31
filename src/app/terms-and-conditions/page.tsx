
import Container from '@/components/ui/container';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function TermsAndConditionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow py-12 bg-background text-foreground">
        <Container>
          <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl mx-auto dark:prose-invert">
            <h1 className="text-3xl font-bold mb-6 text-center text-primary">Terms and Conditions</h1>
            <p className="text-center text-sm text-muted-foreground mb-8">Last updated: January 1, 2025</p>

            <div className="bg-destructive/10 border-l-4 border-destructive text-destructive-foreground p-4 mb-8 rounded-md" role="alert">
              <p className="font-bold">Important Notice:</p>
              <p>This is a template Terms and Conditions page. The content provided below is for placeholder and informational purposes only and does not constitute legal advice. You should consult with a qualified legal professional to ensure these terms are appropriate for your specific circumstances and comply with all applicable laws and regulations.</p>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-3">1. Introduction</h2>
            <p>Welcome to Growing Up Muslim Events ("GUM," "we," "us," or "our"). These Terms and Conditions govern your use of our website located at [Your Website URL] (the "Site") and any related services provided by GUM (collectively, the "Services"). By accessing or using our Site and Services, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please do not use our Site or Services.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">2. Use of Our Services</h2>
            <p>You agree to use our Services only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the Services. Prohibited behavior includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our Services.</p>
            <p>We reserve the right to terminate or suspend access to our Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms and Conditions.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">3. Intellectual Property</h2>
            <p>All content included on the Site, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the Site, is the property of GUM or its suppliers and protected by copyright and other intellectual property laws. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service without express written permission by us.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">4. Event Registration and Participation</h2>
            <p>Details regarding event registration, payment (if applicable), cancellation, and conduct at events will be provided on the specific event pages. By registering for an event, you agree to comply with any additional terms and conditions specific to that event.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">5. Contributions and Donations</h2>
            <p>If you choose to make a contribution or donation through our Site, you agree to provide accurate payment information. All contributions are processed through third-party payment processors (e.g., Stripe). Please review their terms and privacy policies.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">6. Disclaimers</h2>
            <p>Our Services are provided on an "AS IS" and "AS AVAILABLE" basis. GUM makes no representations or warranties of any kind, express or implied, as to the operation of their services, or the information, content, materials, or products included on this site. You expressly agree that your use of these services is at your sole risk.</p>
            <p>We do not warrant that the Site, its servers, or e-mail sent from GUM are free of viruses or other harmful components. GUM will not be liable for any damages of any kind arising from the use of this Site or from any information, content, materials, products (including software) or services included on or otherwise made available to you through this Site.</p>


            <h2 className="text-2xl font-semibold mt-8 mb-3">7. Limitation of Liability</h2>
            <p>In no event shall GUM, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">8. Changes to Terms and Conditions</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">9. Governing Law</h2>
            <p>These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction, e.g., Ireland], without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">10. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at info@growingupmuslimevents.com.</p>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
