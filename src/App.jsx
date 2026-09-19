
import Hero from './sections/Hero';
import UrgencyBanner from './sections/UrgencyBanner';
import AboutSection from './sections/AboutSection';
import LakesSection from './sections/LakesSection';
import RouteSection from './sections/RouteSection';
import GearSection from './sections/GearSection';
import WhoShouldJoin from './sections/WhoShouldJoin';
import Testimonials from './sections/Testimonials';
import ContactSection from './sections/ContactSection';
import BendingMarquee from './components/BendingMarquee';
import Footer from './sections/Footer';

export default function App() {
  return (
    <>
      <a className="sr-only" href="#overview">
        Skip to main content
      </a>
      <header className="site-header">
        <img src="/assets/logo/logo.png" alt="TrailBorn Logo" className="site-logo" />
      </header>
      <main>
        <Hero />
        <UrgencyBanner />
        <AboutSection />
        <BendingMarquee />
        <LakesSection />
        <RouteSection />
        <GearSection />
        <WhoShouldJoin />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
