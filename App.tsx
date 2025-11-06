import React, { useRef } from 'react';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import TrustSection from './components/TrustSection';
import DifferentiationSection from './components/DifferentiationSection';
import FaqSection from './components/FaqSection';
import FinalCtaSection from './components/FinalCtaSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollToHero = () => {
    heroRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-amber-50 text-stone-800 antialiased">
      <main>
        <Hero ref={heroRef} />
        <ProblemSection />
        <SolutionSection onCtaClick={scrollToHero} />
        <TrustSection />
        <DifferentiationSection />
        <FaqSection />
        <FinalCtaSection onCtaClick={scrollToHero} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
