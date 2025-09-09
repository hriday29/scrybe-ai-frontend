// src/GenuineMetrics.js
import React from "react";
import { Brain, Zap, Repeat, Timer, Signal } from "lucide-react";

const GenuineMetrics = () => {
  const metrics = [
    {
      icon: <Signal className="w-8 h-8 text-cyan-400" />,
      value: "92%",
      title: "AI Confidence",
      desc: "Our AI doesn’t just guess: it predicts with conviction. This is how sure it is when it sends you a signal.",
    },
    {
      icon: <Brain className="w-8 h-8 text-green-400" />,
      value: "High",
      title: "Signal Clarity",
      desc: "No clutter. No confusion. Just clean, confident trade setups detected through deep pattern recognition.",
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-400" />,
      value: "Strong",
      title: "Edge Strength",
      desc: "This reflects how much of an edge the AI has — combining profit potential, timing, and win consistency into one score.",
    },
    {
      icon: <Repeat className="w-8 h-8 text-purple-400" />,
      value: "87",
      title: "Adaptability Score",
      desc: "Markets change fast. This shows how quickly the AI recalibrates and thrives in new conditions.",
    },
    {
      icon: <Timer className="w-8 h-8 text-pink-400" />,
      value: "43s",
      title: "Model Runtime",
      desc: "From raw data to actionable insight — this is how fast the system processes and delivers your next signal.",
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 my-20">
      <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center">
        Genuine AI Metrics
      </h2>
      <p className="text-slate-400 text-center mt-2 max-w-2xl mx-auto">
        Real-time system benchmarks that highlight how Scrybe AI works under the hood.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center bg-slate-900/40 border border-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-md hover:bg-slate-800/60 transition"
          >
            {metric.icon}
            <p className="text-2xl font-bold text-white mt-3">{metric.value}</p>
            <h3 className="text-lg font-semibold text-slate-200 mt-1">{metric.title}</h3>
            <p className="text-sm text-slate-400 mt-2">{metric.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GenuineMetrics;
