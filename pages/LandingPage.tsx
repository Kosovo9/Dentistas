
import React from 'react';
import Hero from '../sections/Hero';
import Philosophy from '../sections/Philosophy';
import Services from '../sections/Services';
import Gallery from '../sections/Gallery';
import Pricing from '../sections/Pricing';
import Testimonials from '../sections/Testimonials';
import Contact from '../sections/Contact';

const LandingPage: React.FC = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Philosophy />
      <Services />
      <Gallery />
      <Pricing />
      <Testimonials />
      <Contact />
    </div>
  );
};

export default LandingPage;
