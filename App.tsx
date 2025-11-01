
import React, { useState, useEffect, useMemo, FC, useRef } from 'react';

// Custom Hook for Animations
// ===================================
const useIntersectionObserver = (options: IntersectionObserverInit) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(([entry]) => {
      setEntry(entry);
    }, options);

    if (elementRef.current) {
      observer.current.observe(elementRef.current);
    }

    return () => observer.current?.disconnect();
  }, [options]);

  const refCallback = (element: HTMLElement | null) => {
      elementRef.current = element;
      if (observer.current && element) {
          observer.current.observe(element);
      }
  };

  return [refCallback, entry] as const;
};

// Reusable Components
// ===================================

interface CtaButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

const CtaButton: FC<CtaButtonProps> = ({ href, children, className = '' }) => (
  <a
    href={href || "https://wa.me/27621779799?text=Hi+Franz,+I'd+like+to+book+a+seat+for+your+Meta+Ads+Webinar"}
    className={`inline-block bg-[#6B4EFF] text-white py-4 px-8 font-bold rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(107,78,255,0.35)] focus:outline-none focus:ring-4 focus:ring-[#6B4EFF]/50 ${className}`}
  >
    {children}
  </a>
);

// FAQ Item
// ===================================

interface FaqItemProps {
  question: string;
  children: React.ReactNode;
}
const FaqItem: FC<FaqItemProps> = ({ question, children }) => (
    <details className="group border-b border-gray-200 py-6 last-of-type:border-b-0">
        <summary className="flex justify-between items-center font-bold text-lg cursor-pointer list-none text-[#222]">
            <span>{question}</span>
            <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </span>
        </summary>
        <div className="text-[#6B7280] mt-4 text-base leading-relaxed">
            {children}
        </div>
    </details>
);

// Page Sections
// ===================================
const Section: FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = '', id }) => {
    const [ref, entry] = useIntersectionObserver({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    const isVisible = entry?.isIntersecting;
  
    return (
        <section
            id={id}
            ref={ref}
            className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
        >
          <div className="max-w-[1200px] mx-auto py-16 sm:py-24 px-8">
            {children}
          </div>
        </section>
    );
};

const Hero: FC = () => {
  return (
    <div className="bg-white text-[#222] py-24 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8" style={{ lineHeight: '1.15' }}>
          Learn the System That Built R12.4 Million in Meta Sales
        </h1>
        <p className="text-xl md:text-2xl text-[#222] max-w-3xl mx-auto mb-6" style={{ lineHeight: '1.6' }}>
          Join Franz Badenhorst live for a 90-minute workshop showing exactly how his Meta Ad Funnels generate predictable sales.
        </p>
        <p className="text-lg md:text-xl text-[#6B4EFF] font-semibold mb-10">
          🎥 Live training • 💬 Q&A • R1997 once-off
        </p>
        <CtaButton>💬 Book My R1997 Webinar Seat</CtaButton>
      </div>
    </div>
  );
};

const PromiseSection: FC = () => (
  <Section className="bg-[#f9f9ff]">
    <div className="text-center">
      <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-[#222]" style={{ lineHeight: '1.15' }}>What You'll Learn Inside the Meta Ads System Webinar</h2>
      <div className="grid md:grid-cols-3 gap-8 text-left">
        <div className="bg-white p-8 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.05)]">
          <h3 className="text-xl font-bold text-[#222] mb-3">CAPI Setup That Works</h3>
          <p className="text-[#6B7280]">Track sales with full accuracy using server-side tracking.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.05)]">
          <h3 className="text-xl font-bold text-[#222] mb-3">Lead Flow Automation</h3>
          <p className="text-[#6B7280]">Turn form fills into live WhatsApp conversations instantly.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.05)]">
          <h3 className="text-xl font-bold text-[#222] mb-3">Campaign Scaling Framework</h3>
          <p className="text-[#6B7280]">Grow profitable campaigns confidently without guesswork.</p>
        </div>
      </div>
    </div>
  </Section>
);

const Authority: FC = () => (
    <Section className="bg-white">
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 items-center">
            <div className="md:order-2">
                 <img src="https://i.ibb.co/CKCJrnMv/a-professional-studio-portrait-of-a-dist-EKh-DZ10-NR9-EYkq-ITz-VADA-yns-XM0-QRQme3s0-G8uz3l-Cg-1.png" alt="Franz Badenhorst, founder of LeadLabs by SIG Solutions - Expert in Meta Ads and Sales Automation" className="rounded-2xl shadow-xl w-full h-auto object-cover aspect-square max-w-sm mx-auto" />
            </div>
            <div className="text-center md:text-left md:order-1">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#222]" style={{ lineHeight: '1.15' }}>Results from My Meta Ads System</h2>
                <p className="text-lg text-[#6B7280] mb-4 leading-relaxed">Built From Real Campaigns That Consistently Close Sales</p>
                <div className="space-y-4 mb-6">
                  <p className="text-2xl font-bold text-[#222]">
                    <span className="text-[#6B4EFF]">R12.4M+</span> in tracked Meta ad spend
                  </p>
                  <p className="text-2xl font-bold text-[#222]">
                    <span className="text-[#6B4EFF]">38% average CPA reduction</span> within 90 days
                  </p>
                  <p className="text-2xl font-bold text-[#222]">
                    <span className="text-[#6B4EFF]">&lt;60-second response automation</span> on all inbound leads
                  </p>
                </div>
                <p className="text-lg font-semibold text-[#222]">Created by Franz Badenhorst, founder of LeadLabs™.</p>
            </div>
        </div>
    </Section>
);

const WhatsIncluded: FC = () => (
    <Section className="bg-[#f9f9ff]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 text-[#222]" style={{ lineHeight: '1.15' }}>What's Included When You Join</h2>
        <ul className="space-y-4 text-lg mb-12">
          <li className="flex items-start">
            <span className="text-[#6B4EFF] text-2xl mr-4">✅</span>
            <span className="text-[#222]">90-Minute Live Strategy Session</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#6B4EFF] text-2xl mr-4">✅</span>
            <span className="text-[#222]">Real Campaign Walkthroughs</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#6B4EFF] text-2xl mr-4">✅</span>
            <span className="text-[#222]">Private Q&A Access</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#6B4EFF] text-2xl mr-4">✅</span>
            <span className="text-[#222]">PDF Funnel Map Download</span>
          </li>
        </ul>
        <div className="text-center">
          <CtaButton>💬 Book My R1997 Webinar Seat</CtaButton>
        </div>
      </div>
    </Section>
);

const Faq: FC = () => (
    <Section className="bg-white">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 text-[#222]" style={{ lineHeight: '1.15' }}>Common Questions</h2>
            <div>
                <FaqItem question="Is this another free webinar?">No. It's a paid live workshop where I show my real system and campaigns.</FaqItem>
                <FaqItem question="Do I need Meta experience?">Nope. I explain every part step-by-step.</FaqItem>
                <FaqItem question="Can I ask questions?">Yes, every session ends with open Q&A.</FaqItem>
                <FaqItem question="Will this work for my business?">If your audience uses Facebook or Instagram, yes.</FaqItem>
            </div>
        </div>
    </Section>
);

const Footer: FC = () => (
    <footer className="bg-white text-[#222] border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto py-16 px-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#222]" style={{ lineHeight: '1.15' }}>Ready to see how profitable Meta ads are actually built?</h2>
                <CtaButton>💬 Message Franz on WhatsApp to Book Your Seat – R1997</CtaButton>
                <p className="text-[#6B7280] mt-6 text-lg">Limited to 20 seats per session. Next live webinar: November 10, 2025.</p>
            </div>
            <div className="text-center pt-8 border-t border-gray-200">
                <p className="text-sm text-[#6B7280]">&copy; {new Date().getFullYear()} LeadLabs™. All Rights Reserved.</p>
                <p className="text-sm text-gray-400 mt-1">Engineered Systems for Predictable Sales.</p>
                <div className="flex justify-center space-x-6 mt-4">
                    <a href="#" className="hover:text-[#6B4EFF] transition-colors duration-300 text-sm text-[#6B7280]">Privacy Policy</a>
                    <a href="#" className="hover:text-[#6B4EFF] transition-colors duration-300 text-sm text-[#6B7280]">Terms</a>
                </div>
            </div>
        </div>
    </footer>
);

// Main App Component
// ===================================
const App: FC = () => {
    return (
        <div className="bg-white text-[#222]">
            <main>
                <Hero />
                <PromiseSection />
                <Authority />
                <WhatsIncluded />
                <Faq />
            </main>
            <Footer />
        </div>
    );
};

export default App;
