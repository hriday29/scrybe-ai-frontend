// src/components/landing/AboutSection.js
import React from 'react';
import { Lightbulb, Target, ShieldCheck } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="w-full px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            About <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">Scrybe AI</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We analyze the entire Nifty Smallcap 250 universe every day and apply institutional-grade
            portfolio rules to surface only the highest‑conviction opportunities.
          </p>
        </div>

        {/* 3-up value grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-soft-lg">
            <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
              <Lightbulb className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI Scoring, Not Hype</h3>
            <p className="text-gray-700">
              Our proprietary Scrybe Score rates every stock from -100 to +100 by blending
              technicals, fundamentals, and market context.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-soft-lg">
            <div className="w-12 h-12 rounded-xl bg-secondary-50 flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-secondary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Top‑10 Selection</h3>
            <p className="text-gray-700">
              From 250 daily analyses, only the top 10 highest‑conviction trades that pass
              strict portfolio rules are shortlisted.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-soft-lg">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Institutional Risk</h3>
            <p className="text-gray-700">
              Professional constraints like max 10 positions, sector caps and per‑trade risk limits
              keep the process disciplined.
            </p>
          </div>
        </div>

        {/* Bottom blurb */}
        <div className="mt-10 md:mt-14">
          <div className="rounded-2xl border border-gray-100 bg-gradient-to-r from-primary-50 to-secondary-50 p-6 md:p-8">
            <p className="text-gray-800 text-base md:text-lg">
              Scrybe AI is designed for serious, systematic traders who want clear, repeatable
              decision‑making—no black boxes, just transparent analysis and portfolio logic.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
