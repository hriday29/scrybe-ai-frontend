// src/pages/NewLandingPage.js
import React from 'react';
import NewHeader from '../components/layout/NewHeader';
import NewFooter from '../components/layout/NewFooter';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import MicroFaqSection from '../components/landing/MicroFaqSection';
import AnalyticsSampler from '../components/landing/AnalyticsSampler';
import TrustMetricsShowcase from '../components/landing/TrustMetricsShowcase';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import CTASection from '../components/landing/CTASection';
import AboutSection from '../components/landing/AboutSection';
import ContactSection from '../components/landing/ContactSection';

const NewLandingPage = ({
  currentUser,
  onSignIn,
  onSignOut,
  onGetStarted,
  onWatchDemo,
  onPrivacyOpen,
  onTermsOpen,
  onDisclaimerOpen,
  onRefundOpen,
}) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <NewHeader
        currentUser={currentUser}
        onSignIn={onSignIn}
        onGetStarted={onGetStarted}
        onSignOut={onSignOut}
      />

      {/* Trust Metrics Banner */}
      <TrustMetricsShowcase />

      {/* Hero Section */}
      <HeroSection
        onGetStarted={onGetStarted}
        onWatchDemo={onWatchDemo}
      />

      {/* Features Section */}
      <section id="features">
        <FeaturesSection />
      </section>

      {/* About Section */}
      <section id="about">
        <AboutSection />
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Analytics Sampler & Micro FAQ (placed before signup CTA) */}
      <AnalyticsSampler />
      <MicroFaqSection />

      {/* CTA Section */}
      <CTASection
        onStartJourney={onGetStarted}
        onSignIn={onSignIn}
      />

      {/* Footer */}
      <NewFooter
        onPrivacyOpen={onPrivacyOpen}
        onTermsOpen={onTermsOpen}
        onDisclaimerOpen={onDisclaimerOpen}
        onRefundOpen={onRefundOpen}
      />
    </div>
  );
};

export default NewLandingPage;
