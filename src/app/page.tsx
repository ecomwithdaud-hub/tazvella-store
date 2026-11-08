import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { BrandPerks } from '@/components/home/BrandPerks';
import { FeaturedPetCollection } from '@/components/home/FeaturedPetCollection';
import { ProductCatalog } from '@/components/home/ProductCatalog';
import { MockupInteractiveShowcase } from '@/components/home/MockupInteractiveShowcase';
import { FlagshipFeatureHighlight } from '@/components/home/FlagshipFeatureHighlight';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { FaqSection } from '@/components/home/FaqSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-cream-100">
      <Navbar />
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* Brand Perks Strip */}
        <BrandPerks />

        {/* 2. Featured Pet-Parent Organization Collection */}
        <FeaturedPetCollection />

        {/* 3. Product Catalog with Category Filter (All, Life, Finances, Pets) */}
        <ProductCatalog />

        {/* 4. Mockup Preview & Live Interactive Device Showcase */}
        <MockupInteractiveShowcase />

        {/* 5. Flagship Product Highlight */}
        <FlagshipFeatureHighlight />

        {/* 6. Social Proof / Verified Testimonials */}
        <TestimonialsSection />

        {/* 7. FAQ Accordion */}
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
