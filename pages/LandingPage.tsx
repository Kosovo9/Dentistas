
import React from 'react';
import SEO from '../components/SEO';
import Hero from '../sections/Hero';
import Philosophy from '../sections/Philosophy';
import SmilesCounter from '../components/SmilesCounter';
import Technology from '../sections/Technology';
import Services from '../sections/Services';
import Gallery from '../sections/Gallery';
import Pricing from '../sections/Pricing';
import Testimonials from '../sections/Testimonials';
import FAQ from '../sections/FAQ';
import Contact from '../sections/Contact';

const LandingPage: React.FC = () => {
  return (
    <div className="overflow-hidden">
      <SEO />
      <Hero />
      <Philosophy />
      <SmilesCounter />
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
