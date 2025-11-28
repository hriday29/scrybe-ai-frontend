// components/landing/MicroFaqSection.js
// Eye-catching FAQ section with expanded content and visual hierarchy
import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Brain, Shield, Target, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    icon: Brain,
    color: 'blue',
    q: 'What does Scrybe AI actually do?',
    a: 'Scrybe AI acts as your personal institutional-grade research team. Every day, it analyzes all stocks in the NSE across technical charts, fundamental metrics, volatility patterns, and market sentiment. It then ranks every opportunity by conviction level and executes only the highest-quality trade plans\u2014like a professional fund manager would.',
    highlight: 'all NSE stocks analyzed daily'
  },
  {
    icon: Shield,
    color: 'green',
    q: 'Is this automated trading or bot signals?',
    a: 'No. Scrybe AI is not a trading bot or signal service. It provides institutional-quality analysis and portfolio positioning logic with full transparency. You see every analysis, understand every decision, and remain in complete control of execution. Think of it as hiring a team of expert analysts, not a black-box algorithm.',
    highlight: 'You stay in control'
  },
  {
    icon: Target,
    color: 'purple',
    q: 'How are signals generated?',
    a: 'We use a multi-layer AI committee approach: (1) Technical Analyst examines charts, momentum, and indicators. (2) Fundamental Analyst evaluates valuation and growth. (3) Risk Analyst reviews volatility and options data. (4) Head of Strategy synthesizes everything into a final conviction score. Only trades passing strict risk gates (sector limits, position sizing, stop-loss rules) get executed.',
    highlight: '4-layer AI committee'
  },
  {
    icon: Zap,
    color: 'amber',
    q: 'Why limited to 10 positions?',
    a: 'Position limits enforce professional risk management. Top funds don\'t spread capital thin across 50 stocks—they concentrate in high-conviction ideas with strict risk controls. Our 10-position limit ensures: (1) Max 40% per sector prevents concentration risk. (2) Each position gets proper attention. (3) Portfolio performance is driven by quality, not quantity.',
    highlight: 'Quality over quantity'
  },
  {
    icon: HelpCircle,
    color: 'gray',
    q: 'What makes this different from other tools?',
    a: 'Most tools give you a signal and move on. Scrybe AI shows you the entire institutional process: quantitative pre-screening, multi-analyst AI review, portfolio-level risk management, and position sizing math. You see why stocks were selected or rejected, understand the strategy, and learn professional trading as you use it.',
    highlight: 'Full transparency'
  },
  {
    icon: Brain,
    color: 'purple',
    q: 'Do I need trading experience?',
    a: 'No. Scrybe AI is designed to teach you institutional trading by showing you how professionals think. Every analysis includes clear explanations, every rejection has a reason, and the dashboard breaks down concepts like risk/reward ratios, ATR-based stops, and sector diversification. You\'re learning while trading.',
    highlight: 'Built for learners'
  }
];

const FaqItem = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-700',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-700',
    amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-700',
    gray: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700'
  };

  const Icon = faq.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-neutral-900 border-2 border-gray-200 dark:border-neutral-700 rounded-xl overflow-hidden hover:border-primary-300 dark:hover:border-primary-700 transition-all"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-start gap-4 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
      >
        <div className={`p-3 rounded-xl flex-shrink-0 ${colorClasses[faq.color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{faq.q}</h3>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colorClasses[faq.color]} border`}>
            {faq.highlight}
          </span>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 pl-20">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function MicroFaqSection({ onGetStarted }) {
  return (
    <section id="faq" aria-labelledby="micro-faq-heading" className="relative w-full py-20 bg-gradient-to-b from-white via-gray-50 to-white dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
            <HelpCircle className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-bold text-primary-700 dark:text-primary-300">FREQUENTLY ASKED</span>
          </div>
          <h2 id="micro-faq-heading" className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Everything You Need to Know
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            From "What is this?" to "How do I start?"—we've got you covered. Click any question to learn more.
          </p>
        </motion.div>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FaqItem key={i} faq={faq} index={i} />
          ))}
        </div>

        {/* CTA hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">Still have questions?</p>
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-full font-semibold shadow-lg hover:bg-primary-700 transition-colors cursor-pointer"
          >
            <span>Sign up and explore the full platform</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
