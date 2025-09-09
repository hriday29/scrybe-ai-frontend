import { motion } from "framer-motion";
import { CheckCircle, Activity, Shield } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "We Check the Weather",
    description:
      "Before analyzing any single stock, our AI first looks at the 'big picture'—the overall market health and which sectors are the strongest. We don't try to swim against the current.",
    icon: CheckCircle,
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    title: "We Look for a Healthy Pulse",
    description:
      "Next, the AI puts the stock through a rigorous health check. It looks for confirmation from big institutional players (by checking for a 'Volume Surge') and ensures the stock's price trend is strong and clear.",
    icon: Activity,
    color: "from-purple-500 to-pink-400",
  },
  {
    id: 3,
    title: "We Demand a Safety Net",
    description:
      "No trade is ever considered unless the potential reward is significantly greater than the potential risk. Every signal comes with a pre-defined exit plan, ensuring disciplined risk management.",
    icon: Shield,
    color: "from-green-500 to-emerald-400",
  },
];

export default function StrategyStepper() {
  return (
    <div className="py-20 px-6 max-w-6xl mx-auto relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 
                      bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 
                      bg-clip-text text-transparent drop-shadow-lg 
                      leading-[1.2] inline-block pt-2 pb-2">
          An AI Strategy You Can Understand
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Our AI isn’t a magic black box. It follows a clear, three-pillar scoring
          system for every stock.
        </p>
      </motion.div>

      {/* Stepper */}
      <div className="relative flex flex-col md:flex-row md:justify-between gap-12">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="flex-1 flex flex-col items-center md:items-start text-center md:text-left relative"
          >
            {/* Icon in gradient circle */}
            <div
              className={`w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r ${step.color} text-white shadow-lg mb-6`}
            >
              <step.icon className="w-8 h-8" />
            </div>

            {/* Connector line (desktop only) */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-8 left-[calc(50%+32px)] w-full h-[2px] bg-gradient-to-r from-white/10 to-transparent" />
            )}

            {/* Step content */}
            <h3 className="text-xl font-semibold mb-2 text-white">
              {step.title}
            </h3>
            <p className="text-gray-400 max-w-xs">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
