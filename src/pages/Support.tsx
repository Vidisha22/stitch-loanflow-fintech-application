import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function Support() {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center py-xl px-gutter max-w-[1280px] mx-auto w-full">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-lg w-full">Support Center</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-xl w-full max-w-4xl">
          Get help with your loan application. Browse our FAQs or contact our support team.
        </p>

        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-md mb-xl">
          <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-md flex items-start gap-sm">
            <span className="material-symbols-outlined text-secondary">mail</span>
            <div>
              <h3 className="font-label-md text-label-md text-on-surface font-bold">Email Us</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">support@loanflow.com</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Response within 24 hours</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-md flex items-start gap-sm">
            <span className="material-symbols-outlined text-secondary">call</span>
            <div>
              <h3 className="font-label-md text-label-md text-on-surface font-bold">Call Us</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">1-800-FLOW-LOAN</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Mon-Fri, 8 AM - 8 PM EST</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-md flex items-start gap-sm">
            <span className="material-symbols-outlined text-secondary">chat</span>
            <div>
              <h3 className="font-label-md text-label-md text-on-surface font-bold">Live Chat</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Available 24/7</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-md flex items-start gap-sm">
            <span className="material-symbols-outlined text-secondary">help_center</span>
            <div>
              <h3 className="font-label-md text-label-md text-on-surface font-bold">Knowledge Base</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Guides and tutorials</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-4xl bg-white rounded-xl border border-outline-variant shadow-sm p-lg">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-md">Frequently Asked Questions</h2>
          <div className="space-y-sm">
            {[
              { q: 'How long does the loan application process take?', a: 'Most applications are processed within 24-48 business hours after submission. Some applications may require additional verification which can extend the timeline.' },
              { q: 'What documents do I need to apply?', a: "You'll need a valid government-issued ID, proof of income (recent pay stubs or tax returns), proof of address (utility bill or lease agreement), and your Social Security Number." },
              { q: 'Can I save my application and finish later?', a: 'Yes! Your progress is automatically saved. You can close the application and resume where you left off at any time.' },
              { q: 'What interest rates can I expect?', a: 'Interest rates vary based on credit history, loan amount, and loan term. Our typical APR ranges from 5.49% to 8.20%.' },
              { q: 'Is my personal information secure?', a: 'Absolutely. We use 256-bit bank-level encryption to protect your data. We never share your personal information with third parties without your explicit consent.' },
            ].map((faq, i) => (
              <details key={i} className="faq-item border border-outline-variant rounded-lg p-sm group">
                <summary className="flex justify-between items-center font-label-md text-label-md text-on-surface cursor-pointer">
                  <span>{faq.q}</span>
                  <span className="material-symbols-outlined text-on-surface-variant group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <p className="font-body-md text-body-md text-on-surface-variant mt-sm pt-sm border-t border-outline-variant">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}