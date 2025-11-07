// src/MetricsShowcase.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const MetricsShowcase = () => {
  const [isOpen, setIsOpen] = useState(false);

  const stats = [
    { label: "WIN RATE", value: "58.00%", color: "text-green-400" },
    { label: "PROFIT FACTOR", value: "1.80", color: "text-cyan-400" },
    { label: "MAX DRAWDOWN", value: "3.33%", color: "text-yellow-400" },
    { label: "NET PROFIT (5 MONTH)", value: "+5.90%", color: "text-green-400" },
    { label: "SHARPE RATIO", value: "3.10", color: "text-purple-400" },
    { label: "CALMAR RATIO", value: "2.72", color: "text-white" },
  ];

  const highlights = [
    {
      icon: "⚙️",
      title: "Frontier Intelligence",
      desc: "Powered by a mix of purpose-built and frontier models, Scrybe AI is smart, fast, and always learning.",
    },
    {
      icon: "⚡",
      title: "Actionable Speed",
      desc: "Get from raw data to a clear BUY, SELL, or HOLD signal in seconds, not hours. Your time is valuable.",
    },
    {
      icon: "✅",
      title: "Data-Driven Confidence",
      desc: "Every analysis is backed by a transparent breakdown of technical and fundamental data. Trade with conviction.",
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 my-24">
      {/* Header with toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center bg-white border border-gray-200 px-6 py-4 rounded-2xl shadow-lg backdrop-blur-none hover:bg-gray-100 transition"
      >
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
          Validated Performance
        </h2>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="text-white w-6 h-6" />
        </motion.div>
      </button>

      {/* Collapsible content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-6 text-center">
              <p className="text-slate-400 max-w-2xl mx-auto">
                Our strategy was tested over five month of real market data,
                delivering precision, consistency, and performance.
              </p>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center shadow-lg backdrop-blur-none"
                  >
                    <p className={`text-2xl font-bold ${stat.color}`}>
                      {stat.value}
                    </p>
                    <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-md backdrop-blur-none hover:bg-gray-100 transition"
                  >
                    <div className="text-2xl mb-3">{item.icon}</div>
                    <h3 className="text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-sm mt-2">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MetricsShowcase;
