// src/pages/NewLandingPage.js
import React from 'react';
import NewHeader from '../components/layout/NewHeader';
import NewFooter from '../components/layout/NewFooter';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import AnalyticsSampler from '../components/landing/AnalyticsSampler';
import TrustMetricsShowcase from '../components/landing/TrustMetricsShowcase';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import CTASection from '../components/landing/CTASection';
import AboutSection from '../components/landing/AboutSection';

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
  onFaqOpen,
  onContactOpen,
}) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <NewHeader
        currentUser={currentUser}
        onSignIn={onSignIn}
        onGetStarted={onGetStarted}
        onSignOut={onSignOut}
        onFaqOpen={onFaqOpen}
        onContactOpen={onContactOpen}
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

      {/* Analytics Sampler */}
      <AnalyticsSampler />

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
        onFaqOpen={onFaqOpen}
        onContactOpen={onContactOpen}
      />
    </div>
  );
};

export default NewLandingPage;
