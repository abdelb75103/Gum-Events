
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
            <p className="text-center text-sm text-muted-foreground mb-8">Last updated: June 1, 2024</p>

            <div className="bg-destructive/10 border-l-4 border-destructive text-destructive-foreground p-4 mb-8 rounded-md" role="alert">
              <p className="font-bold">Important Notice:</p>
              <p>This is a template Terms and Conditions page. The content provided below is for placeholder and informational purposes only and does not constitute legal advice. You should consult with a qualified legal professional to ensure these terms are appropriate for your specific circumstances and comply with all applicable laws and regulations.</p>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-3 text-primary">PART A: WEBSITE USE</h2>

            <h3 className="text-xl font-semibold mt-6 mb-2">1. Use of Our Website</h3>
            <p>You agree to use our website lawfully and not to:</p>
            <ul className="list-disc pl-6">
              <li>Infringe on the rights of others;</li>
              <li>Transmit offensive, abusive, or harmful content;</li>
              <li>Disrupt the functionality or accessibility of the site.</li>
            </ul>
            <p>We reserve the right to restrict or terminate access to any user who violates these Terms without notice.</p>

            <h3 className="text-xl font-semibold mt-6 mb-2">2. Intellectual Property</h3>
            <p>All content on this site (including but not limited to text, logos, images, videos, and design elements) is the intellectual property of GUM Events or its licensors unless otherwise stated. You may not reproduce, distribute, or exploit this content without our prior written permission.</p>

            <h3 className="text-xl font-semibold mt-6 mb-2">3. Third-Party Services</h3>
            <p>Our site may link to third-party platforms (e.g., Stripe, Eventbrite, Google Forms, social media). We do not control these platforms and are not liable for their functionality, content, or terms. Your use of such services is entirely at your own risk and subject to the terms and privacy policies of those third parties.</p>

            <h3 className="text-xl font-semibold mt-6 mb-2">4. Contributions</h3>
            <p>If you choose to make a financial contribution via our linked contribution platform (e.g., Stripe), you agree:</p>
            <ul className="list-disc pl-6">
              <li>Payments are voluntary and generally non-refundable;</li>
              <li>You will provide accurate payment and contact details;</li>
              <li>Refunds, if granted, are solely at our discretion.</li>
            </ul>
            <p>We are not a registered charity.</p>

            <h3 className="text-xl font-semibold mt-6 mb-2">5. Volunteer Sign-Up</h3>
            <p>By submitting your information through our volunteer interest form (hosted via Google Forms), you consent to us using your information to contact you about volunteering opportunities. Submission does not guarantee participation.</p>

            <h3 className="text-xl font-semibold mt-6 mb-2">6. Disclaimer of Warranties</h3>
            <p>Our website and its content are provided “as is” and “as available”. We do not guarantee uninterrupted service, accuracy, or error-free operation.</p>
            <p>We make no warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>

            <h3 className="text-xl font-semibold mt-6 mb-2">7. Limitation of Liability</h3>
            <p>To the fullest extent permitted by law, GUM Events, its directors, employees, and affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from:</p>
            <ul className="list-disc pl-6">
              <li>Your use or inability to use the website;</li>
              <li>Reliance on website content;</li>
              <li>Third-party platform usage;</li>
              <li>Any data loss or system failure.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-10 mb-3 text-primary">PART B: EVENT TERMS</h2>

            <h3 className="text-xl font-semibold mt-6 mb-2">8. Event Registration and Tickets</h3>
            <p>Event access is granted through registration or ticket purchase via third-party platforms.</p>
            <p>By registering, you agree to comply with all venue rules, health and safety requirements, and these Terms.</p>
            <p>We reserve the right to refuse entry or remove individuals at our discretion.</p>

            <h3 className="text-xl font-semibold mt-6 mb-2">9. Changes and Cancellations</h3>
            <p>We may change event details (including speaker line-ups, locations, or schedules) or cancel events for reasons beyond our control. In such cases:</p>
            <ul className="list-disc pl-6">
              <li>We will attempt to notify registered attendees;</li>
              <li>Refunds, if any, are handled by the third-party ticketing provider and subject to their refund policy.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2">10. Photography and Recordings</h3>
            <p>By attending a GUM Event, you consent to the use of your image and likeness in photographs, videos, or recordings for promotional and archival purposes. If you object, please notify us in writing before the event.</p>

            <h3 className="text-xl font-semibold mt-6 mb-2">11. Code of Conduct</h3>
            <p>We expect all participants to treat others with dignity and respect. Harassment, discrimination, or disruptive behaviour will result in immediate removal from the event without refund and may result in exclusion from future events.</p>

            <h3 className="text-xl font-semibold mt-6 mb-2">12. Assumption of Risk</h3>
            <p>Attendance is at your own risk. GUM Events accepts no liability for personal injury, illness, or damage/loss of personal belongings during events. Parents or guardians are fully responsible for minors in attendance.</p>

            <h3 className="text-xl font-semibold mt-6 mb-2">13. Third-Party Providers</h3>
            <p>Where a third-party venue, vendor, or partner is involved in the delivery of an event, their terms and limitations also apply. GUM Events is not liable for any issue arising from third-party services.</p>

            <h2 className="text-2xl font-semibold mt-10 mb-3 text-primary">PART C: GENERAL</h2>

            <h3 className="text-xl font-semibold mt-6 mb-2">14. Modifications to Terms</h3>
            <p>We may update these Terms from time to time. Any significant changes will be posted on our website with an updated effective date. Continued use of the website or participation in events after such changes constitutes acceptance.</p>

            <h3 className="text-xl font-semibold mt-6 mb-2">15. Governing Law</h3>
            <p>These Terms shall be governed by the laws of Ireland. Any disputes shall be subject to the exclusive jurisdiction of the Irish courts, unless otherwise required by mandatory local consumer laws.</p>

            <h3 className="text-xl font-semibold mt-6 mb-2">16. Contact</h3>
            <p>For any queries relating to these Terms or your interactions with GUM Events, please contact:</p>
            <p>GUM Events Limited</p>
            <p>📧 info@growingupmuslimevents.com</p>

          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

    