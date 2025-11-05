import React, { useState, useEffect, useRef, FC } from 'react';

interface HeroSectionExpertProps {
  scrollToForm?: () => void;
}

const HeroSectionExpert: FC<HeroSectionExpertProps> = ({ scrollToForm }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [revenue, setRevenue] = useState(0);
  const [roas, setRoas] = useState(0);
  const [cpl, setCpl] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Mouse movement tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animated counter effect
  useEffect(() => {
    if (!isVisible) return;

    const animateCounter = (
      setter: React.Dispatch<React.SetStateAction<number>>,
      target: number,
      duration: number = 2000
    ) => {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setter(easeOutQuart * target);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    };

    // Stagger the animations
    setTimeout(() => animateCounter(setRevenue, 12.4), 200);
    setTimeout(() => animateCounter(setRoas, 4.8), 400);
    setTimeout(() => animateCounter(setCpl, 40), 600);
  }, [isVisible]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] overflow-hidden px-8 md:px-20 pt-24 pb-16"
      style={{
        background: `linear-gradient(135deg, #0B0B1A 0%, #1C114F 100%)`,
      }}
    >
      {/* Animated gradient background with subtle movement */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%, rgba(124, 58, 237, 0.15) 0%, transparent 50%)`,
          transition: 'background 0.3s ease',
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none noise-texture"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Main content grid */}
      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-[75vh]">
          {/* Left column: 7 columns - Copy + Authority + CTAs */}
          <div className="lg:col-span-7 space-y-8">
            {/* Headline */}
            <h1
              className="space-y-2"
              style={{
                animation: isVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none',
              }}
            >
              <div
                className="text-white font-bold leading-[1.1] tracking-tight"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  maxWidth: '14ch',
                }}
              >
                I Don't Run Ads.
              </div>
              <div
                className="font-bold leading-[1.1] tracking-tight bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] bg-clip-text text-transparent"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  maxWidth: '14ch',
                }}
              >
                I Engineer Meta Revenue Systems.
              </div>
            </h1>

            {/* Subhead */}
            <p
              className="text-[#D1D5DB] text-lg md:text-xl font-medium tracking-tight max-w-[50ch]"
              style={{
                fontFamily: 'Inter, sans-serif',
                animation: isVisible ? 'fadeInUp 0.8s ease-out 0.2s forwards' : 'none',
                opacity: isVisible ? 1 : 0,
              }}
            >
              For founders who demand proof, not promises.
              <br />I only partner where I can deliver measurable growth.
            </p>

            {/* Authority line */}
            <div
              className="border-l-[3px] border-[#8B5CF6] pl-3"
              style={{
                animation: isVisible ? 'fadeInUp 0.8s ease-out 0.4s forwards' : 'none',
                opacity: isVisible ? 1 : 0,
              }}
            >
              <p className="text-gray-400 text-sm italic">
                Franz Badenhorst — Strategic Revenue Engineer | SIG Solutions & LeadLabs
              </p>
            </div>

            {/* Proof paragraph */}
            <div
              className="text-base md:text-lg text-gray-300 leading-relaxed max-w-[60ch]"
              style={{
                animation: isVisible ? 'fadeInUp 0.8s ease-out 0.6s forwards' : 'none',
                opacity: isVisible ? 1 : 0,
              }}
            >
              <span className="text-[#8B5CF6] font-semibold">R12.4M</span> in verified Meta
              revenue delivered.{' '}
              <span className="text-[#8B5CF6] font-semibold">4.8x</span> average ROAS.{' '}
              <span className="text-[#8B5CF6] font-semibold">40%</span> CPL reduction across
              South African brands.
            </div>

            {/* CTA Block */}
            <div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              style={{
                animation: isVisible ? 'fadeInUp 0.8s ease-out 0.8s forwards' : 'none',
                opacity: isVisible ? 1 : 0,
              }}
            >
              {/* Primary CTA - Gradient */}
              <button
                onClick={scrollToForm}
                className="group relative px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#7C3AED]/50"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  background: 'linear-gradient(135deg, #7C3AED 0%, #9333EA 100%)',
                  boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)',
                }}
                aria-label="Join the next live session"
              >
                <span className="relative z-10">Join the Next Live Session</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#9333EA] to-[#7C3AED] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="mt-1 text-xs text-gray-200 opacity-90">
                  Watch how I turn ads into revenue systems.
                </div>
              </button>

              {/* Secondary CTA - Outline */}
              <button
                onClick={scrollToForm}
                className="group px-8 py-4 rounded-2xl font-semibold text-[#8B5CF6] border border-[#8B5CF6] bg-transparent hover:bg-[#1F1B3A] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#8B5CF6]/50"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                }}
                aria-label="Request private audit"
              >
                <span>Request Private Audit</span>
                <div className="mt-1 text-xs text-gray-400 opacity-90">
                  See if your brand qualifies for partnership.
                </div>
              </button>
            </div>
          </div>

          {/* Right column: 5 columns - Metrics Panel */}
          <div
            className="lg:col-span-5 mt-12 lg:mt-0"
            style={{
              animation: isVisible ? 'fadeInUp 0.8s ease-out 1s forwards' : 'none',
              opacity: isVisible ? 1 : 0,
            }}
          >
            <div
              className="relative rounded-2xl p-6 backdrop-blur-lg"
              style={{
                background: 'rgba(27, 21, 48, 0.6)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              }}
            >
              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-6 tracking-wide">
                Verified Outcomes
              </h3>

              {/* Metrics */}
              <div className="flex flex-col gap-4">
                {/* Revenue Delivered */}
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: 'rgba(139, 92, 246, 0.1)',
                    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <div className="text-xs uppercase tracking-wider text-gray-400 mb-2">
                    Revenue Delivered
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-white">
                      R{revenue.toFixed(1)}M
                    </span>
                    <svg
                      className="w-6 h-6 ml-2 text-[#8B5CF6] animate-pulse"
                      style={{ filter: 'drop-shadow(0 0 10px #8B5CF6)' }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                </div>

                {/* Average ROAS */}
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: 'rgba(139, 92, 246, 0.1)',
                    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <div className="text-xs uppercase tracking-wider text-gray-400 mb-2">
                    Average ROAS
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-white">{roas.toFixed(1)}x</span>
                    <svg
                      className="w-6 h-6 ml-2 text-[#8B5CF6]"
                      style={{
                        filter: 'drop-shadow(0 0 10px #8B5CF6)',
                        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                      }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                </div>

                {/* CPL Reduction */}
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: 'rgba(139, 92, 246, 0.1)',
                    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <div className="text-xs uppercase tracking-wider text-gray-400 mb-2">
                    CPL Reduction
                  </div>
                  <div className="flex items-baseline">
                    <svg
                      className="w-8 h-8 mr-2 text-green-400"
                      style={{
                        animation: isVisible ? 'dropIn 1s ease-out 1.2s forwards' : 'none',
                      }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                    <span className="text-3xl font-bold text-white">{Math.round(cpl)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dropIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .noise-texture {
          animation: noiseMove 8s infinite linear;
        }

        @keyframes noiseMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(10%, 10%);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSectionExpert;
