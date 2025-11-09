// src/pages/NewLandingPage.js
import React from 'react';
import NewHeader from '../components/layout/NewHeader';
import NewFooter from '../components/layout/NewFooter';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import MicroFaqSection from '../components/landing/MicroFaqSection';
import AnalyticsSampler from '../components/landing/AnalyticsSampler';
import LiveStatusStrip from '../components/specific/LiveStatusStrip';
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

      {/* Live Status (pre-signup insight) */}
      <div className="bg-gray-50 dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-6">
          <LiveStatusStrip />
        </div>
      </div>

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
