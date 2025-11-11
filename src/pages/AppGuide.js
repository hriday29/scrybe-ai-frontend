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
      icon: <BarChart3 className="w-7 h-7" />,
      features: ["Scrybe Score (-100 to +100)", "Technical + Fundamental Analysis", "Real-time Market Data"],
    },
    {
      title: "Portfolio Manager",
      description:
        "Institutional-grade portfolio construction and management. View all 250 daily analyzed stocks with the AI's top 10 highest-conviction trades selected for execution. Complete transparency into portfolio decisions, sector allocation, and risk controls.",
      benefit:
        "Professional portfolio management with clear visibility into why stocks are selected or rejected, sector diversification limits, and institutional risk management.",
      targetIndex: 2,
      icon: <Layers className="w-7 h-7" />,
      features: ["250 Stocks Daily Analysis", "Top 10 Trade Selection", "Risk-Controlled Portfolio Construction"],
    },
    {
      title: "Fund Dashboard",
      description:
        "Real-time monitoring dashboard of your active positions. Track entry prices, targets, stop-losses, and live P&L with institutional-grade position tracking and execution management.",
      benefit:
        "Focused view of highest-conviction trades with complete transparency on risk management and exit strategy.",
      targetIndex: 3,
      icon: <TrendingUp className="w-7 h-7" />,
      features: ["Live P&L Tracking", "Risk Management Metrics", "Entry/Exit Levels"],
    },
    {
      title: "Index Analysis",
      description:
        "Strategic overview of the entire market. AI analyzes Nifty 50, Nifty Smallcap 250, and sectoral indices to determine overall market regime and momentum.",
      benefit:
        "Align your trading decisions with broader market trends and smallcap universe momentum for better timing.",
      targetIndex: 4,
      icon: <LineChart className="w-7 h-7" />,
      features: ["Market Regime Detection", "Sectoral Analysis", "Index Momentum Tracking"],
    },
    {
      title: "AI Track Record",
      description:
        "Fully transparent performance log of every closed trade signal. See wins, losses, and overall historical performance with complete honesty and detailed statistics.",
      benefit:
        "Build trust through transparency with honest historical performance data and detailed trade breakdowns.",
      targetIndex: 5,
      icon: <Activity className="w-7 h-7" />,
      features: ["Complete Trade History", "Performance Metrics", "Win/Loss Analysis"],
    },
    {
      title: "The Rulebook",
      description:
        "Detailed guide to our disciplined, institutional-grade strategy. Learn about portfolio management rules, sector concentration limits, and risk controls.",
      benefit:
        "Understand the professional fund manager logic behind every decision with clear, documented trading rules.",
      targetIndex: 6,
      icon: <BookOpen className="w-7 h-7" />,
      features: ["Portfolio Rules", "Risk Management", "Selection Criteria"],
    },
  ];

  const quickStats = [
    { 
      icon: Target, 
      label: "250 Stocks", 
      sublabel: "Analyzed Daily"
    },
    { 
      icon: Zap, 
      label: "Top 10", 
      sublabel: "Selected Trades"
    },
    { 
      icon: Shield, 
      label: "2% Risk", 
      sublabel: "Per Trade Max"
    },
    { 
      icon: CheckCircle2, 
      label: "±60 Score", 
      sublabel: "High Conviction"
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-12 animate-fadeIn">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 px-5 py-2.5 rounded-lg mb-6 border border-slate-200 dark:border-slate-700">
          <Sparkles className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300 tracking-wide">
            INSTITUTIONAL-GRADE AI TRADING PLATFORM
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4 tracking-tight">
          Welcome to Scrybe AI
        </h2>
        
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Professional trading tools designed for systematic, data-driven decision making.
          Explore each module to understand our institutional approach.
        </p>
      </motion.div>

      {/* Quick Stats Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
      >
        {quickStats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.05 }}
            className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-sm"
          >
            <stat.icon className="w-6 h-6 text-slate-600 dark:text-slate-400 mb-4" />
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
              {stat.label}
            </div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-500 uppercase tracking-wider">
              {stat.sublabel}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roadmapItems.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.05 }}
            onMouseEnter={() => setHoveredCard(idx)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigateToTab(item.targetIndex)}
            className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600"
          >
            {/* Icon */}
            <div className="inline-flex p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-5 group-hover:bg-slate-100 dark:group-hover:bg-slate-700 transition-colors">
              {item.icon}
            </div>

            {/* Title */}
            <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-3 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
              {item.description}
            </p>

            {/* Feature Badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              {item.features.map((feature, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1.5 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium"
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* Benefit Box */}
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <div className="flex items-start gap-2 mb-2">
                <Info className="w-4 h-4 text-slate-500 dark:text-slate-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                  Value Proposition
                </p>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {item.benefit}
              </p>
            </div>

            {/* CTA Arrow */}
            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-slate-600 dark:text-slate-400 font-medium group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
              <span className="text-sm">Explore Module</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-20 text-center p-10 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700"
      >
        <Sparkles className="w-10 h-10 text-slate-600 dark:text-slate-400 mx-auto mb-5" />
        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
          Ready to Get Started?
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto leading-relaxed">
          Navigate through each module to understand our systematic approach to trading with institutional-grade
          discipline and transparency.
        </p>
        <button
          onClick={() => navigateToTab(1)}
          className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-semibold rounded-lg shadow-sm transition-colors"
        >
          Begin with Stock Analysis
        </button>
      </motion.div>
    </div>
  );
};

export default AppGuide;
