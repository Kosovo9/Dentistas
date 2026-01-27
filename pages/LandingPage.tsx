
import React from 'react';
import SEO from '../components/SEO';
import Hero from '../sections/Hero';
import Philosophy from '../sections/Philosophy';
import SmilesCounter from '../components/SmilesCounter';
import Technology from '../sections/Technology';
import Services from '../sections/Services';
import EliteFeatures from '../sections/EliteFeatures';
import Gallery from '../sections/Gallery';
import Pricing from '../sections/Pricing';
import Testimonials from '../sections/Testimonials';
import FAQ from '../sections/FAQ';
import Contact from '../sections/Contact';
import SnowEffect from '../components/SnowEffect';

const LandingPage: React.FC = () => {
  return (
    <div className="overflow-hidden relative">
      <SnowEffect />
      <SEO />
      <Hero />
      <Philosophy />
      <SmilesCounter />
      <EliteFeatures />
      <Technology />
      <Services />
      <Gallery />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Contact />
    </div>
  );
};

export default LandingPage;
