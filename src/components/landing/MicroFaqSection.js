// components/landing/MicroFaqSection.js
// Concise FAQ preview for landing page (pre-signup)
import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'What does Scrybe AI actually do?',
    a: 'It analyzes ~250 stocks daily, ranks conviction, and executes only the highest-quality trade plans.'
  },
  {
    q: 'Is this automated trading?',
    a: 'No. It provides institutional-quality analysis and portfolio positioning logic—you remain in control.'
  },
  {
    q: 'How are signals generated?',
    a: 'Multi-layer AI committee (technical, fundamental proxy, volatility, strategy synthesis) with strict risk gates.'
  },
  {
    q: 'Why limited positions?',
    a: 'Position limits enforce professional risk concentration control and sector diversification.'
  }
];

export default function MicroFaqSection() {
  return (
    <section aria-labelledby="micro-faq-heading" className="max-w-5xl mx-auto px-6 py-16">
      <div className="flex items-center gap-3 mb-8">
        <HelpCircle className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        <h2 id="micro-faq-heading" className="text-3xl font-extrabold text-gray-900 dark:text-white">Quick FAQ</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {faqs.map((item, i) => (
          <div key={i} className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl p-5 shadow-sm">
            <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{item.q}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
