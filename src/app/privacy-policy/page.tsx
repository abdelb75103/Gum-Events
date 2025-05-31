
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
            <p className="text-center text-sm text-muted-foreground mb-8">Last updated: January 1, 2025</p>

            <div className="bg-destructive/10 border-l-4 border-destructive text-destructive-foreground p-4 mb-8 rounded-md" role="alert">
              <p className="font-bold">Important Notice:</p>
              <p>This is a template Privacy Policy. The content provided below is for placeholder and informational purposes only and does not constitute legal advice. You should consult with a qualified legal professional to ensure this policy is appropriate for your specific circumstances and complies with all applicable laws and regulations (e.g., GDPR, CCPA).</p>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-3">1. Introduction</h2>
            <p>Growing Up Muslim Events ("GUM," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website [Your Website URL] (the "Site"), sign up for our newsletter, register for events, volunteer, or otherwise interact with our services (collectively, the "Services"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">2. Information We Collect</h2>
            <p>We may collect personal information about you in a variety of ways. The information we may collect on the Site includes:</p>
            <ul className="list-disc pl-6">
              <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, phone number, and other similar contact data that you voluntarily give to us when you register for events, sign up for our newsletter, submit a volunteer application, or use the contact form.</li>
              <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site. (Note: Specify if you use analytics and what they collect, e.g., via Vercel Analytics or Google Analytics).</li>
              <li><strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you make a contribution or purchase tickets for an event. We store only very limited, if any, financial information. Otherwise, all financial information is stored by our payment processors (e.g., Stripe), and you are encouraged to review their privacy policy and contact them directly for responses to your questions.</li>
              <li><strong>Sentiment Data:</strong> If you use our contact form, the content of your message may be analyzed for sentiment (positive, negative, neutral) and urgency by an AI tool to help us prioritize responses. This analysis is based on the text you provide.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-3">3. How We Use Your Information</h2>
            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
            <ul className="list-disc pl-6">
              <li>Administer events, workshops, and other programs.</li>
              <li>Send you newsletters, updates, and promotional materials (where you have consented).</li>
              <li>Respond to your comments, inquiries, and volunteer applications.</li>
              <li>Process contributions and event registrations.</li>
              <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
              <li>Notify you of updates to our Site and services.</li>
              <li>Route urgent or negative feedback from contact forms for immediate attention.</li>
              <li>Comply with legal obligations.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-3">4. Disclosure of Your Information</h2>
            <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
            <ul className="list-disc pl-6">
              <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
              <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing (e.g., Stripe), email delivery, hosting services, customer service, and marketing assistance. We require these service providers to protect your information and use it only for the purposes for which it was disclosed.</li>
              <li><strong>AI Service Providers:</strong> Message content submitted via the contact form is shared with our AI service provider (e.g., Google via Genkit) for sentiment analysis. These providers are bound by their own privacy policies regarding data handling.</li>
              <li><strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent.</li>
            </ul>
            <p>We do not sell your personal information to third parties.</p>


            <h2 className="text-2xl font-semibold mt-8 mb-3">5. Security of Your Information</h2>
            <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">6. Your Data Protection Rights</h2>
            <p>Depending on your location (e.g., if you are in the European Economic Area), you may have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-6">
              <li>The right to access – You have the right to request copies of your personal data.</li>
              <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
              <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
              <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
              <li>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</li>
              <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
              <li>The right to withdraw consent – If we are processing your personal data based on your consent, you have the right to withdraw that consent at any time.</li>
            </ul>
            <p>If you wish to exercise any of these rights, please contact us at info@growingupmuslimevents.com.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">7. Cookies and Tracking Technologies</h2>
            <p>We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience. When you access the Site, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Site.</p>
            <p>(Please elaborate here: For example, if you use analytics like Vercel Analytics or Google Analytics, mention that and link to their privacy policies. If you use cookies for login sessions or preferences, describe them.)</p>
            <p>Currently, our site uses essential cookies for basic functionality. [Add details if using other cookies, e.g., for analytics].</p>


            <h2 className="text-2xl font-semibold mt-8 mb-3">8. Policy for Children</h2>
            <p>We do not knowingly solicit information from or market to children under the age of 13 (or other age as defined by local law, e.g., 16 in the EEA). If you become aware of any data we have collected from children under the relevant age, please contact us using the contact information provided below so we can take appropriate action.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">9. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">10. Contact Us</h2>
            <p>If you have questions or comments about this Privacy Policy, please contact us at: info@growingupmuslimevents.com.</p>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
