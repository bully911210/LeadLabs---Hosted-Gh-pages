
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
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const CtaButton: FC<CtaButtonProps> = ({ onClick, children, className = '' }) => (
  <button
    onClick={onClick}
    className={`bg-[#FACC15] text-[#111827] py-[14px] px-8 font-semibold rounded-[8px] cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(76,29,149,0.25)] focus:outline-none focus:ring-4 focus:ring-[#FACC15]/50 ${className}`}
  >
    {children}
  </button>
);

// Countdown Timer
// ===================================
interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer: FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = useMemo(() => {
    return () => {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeft: { [key: string]: number } = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
          secs: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeft;
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = Object.entries(timeLeft).map(([interval, value]) => (
      <div key={interval} className="flex flex-col items-center mx-2 sm:mx-3">
        <div className="bg-white p-4 rounded-lg shadow-md w-20 h-20 flex items-center justify-center flex-col">
          <span className="text-4xl font-bold text-[#111827] font-sans">{String(value).padStart(2, '0')}</span>
        </div>
        <span className="text-xs uppercase text-[#6B7280] mt-3 tracking-widest">{interval}</span>
      </div>
  ));
  
  return (
    <div className="flex justify-center my-10">
      {timerComponents.length ? timerComponents : <span className="text-2xl font-bold text-[#4C1D95]">The session is live!</span>}
    </div>
  );
};

// FAQ Item
// ===================================

interface FaqItemProps {
  question: string;
  children: React.ReactNode;
}
const FaqItem: FC<FaqItemProps> = ({ question, children }) => (
    <details className="group border-b border-gray-200 py-6 last-of-type:border-b-0">
        <summary className="flex justify-between items-center font-bold text-lg cursor-pointer list-none text-[#111827]">
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

// Star Rating
const StarRating = () => (
    <div className="flex text-[#FACC15] mb-4">
        {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
    </div>
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

const Hero: FC<{ scrollToForm: () => void }> = ({ scrollToForm }) => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative text-white overflow-hidden min-h-screen flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-[#4C1D95]"
        style={{ transform: `translateY(${offsetY * 0.4}px)` }}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#4C1D95] via-transparent to-[#1E1B4B]"></div>
      </div>

      <div className="relative z-10 text-center py-24 px-8 max-w-6xl mx-auto">
        <span className="inline-block bg-[#FACC15] text-[#111827] px-6 py-2 rounded-full text-sm font-bold mb-6">
          Meta Advertising Specialists
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          We Build & Manage Your Complete Meta Revenue System
        </h1>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-6 text-gray-200">
          Done-With-You & Done-For-You Meta Advertising + Advanced Automation
        </h2>
        <p className="text-lg md:text-xl text-gray-200/90 max-w-3xl mx-auto mb-10 leading-relaxed">
          South Africa's only agency specializing exclusively in Meta advertising with 
          enterprise-grade CAPI integration, sub-60-second lead response automation, 
          and custom BI dashboards. No generalist services. Just Meta campaigns engineered 
          to perform.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            <span className="text-4xl mb-3 block">🎯</span>
            <p className="font-bold text-lg mb-1">Meta CAPI Certified</p>
            <p className="text-sm text-gray-300">Server-side tracking infrastructure</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            <span className="text-4xl mb-3 block">⚡</span>
            <p className="font-bold text-lg mb-1">&lt; 60 Second Response</p>
            <p className="text-sm text-gray-300">Automated lead engagement</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            <span className="text-4xl mb-3 block">📊</span>
            <p className="font-bold text-lg mb-1">Custom BI Dashboards</p>
            <p className="text-sm text-gray-300">Real-time performance visibility</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <CtaButton onClick={scrollToForm}>Get Your Free Meta Campaign Audit</CtaButton>
          <button
            onClick={scrollToForm}
            className="bg-white text-[#4C1D95] py-[14px] px-8 font-semibold rounded-[8px] cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(250,204,21,0.25)] focus:outline-none focus:ring-4 focus:ring-white/50"
          >
            View Service Packages
          </button>
        </div>
        
        <p className="text-gray-300 text-base">
          <strong className="text-white">R12.4 million+ in tracked ad spend managed</strong> • 50+ Meta campaigns optimized • 
          Average client CPA reduction: 38% in first 90 days
        </p>
      </div>
    </div>
  );
};

const PromiseSection: FC<{ scrollToForm: () => void }> = ({ scrollToForm }) => (
  <Section>
    <div className="text-center">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-[#111827]">The Proven Meta-to-Sales System</h2>
      <div className="grid md:grid-cols-3 gap-8 text-left">
        {[
          { icon: 'check', title: 'Campaigns That Attract Buyers', text: 'Not browsers. Qualified prospects ready to purchase.'},
          { icon: 'bolt', title: 'Automations That Close', text: 'Qualify, follow up, and close leads while you focus on delivery.'},
          { icon: 'graph', title: 'Measurable Revenue', text: 'A plug-and-play structure that turns every ad click into revenue.'}
        ].map(item => (
            <div key={item.title} className="bg-white p-8 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.05)]">
                <div className="bg-[#FACC15] w-12 h-12 rounded-full flex items-center justify-center mb-5">
                    {item.icon === 'check' && <svg className="w-7 h-7 text-[#111827]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                    {item.icon === 'bolt' && <svg className="w-7 h-7 text-[#111827]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                    {item.icon === 'graph' && <svg className="w-7 h-7 text-[#111827]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                </div>
                <h3 className="text-xl font-bold text-[#111827] mb-2">{item.title}</h3>
                <p className="text-[#6B7280]">{item.text}</p>
            </div>
        ))}
      </div>
      <div className="mt-16">
        <CtaButton onClick={scrollToForm}>Get Your Free Meta Campaign Audit</CtaButton>
      </div>
    </div>
  </Section>
);

const Authority: FC = () => (
    <Section>
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 items-center">
            <div className="md:order-2">
                 <img src="https://i.ibb.co/CKCJrnMv/a-professional-studio-portrait-of-a-dist-EKh-DZ10-NR9-EYkq-ITz-VADA-yns-XM0-QRQme3s0-G8uz3l-Cg-1.png" alt="Franz Badenhorst, founder of LeadLabs by SIG Solutions - Expert in Meta Ads and Sales Automation" className="rounded-2xl shadow-xl w-full h-auto object-cover aspect-square max-w-sm mx-auto" />
            </div>
            <div className="text-center md:text-left md:order-1">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#111827]">Built From Real Campaigns That Consistently Close Sales</h2>
                <p className="text-lg text-[#6B7280] mb-4 leading-relaxed">This system was engineered from high-spend Meta campaigns across multiple industries, refined into a repeatable infrastructure that connects ads, automations, and real-world conversions.</p>
                <p className="text-lg font-semibold text-[#111827]">Created by Franz Badenhorst, founder of LeadLabs™.</p>
            </div>
        </div>
    </Section>
);

const ServiceTiers: FC<{ scrollToForm: () => void }> = ({ scrollToForm }) => (
  <Section id="services" className="bg-gradient-to-b from-[#FAFAFA] to-white">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#111827]">Choose Your Service Level</h2>
      <p className="text-lg md:text-xl text-[#6B7280] max-w-3xl mx-auto">
        Whether you want us to manage everything or build the system alongside your team, 
        you get the same world-class Meta infrastructure.
      </p>
    </div>
    
    <div className="grid md:grid-cols-3 gap-8 mb-12">
      {/* DFY Tier */}
      <div className="bg-white rounded-2xl shadow-xl p-8 relative border-2 border-[#FACC15] transform hover:-translate-y-2 transition-all duration-300">
        <span className="absolute top-0 right-0 bg-[#FACC15] text-[#111827] px-4 py-1 text-sm font-bold rounded-bl-xl rounded-tr-xl">
          Most Popular
        </span>
        <h3 className="text-2xl font-bold text-[#111827] mt-6 mb-2">Done-For-You (DFY)</h3>
        <p className="text-[#6B7280] mb-4">Complete Meta Campaign Management</p>
        <p className="text-3xl font-bold text-[#4C1D95] mb-1">From R29,500/month</p>
        <p className="text-sm text-[#6B7280] mb-6">+ ad spend • Minimum 6-month commitment</p>
        
        <ul className="space-y-3 mb-8 text-left">
          {[
            'Complete Meta ad account setup & daily management',
            'CAPI integration & server-side event tracking',
            'Speed-to-lead automation (< 60-second response)',
            'Custom BI reporting dashboard (Looker Studio/Tableau)',
            'Monthly creative production & testing',
            'Dedicated Meta specialist account manager',
            'Weekly optimization & performance reviews',
            'CRM integration (HubSpot, Salesforce, GoHighLevel)',
            'Budget management & scaling recommendations'
          ].map((feature, i) => (
            <li key={i} className="flex items-start text-sm text-[#111827]">
              <span className="text-[#FACC15] mr-2 flex-shrink-0">✅</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <button 
          onClick={scrollToForm}
          className="w-full bg-[#4C1D95] text-white py-3 px-6 font-semibold rounded-lg hover:bg-[#3d1777] transition-colors duration-300 mb-4"
        >
          Start Your Meta Campaign
        </button>
        
        <p className="text-sm text-[#6B7280]">
          <strong className="text-[#111827]">Ideal for:</strong> Businesses wanting hands-off Meta campaign management with maximum performance
        </p>
      </div>
      
      {/* DWY Tier */}
      <div className="bg-white rounded-2xl shadow-lg p-8 relative border border-gray-200 transform hover:-translate-y-2 transition-all duration-300">
        <h3 className="text-2xl font-bold text-[#111827] mb-2">Done-With-You (DWY)</h3>
        <p className="text-[#6B7280] mb-4">Guided Implementation + Team Training</p>
        <p className="text-3xl font-bold text-[#4C1D95] mb-1">R62,500 setup</p>
        <p className="text-sm text-[#6B7280] mb-6">+ R12,500/month • 90-day intensive + ongoing support</p>
        
        <ul className="space-y-3 mb-8 text-left">
          {[
            'We build your Meta system alongside your team',
            'CAPI setup & configuration (we handle all technical)',
            'Automation blueprint + implementation support',
            'BI dashboard deployment & team training',
            '90-day hands-on optimization partnership',
            'Campaign strategy & structure documentation',
            'Team training on Meta best practices',
            'Monthly strategy sessions post-launch',
            'Access to our campaign templates & SOPs'
          ].map((feature, i) => (
            <li key={i} className="flex items-start text-sm text-[#111827]">
              <span className="text-[#FACC15] mr-2 flex-shrink-0">✅</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <button 
          onClick={scrollToForm}
          className="w-full bg-[#4C1D95] text-white py-3 px-6 font-semibold rounded-lg hover:bg-[#3d1777] transition-colors duration-300 mb-4"
        >
          Schedule Strategy Call
        </button>
        
        <p className="text-sm text-[#6B7280]">
          <strong className="text-[#111827]">Ideal for:</strong> Teams with in-house marketers who want expert guidance and technical infrastructure
        </p>
      </div>
      
      {/* Hybrid Tier */}
      <div className="bg-white rounded-2xl shadow-lg p-8 relative border border-gray-200 transform hover:-translate-y-2 transition-all duration-300">
        <span className="absolute top-0 right-0 bg-[#4C1D95] text-white px-4 py-1 text-sm font-bold rounded-bl-xl rounded-tr-xl">
          Flexible
        </span>
        <h3 className="text-2xl font-bold text-[#111827] mt-6 mb-2">Hybrid Model</h3>
        <p className="text-[#6B7280] mb-4">DFY Launch → DWY Transition</p>
        <p className="text-3xl font-bold text-[#4C1D95] mb-1">Custom pricing</p>
        <p className="text-sm text-[#6B7280] mb-6">based on scale • Structured transition plan</p>
        
        <ul className="space-y-3 mb-8 text-left">
          {[
            'DFY campaign launch (first 90 days)',
            'We deliver immediate results while training your team',
            'All technical infrastructure built & documented',
            'Gradual handover with ongoing strategic support',
            'Flexible engagement model adapts to your needs',
            'Scale at your pace',
            'Knowledge transfer built into process'
          ].map((feature, i) => (
            <li key={i} className="flex items-start text-sm text-[#111827]">
              <span className="text-[#FACC15] mr-2 flex-shrink-0">✅</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <button 
          onClick={scrollToForm}
          className="w-full bg-[#4C1D95] text-white py-3 px-6 font-semibold rounded-lg hover:bg-[#3d1777] transition-colors duration-300 mb-4"
        >
          Discuss Custom Plan
        </button>
        
        <p className="text-sm text-[#6B7280]">
          <strong className="text-[#111827]">Ideal for:</strong> Growing businesses that want fast results now and in-house capabilities later
        </p>
      </div>
    </div>
    
    {/* Service Guarantee */}
    <div className="bg-gradient-to-br from-[#4C1D95] to-[#3d1777] rounded-2xl p-8 md:p-12 text-white">
      <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">Our Performance Commitment</h3>
      <p className="text-lg text-center mb-8 text-gray-200">
        We're so confident in our Meta systems that we include these guarantees:
      </p>
      <ul className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {[
          'CAPI event match quality above 80% within 30 days',
          'Lead response time under 60 seconds or we rebuild the automation',
          'Custom BI dashboard deployed within 14 days of onboarding',
          'Monthly performance reviews with documented optimization actions'
        ].map((guarantee, i) => (
          <li key={i} className="flex items-start">
            <span className="text-[#FACC15] mr-3 flex-shrink-0 text-lg">✅</span>
            <span className="text-gray-100">{guarantee}</span>
          </li>
        ))}
      </ul>
    </div>
  </Section>
);

const Proof: FC = () => (
    <Section>
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-[#111827]">Real Sales. Real Data. Real Results.</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { quote: "We cut cost-per-sale by 40% and doubled conversion in 60 days.", author: "Verified Brand" },
              { quote: "Our Meta campaigns finally became profitable after applying this system.", author: "Independent Marketer" }
            ].map((t) => (
                <div key={t.author} className="bg-white p-8 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.05)]">
                    <StarRating />
                    <p className="text-xl italic text-[#111827] mb-6 z-10 relative">“{t.quote}”</p>
                    <p className="font-semibold text-[#6B7280]">- {t.author}</p>
                </div>
            ))}
        </div>
    </Section>
);

const Offer: FC<{ scrollToForm: () => void }> = ({ scrollToForm }) => (
    <Section className="bg-[#4C1D95] text-white">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Inside the Free Session You’ll See How We:</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { title: "Build the Meta-to-Sale Engine", desc: "See exactly how ad clicks turn into purchases or sign-ups." },
          { title: "Automate Every Step", desc: "From data capture to follow-up to close, using tools you already know." },
          { title: "Fix Ad Messaging", desc: "We build campaigns that attract buyers ready to act now." },
          { title: "Replicate the System", desc: "Install the same infrastructure inside your business or client accounts." },
        ].map((item, i) => (
          <div key={i} className="bg-white/10 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/20">
            <div className="bg-[#FACC15] w-10 h-10 rounded-full flex items-center justify-center mb-5 text-xl font-bold text-[#111827]">{i + 1}</div>
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-gray-300 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-16">
        <CtaButton onClick={scrollToForm}>Book Your Free Strategy Call</CtaButton>
      </div>
    </Section>
);

const Urgency: FC<{ scrollToForm: () => void }> = ({ scrollToForm }) => (
    <Section>
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827]">Next Live Training: Learn the Full Meta-to-Sales System</h2>
            <CountdownTimer targetDate="2025-11-10T19:00:00+02:00" />
            <p className="text-[#6B7280] mb-8 text-lg">Seats are limited to keep the live Q&A focused and practical. Don’t miss the walkthrough, where you’ll see real campaigns and automations in action.</p>
            <CtaButton onClick={scrollToForm}>Save My Seat</CtaButton>
        </div>
    </Section>
);

const RegistrationFormSection: FC<{ formRef: React.RefObject<HTMLElement> }> = ({ formRef }) => {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');
        setTimeout(() => setStatus('success'), 1500);
    };

    return (
        <Section id="registration-form" className="bg-white">
            <div ref={formRef} className="max-w-xl mx-auto text-center">
                {status === 'success' ? (
                    <div className="text-center bg-gray-50 p-12 rounded-2xl">
                        <h2 className="text-3xl font-bold text-[#4C1D95] mb-4">You're In!</h2>
                        <p className="text-[#6B7280] text-lg">Thank you for registering. Check your email for the webinar link and details.</p>
                    </div>
                ) : (
                    <>
                        <h2 className="text-3xl md:text-5xl font-bold text-[#111827] mb-4">Reserve Your Free Seat Now</h2>
                        <p className="text-[#6B7280] text-lg mb-8">Join entrepreneurs and marketers building predictable sales systems.</p>
                        <form onSubmit={handleSubmit} className="space-y-5 text-left">
                            <div>
                                <label className="text-sm font-semibold text-gray-600 mb-1 block">Full Name</label>
                                <input type="text" placeholder="Enter your name" required className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C1D95] transition" />
                            </div>
                             <div>
                                <label className="text-sm font-semibold text-gray-600 mb-1 block">Email Address</label>
                                <input type="email" placeholder="your@email.com" required className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C1D95] transition" />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-600 mb-1 block">Mobile Number</label>
                                <input type="tel" placeholder="+27 XX XXX XXXX" required className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C1D95] transition" />
                            </div>
                            <CtaButton onClick={() => {}} className="w-full !py-4 !text-lg !font-bold disabled:opacity-50 disabled:cursor-wait" disabled={status === 'submitting'}>
                               {status === 'submitting' ? 'Reserving...' : 'Reserve My Free Seat'}
                            </CtaButton>
                        </form>
                    </>
                )}
            </div>
        </Section>
    );
};


const Faq: FC = () => (
    <Section>
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-[#111827]">Frequently Asked Questions</h2>
            <div>
                <FaqItem question="Is this really free?">Yes, it’s an open training showing the full Meta-to-Sales System.</FaqItem>
                <FaqItem question="Will this work for my business?">Absolutely. It’s built on buyer psychology, not industry. Whether you sell products, memberships, or services, the process remains identical.</FaqItem>
                <FaqItem question="Do I need technical skills?">No. Everything runs on simple tools, you’ll see how in the live session.</FaqItem>
                <FaqItem question="What happens after the webinar?">You’ll get access to the replay and be invited to test-drive the full LeadLabs system.</FaqItem>
            </div>
        </div>
    </Section>
);

const Footer: FC = () => (
    <footer className="bg-[#4C1D95] text-gray-300">
        <div className="max-w-[1200px] mx-auto py-8 px-8 text-center sm:flex sm:justify-between sm:items-center">
            <div className="text-center sm:text-left">
                <p className="text-sm">&copy; {new Date().getFullYear()} LeadLabs™. All Rights Reserved.</p>
                <p className="text-sm text-gray-400 mt-1">Engineered Systems for Predictable Sales.</p>
            </div>
            <div className="flex justify-center space-x-6 mt-4 sm:mt-0">
                <a href="#" className="hover:text-white transition-colors duration-300 text-sm">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors duration-300 text-sm">Terms</a>
            </div>
        </div>
    </footer>
);

// Main App Component
// ===================================
const App: FC = () => {
    const formRef = useRef<HTMLElement>(null);

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <div className="bg-[#FAFAFA] text-[#111827]">
            <main>
                <Hero scrollToForm={scrollToForm} />
                <ServiceTiers scrollToForm={scrollToForm} />
                <PromiseSection scrollToForm={scrollToForm} />
                <Authority />
                <Proof />
                <Offer scrollToForm={scrollToForm} />
                <Urgency scrollToForm={scrollToForm} />
                <RegistrationFormSection formRef={formRef} />
                <Faq />
            </main>
            <Footer />
        </div>
    );
};

export default App;
