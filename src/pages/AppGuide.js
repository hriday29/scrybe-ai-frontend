import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Layers,
  Activity,
  BookOpen,
  LineChart,
  Sparkles,
  Target,
  Shield,
  Zap,
  CheckCircle2,
  ArrowRight,
  Info,
} from "lucide-react";
import { motion } from "framer-motion";

const AppGuide = ({ navigateToTab }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const roadmapItems = [
    {
      title: "Stock Analysis",
      description:
        "Select any stock from our Nifty Smallcap 250 universe to receive an instant, institutional-grade AI report. Deep dive into technical indicators, sentiment analysis, and fundamental metrics.",
      benefit:
        "Saves hours of research with data-driven analysis covering 15+ technical indicators, AI sentiment, and market regime detection.",
      targetIndex: 1,
      icon: <BarChart3 className="w-8 h-8" />,
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
      features: ["Scrybe Score (-100 to +100)", "Technical + Fundamental Analysis", "Real-time Market Data"],
    },
    {
      title: "My Trades",
      description:
        "Complete portfolio management transparency. View all 250 daily analyzed stocks with the AI's top 10 highest-conviction trades selected for execution. Track both open and closed positions.",
      benefit:
        "See exactly why stocks are selected or rejected with sector limits, risk controls, and portfolio rankings clearly visible.",
      targetIndex: 2,
      icon: <Layers className="w-8 h-8" />,
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
      features: ["250 Stocks Daily Analysis", "Top 10 Trade Selection", "Full Trade History"],
    },
    {
      title: "Active Trades",
      description:
        "Real-time dashboard of your top 10 active positions. Monitor entry prices, targets, stop-losses, and live P&L with institutional-grade position tracking.",
      benefit:
        "Focused view of highest-conviction trades with complete transparency on risk management and exit strategy.",
      targetIndex: 3,
      icon: <TrendingUp className="w-8 h-8" />,
      color: "green",
      gradient: "from-green-500 to-emerald-500",
      features: ["Live P&L Tracking", "Risk Management Metrics", "Entry/Exit Levels"],
    },
    {
      title: "Index Analysis",
      description:
        "Strategic overview of the entire market. AI analyzes Nifty 50, Nifty Smallcap 250, and sectoral indices to determine overall market regime and momentum.",
      benefit:
        "Align your trading decisions with broader market trends and smallcap universe momentum for better timing.",
      targetIndex: 4,
      icon: <LineChart className="w-8 h-8" />,
      color: "cyan",
      gradient: "from-cyan-500 to-teal-500",
      features: ["Market Regime Detection", "Sectoral Analysis", "Index Momentum Tracking"],
    },
    {
      title: "AI Track Record",
      description:
        "Fully transparent performance log of every closed trade signal. See wins, losses, and overall historical performance with complete honesty and detailed statistics.",
      benefit:
        "Build trust through transparency with honest historical performance data and detailed trade breakdowns.",
      targetIndex: 5,
      icon: <Activity className="w-8 h-8" />,
      color: "pink",
      gradient: "from-pink-500 to-rose-500",
      features: ["Complete Trade History", "Performance Metrics", "Win/Loss Analysis"],
    },
    {
      title: "The Rulebook",
      description:
        "Detailed guide to our disciplined, institutional-grade strategy. Learn about portfolio management rules, sector concentration limits, and risk controls.",
      benefit:
        "Understand the professional fund manager logic behind every decision with clear, documented trading rules.",
      targetIndex: 6,
      icon: <BookOpen className="w-8 h-8" />,
      color: "orange",
      gradient: "from-orange-500 to-amber-500",
      features: ["Portfolio Rules", "Risk Management", "Selection Criteria"],
    },
  ];

  const quickStats = [
    { icon: Target, label: "250 Stocks", sublabel: "Analyzed Daily", color: "violet" },
    { icon: Zap, label: "Top 10", sublabel: "Selected Trades", color: "teal" },
    { icon: Shield, label: "2% Risk", sublabel: "Per Trade Max", color: "rose" },
    { icon: CheckCircle2, label: "±60 Score", sublabel: "High Conviction", color: "green" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-12 animate-fadeIn">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 px-4 py-2 rounded-full mb-4">
          <Sparkles className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
            Your Institutional-Grade AI Trading Platform
          </span>
        </div>
        
        <h2 className="text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 bg-clip-text text-transparent">
            Scrybe AI
          </span>
        </h2>
        
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Master the platform with this interactive guide. Click any card below to explore features
          and start making data-driven trading decisions.
        </p>
      </motion.div>

      {/* Quick Stats Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {quickStats.map((stat, idx) => (
          <div
            key={stat.label}
            className={`bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 dark:from-${stat.color}-900/20 dark:to-${stat.color}-800/20 rounded-2xl p-4 border border-${stat.color}-200 dark:border-${stat.color}-700`}
          >
            <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400 mb-2`} />
            <div className={`text-2xl font-extrabold text-${stat.color}-700 dark:text-${stat.color}-300`}>
              {stat.label}
            </div>
            <div className={`text-xs font-medium text-${stat.color}-600 dark:text-${stat.color}-400`}>
              {stat.sublabel}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roadmapItems.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onMouseEnter={() => setHoveredCard(idx)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigateToTab(item.targetIndex)}
            className="group relative bg-white dark:bg-neutral-900 border-2 border-gray-200 dark:border-neutral-700 rounded-2xl p-6 shadow-lg cursor-pointer 
                       transition-all duration-300 hover:border-transparent hover:shadow-2xl hover:scale-[1.03] overflow-hidden"
          >
            {/* Gradient Border on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 rounded-2xl blur-xl`} />
            
            {/* Icon with Gradient Background */}
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
              {item.icon}
            </div>

            {/* Title */}
            <h3 className={`font-extrabold text-2xl text-gray-900 dark:text-gray-100 mb-3 group-hover:bg-gradient-to-r group-hover:${item.gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all`}>
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              {item.description}
            </p>

            {/* Feature Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {item.features.map((feature, i) => (
                <span
                  key={i}
                  className={`text-xs px-2 py-1 rounded-full bg-${item.color}-50 dark:bg-${item.color}-900/20 text-${item.color}-700 dark:text-${item.color}-300 border border-${item.color}-200 dark:border-${item.color}-700`}
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* Benefit Box */}
            <div className={`mt-4 p-3 rounded-xl bg-gradient-to-r from-${item.color}-50/50 to-${item.color}-100/50 dark:from-${item.color}-900/10 dark:to-${item.color}-800/10 border border-${item.color}-200 dark:border-${item.color}-700`}>
              <div className="flex items-start gap-2 mb-1">
                <Info className={`w-4 h-4 text-${item.color}-600 dark:text-${item.color}-400 flex-shrink-0 mt-0.5`} />
                <p className={`text-xs font-semibold text-${item.color}-800 dark:text-${item.color}-300`}>
                  Why This Matters:
                </p>
              </div>
              <p className={`text-sm text-${item.color}-700 dark:text-${item.color}-400 leading-relaxed`}>
                {item.benefit}
              </p>
            </div>

            {/* CTA Arrow */}
            <div className={`mt-4 pt-4 border-t border-gray-200 dark:border-neutral-700 flex items-center justify-between text-${item.color}-600 dark:text-${item.color}-400 font-semibold`}>
              <span className="text-sm">Explore Feature</span>
              <ArrowRight className={`w-5 h-5 transform transition-transform duration-300 ${hoveredCard === idx ? 'translate-x-1' : ''}`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-center p-8 bg-gradient-to-r from-primary-50 via-secondary-50 to-purple-50 dark:from-primary-900/20 dark:via-secondary-900/20 dark:to-purple-900/20 rounded-3xl border border-primary-200 dark:border-primary-700"
      >
        <Sparkles className="w-12 h-12 text-primary-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          Ready to Start Trading?
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Explore each section to understand how Scrybe AI helps you make institutional-grade trading decisions
          with transparency, discipline, and data-driven insights.
        </p>
        <button
          onClick={() => navigateToTab(1)}
          className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
        >
          Start with Stock Analysis
        </button>
      </motion.div>
    </div>
  );
};

export default AppGuide;
