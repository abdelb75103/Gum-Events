
import Container from '@/components/ui/container';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow py-12 bg-background text-foreground">
        <Container>
          <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl mx-auto dark:prose-invert">
            <h1 className="text-3xl font-bold mb-6 text-center text-primary">Privacy Policy</h1>
            <p className="text-center text-sm text-muted-foreground mb-8">Last updated: June 1, 2025</p>

            <p>GUM Events Limited (“GUM Events”, “we”, “us”, “our”) respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, share, and protect your personal data in accordance with the General Data Protection Regulation (EU GDPR), the Irish Data Protection Acts, and other applicable laws.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">1. When We Collect Your Personal Data</h2>
            <p>We may collect your data when you:</p>
            <ul className="list-disc pl-6">
              <li>Register for or attend one of our events;</li>
              <li>Contribute via our website;</li>
              <li>Subscribe to newsletters or communications;</li>
              <li>Volunteer or apply for opportunities;</li>
              <li>Interact with us via email, phone, or our website;</li>
              <li>Engage with us on social media;</li>
              <li>Use our website (see “Cookies” below).</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-3">2. What Personal Data We Collect</h2>
            <p>We may collect:</p>
            <ul className="list-disc pl-6">
              <li><strong>Identity & Contact Data</strong> (name, email, phone number, address);</li>
              <li><strong>Financial Data</strong> (contribution amounts, payment method, but not card details);</li>
              <li><strong>Technical Data</strong> (IP address, browser type, device, usage patterns);</li>
              <li><strong>Communication Data</strong> (queries, feedback, messages);</li>
              <li><strong>Volunteer/Employment Data</strong> (CVs, references, availability, etc., if applicable).</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-3">3. Why We Use Your Personal Data</h2>
            <p>We process your personal data to:</p>
            <ul className="list-disc pl-6">
              <li>Deliver and manage events and registrations;</li>
              <li>Process and acknowledge contributions;</li>
              <li>Send you newsletters and marketing (only with your consent);</li>
              <li>Respond to your enquiries or support requests;</li>
              <li>Manage volunteers or employment applications;</li>
              <li>Improve our services and user experience;</li>
              <li>Comply with our legal obligations (e.g. record keeping, tax).</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-3">4. Legal Bases for Processing</h2>
            <p>Our legal bases under Article 6 GDPR include:</p>
            <ul className="list-disc pl-6">
              <li><strong>Consent</strong> – for marketing communications;</li>
              <li><strong>Contract</strong> – for event registration or volunteer engagement;</li>
              <li><strong>Legal obligation</strong> – e.g., financial reporting, safeguarding;</li>
              <li><strong>Legitimate interests</strong> – e.g., improving services, contributor engagement, unless these are overridden by your rights.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-3">5. How We Share Your Data</h2>
            <p>We may share your personal data with:</p>
            <ul className="list-disc pl-6">
              <li>Service providers such as payment processors (e.g., Stripe), email platforms, website hosts;</li>
              <li>Event partners for operational or health/safety purposes;</li>
              <li>Government authorities if legally required;</li>
              <li>Analytics providers to understand website usage;</li>
              <li>Third-party contractors under written data processing agreements.</li>
            </ul>
            <p>We do not sell or rent your personal data. All sharing is based on appropriate safeguards and legal bases.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">6. International Transfers</h2>
            <p>Where personal data is transferred outside the European Economic Area (EEA), we ensure appropriate safeguards are in place (e.g., Standard Contractual Clauses) to protect your data rights.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">7. Cookies and Tracking Technologies</h2>
            <p>Our website may use cookies to:</p>
            <ul className="list-disc pl-6">
              <li>Enable essential functions (e.g., registration, contribution process);</li>
              <li>Analyse website usage (e.g., via Google Analytics);</li>
              <li>Improve functionality and tailor your experience.</li>
            </ul>
            <p>You can control cookies via your browser settings or cookie banner on our site. For more, see our [Cookie Policy].</p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">8. How Long We Keep Your Data</h2>
            <p>We retain personal data only as long as necessary for the purposes collected and in line with legal and regulatory obligations. For example, we retain contribution records for at least 7 years under revenue law.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">9. Your Rights</h2>
            <p>Under GDPR, you have the right to:</p>
            <ul className="list-disc pl-6">
              <li>Access your personal data;</li>
              <li>Request correction or deletion;</li>
              <li>Object to or restrict processing;</li>
              <li>Withdraw consent at any time (e.g., for marketing);</li>
              <li>Request data portability;</li>
              <li>Lodge a complaint with the Data Protection Commission (www.dataprotection.ie).</li>
            </ul>
            <p>To exercise any of these rights, contact us at info@growingupmuslimevents.com.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">10. Data Security</h2>
            <p>We apply appropriate technical and organisational measures to secure your personal data. However, no system is completely secure. If you suspect a data breach, please notify us immediately.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">11. Changes to This Policy</h2>
            <p>We may update this policy periodically. The current version is always posted on our website with the “last updated” date above.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">12. Contact</h2>
            <p>For any questions or complaints about this privacy policy or our data practices, contact:</p>
            <p>Data Protection Lead<br />
            📧 info@growingupmuslimevents.com</p>

          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
