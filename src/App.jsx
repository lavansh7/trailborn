
import Hero from './sections/Hero';
import UrgencyBanner from './sections/UrgencyBanner';
import AboutSection from './sections/AboutSection';
import LakesSection from './sections/LakesSection';
import RouteSection from './sections/RouteSection';
import GearSection from './sections/GearSection';
import WhoShouldJoin from './sections/WhoShouldJoin';
import ContactSection from './sections/ContactSection';
import BendingMarquee from './components/BendingMarquee';
import Footer from './sections/Footer';
import Header from './components/Header';

export default function App() {
  return (
    <>
      <button 
        className="sr-only" 
        onClick={() => document.getElementById('overview')?.scrollIntoView()}
      >
        Skip to main content
      </button>
      <Header />
      <main>
        <Hero />
        <UrgencyBanner />
        <AboutSection />
        <BendingMarquee />
        <LakesSection />
        <RouteSection />
        <GearSection />
        <WhoShouldJoin />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
