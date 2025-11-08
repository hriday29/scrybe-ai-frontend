// src/components/landing/TestimonialsSection.js
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote:
      "Scrybe AI changed the way I shortlist trades. The daily analysis across the entire smallcap universe is a game changer.",
    name: "Arjun M.",
    role: "Active Swing Trader",
    rating: 5,
  },
  {
    quote:
      "I finally feel disciplined. Position sizing and portfolio limits are built-in—not just advice.",
    name: "Neha R.",
    role: "Part-time Investor",
    rating: 5,
  },
  {
    quote:
      "Transparent, fast, and focused. I can see the reasons for both selections and rejections—no fluff.",
    name: "Vikram S.",
    role: "Ex-analyst, Full-time Trader",
    rating: 4,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-gradient-soft">
      <div className="w-full px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
          >
            What Our Users Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Real traders. Real workflows. Results built on discipline and transparency.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-soft-lg border border-gray-100"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={"w-5 h-5 " + (i < t.rating ? 'text-yellow-500' : 'text-gray-300')} />
                ))}
              </div>
              <blockquote className="text-gray-800 leading-relaxed">“{t.quote}”</blockquote>
              <figcaption className="mt-6">
                <div className="font-semibold text-gray-900">{t.name}</div>
                <div className="text-sm text-gray-600">{t.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
