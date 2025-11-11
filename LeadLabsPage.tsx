import React, { useEffect, useRef, useState } from 'react';

// Intersection Observer Hook for scroll animations
const useFadeIn = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
};

const LeadLabsPage: React.FC = () => {
  const hero = useFadeIn();
  const proof = useFadeIn();
  const caseStudies = useFadeIn();
  const process = useFadeIn();

  return (
    <div className="bg-[#f9fafb] min-h-screen">
      {/* Hero Section */}
      <section
        ref={hero.ref}
        className={`max-w-[1200px] mx-auto px-6 py-20 transition-all duration-1000 ${
          hero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            Systems that turn Meta spend into verified recurring revenue.
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-600 mb-10">
            No vanity numbers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/dfy.html"
              className="inline-block bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] text-white font-bold py-4 px-8 rounded-2xl shadow-md transition-all duration-300 hover:brightness-110 hover:shadow-xl"
            >
              Book Demo
            </a>
            <a
              href="/case-studies/"
              className="inline-block bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] text-white font-bold py-4 px-8 rounded-2xl shadow-md transition-all duration-300 hover:brightness-110 hover:shadow-xl"
            >
              View Proof
            </a>
          </div>
        </div>
      </section>

      {/* Proof Section - Glassmorphic Logo Carousel */}
      <section
        ref={proof.ref}
        className={`max-w-[1200px] mx-auto px-6 py-16 transition-all duration-1000 ${
          proof.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="backdrop-blur-lg bg-white/60 rounded-3xl p-10 shadow-xl">
          <p className="text-center text-sm font-light text-gray-600 mb-8 uppercase tracking-wider">
            Trusted by brands who care about verified results
          </p>
          <div className="relative overflow-hidden">
            <div className="flex gap-x-12 animate-scroll hover:pause">
              {/* First set of logos */}
              <img
                src="https://upload.wikimedia.org/wikipedia/en/1/1f/TLU_SA_Logo.svg"
                alt="TLU SA"
                className="h-10 md:h-12 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300"
              />
              <img
                src="https://firearmsguardian.co.za/wp-content/uploads/2023/12/Firearms-Guardian-Logo_Firearms-Guardian-Web.png"
                alt="Firearms Guardian"
                className="h-10 md:h-12 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300"
              />
              <img
                src="https://i.ibb.co/hRCxX3Dt/sig-logo.png"
                alt="SIG Solutions"
                className="h-10 md:h-12 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-300"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <img
                src="https://acornbrokers.co.za/images/logo.png"
                alt="Acorn Brokers"
                className="h-10 md:h-12 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300"
              />
              <img
                src="https://i.ibb.co/hFVMZ72L/Untitled-design-28-1.png"
                alt="Civil Society SA"
                className="h-10 md:h-12 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300"
              />
              {/* Duplicate set for seamless loop */}
              <img
                src="https://upload.wikimedia.org/wikipedia/en/1/1f/TLU_SA_Logo.svg"
                alt="TLU SA"
                className="h-10 md:h-12 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300"
              />
              <img
                src="https://firearmsguardian.co.za/wp-content/uploads/2023/12/Firearms-Guardian-Logo_Firearms-Guardian-Web.png"
                alt="Firearms Guardian"
                className="h-10 md:h-12 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300"
              />
              <img
                src="https://i.ibb.co/hRCxX3Dt/sig-logo.png"
                alt="SIG Solutions"
                className="h-10 md:h-12 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-300"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <img
                src="https://acornbrokers.co.za/images/logo.png"
                alt="Acorn Brokers"
                className="h-10 md:h-12 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300"
              />
              <img
                src="https://i.ibb.co/hFVMZ72L/Untitled-design-28-1.png"
                alt="Civil Society SA"
                className="h-10 md:h-12 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section
        ref={caseStudies.ref}
        className={`max-w-[1200px] mx-auto px-6 py-20 transition-all duration-1000 ${
          caseStudies.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
          Proof in Action
        </h2>
        <p className="text-xl font-light text-center text-gray-600 mb-16">
          Real campaigns. Measurable results.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {/* DefendSure Case Study */}
          <div className="backdrop-blur-lg bg-white/70 rounded-3xl p-8 shadow-lg border border-[#8b5cf6]/30 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">DefendSure</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Problem
                </p>
                <p className="font-light text-gray-700">
                  No way to track ad spend to actual policies sold
                </p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
                  System
                </p>
                <p className="font-light text-gray-700">
                  Meta to WhatsApp automation with full attribution
                </p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Result
                </p>
                <p className="font-light text-gray-700">
                  <strong className="font-bold">1,800 policies</strong> sold at{' '}
                  <strong className="font-bold">4.2x ROAS</strong>
                </p>
              </div>
            </div>
          </div>

          {/* AgriFront Case Study */}
          <div className="backdrop-blur-lg bg-white/70 rounded-3xl p-8 shadow-lg border border-[#8b5cf6]/30 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">AgriFront</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Problem
                </p>
                <p className="font-light text-gray-700">
                  Manual data entry killing conversion rate
                </p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
                  System
                </p>
                <p className="font-light text-gray-700">
                  Automated Meta funnels with CRM integration
                </p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Result
                </p>
                <p className="font-light text-gray-700">
                  <strong className="font-bold">6,000 members</strong> verified and tracked
                </p>
              </div>
            </div>
          </div>

          {/* E-Commerce Case Study */}
          <div className="backdrop-blur-lg bg-white/70 rounded-3xl p-8 shadow-lg border border-[#8b5cf6]/30 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">E-Commerce</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Problem
                </p>
                <p className="font-light text-gray-700">
                  Scaling ad spend felt like gambling
                </p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
                  System
                </p>
                <p className="font-light text-gray-700">
                  Complete pixel and conversion API setup
                </p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Result
                </p>
                <p className="font-light text-gray-700">
                  R50k to <strong className="font-bold">R250k monthly spend</strong> at{' '}
                  <strong className="font-bold">3.2x ROAS</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section
        ref={process.ref}
        className={`max-w-[1200px] mx-auto px-6 py-20 transition-all duration-1000 ${
          process.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
          Revenue System
        </h2>
        <p className="text-xl font-light text-center text-gray-600 mb-16">
          Three steps to verified recurring revenue
        </p>
        <div className="grid md:grid-cols-3 gap-12">
          {/* Step 1: Sync */}
          <div className="relative">
            <div className="absolute top-0 left-0 text-[120px] font-bold text-gray-900 opacity-10 leading-none">
              01
            </div>
            <div className="relative pt-16">
              <h3 className="text-3xl font-bold mb-4 text-gray-900">Sync</h3>
              <p className="font-light text-lg text-gray-700">
                Integrate Meta, CRM, and payments. Remove blind spots.
              </p>
            </div>
          </div>

          {/* Step 2: Track */}
          <div className="relative">
            <div className="absolute top-0 left-0 text-[120px] font-bold text-gray-900 opacity-10 leading-none">
              02
            </div>
            <div className="relative pt-16">
              <h3 className="text-3xl font-bold mb-4 text-gray-900">Track</h3>
              <p className="font-light text-lg text-gray-700">
                Map leads to sales with clean, verifiable data.
              </p>
            </div>
          </div>

          {/* Step 3: Optimize */}
          <div className="relative">
            <div className="absolute top-0 left-0 text-[120px] font-bold text-gray-900 opacity-10 leading-none">
              03
            </div>
            <div className="relative pt-16">
              <h3 className="text-3xl font-bold mb-4 text-gray-900">Optimize</h3>
              <p className="font-light text-lg text-gray-700">
                Scale the campaigns that drive recurring revenue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="backdrop-blur-lg bg-white/70 rounded-3xl p-12 text-center shadow-xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Ready to see the truth in your numbers?
          </h2>
          <p className="text-xl font-light text-gray-600 mb-10">
            Stop guessing. Start tracking measurable profit from Meta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/dfy.html"
              className="inline-block bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] text-white font-bold py-4 px-8 rounded-2xl shadow-md transition-all duration-300 hover:brightness-110 hover:shadow-xl"
            >
              Book Demo
            </a>
            <a
              href="/contact.html"
              className="inline-block bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] text-white font-bold py-4 px-8 rounded-2xl shadow-md transition-all duration-300 hover:brightness-110 hover:shadow-xl"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-[1200px] mx-auto px-6 py-12 border-t border-gray-200">
        <div className="text-center">
          <p className="font-light text-gray-600">
            Built by Franz Badenhorst. Real ads. Real metrics. Real revenue.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="/privacy.html" className="text-sm text-gray-500 hover:text-gray-900">
              Privacy
            </a>
            <span className="text-gray-400">·</span>
            <a href="/terms.html" className="text-sm text-gray-500 hover:text-gray-900">
              Terms
            </a>
          </div>
        </div>
      </footer>

      {/* CSS for carousel animation with hover pause */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
          display: flex;
          width: max-content;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default LeadLabsPage;
