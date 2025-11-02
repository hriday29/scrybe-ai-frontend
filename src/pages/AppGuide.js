import React from "react";
import {
  BarChart3,
  TrendingUp,
  Layers,
  Activity,
  BookOpen,
} from "lucide-react";

const AppGuide = ({ navigateToTab }) => {
  const roadmapItems = [
    {
      title: "Stock Analysis",
      description:
        "Select any stock from our Nifty Smallcap 250 universe to receive an instant, institutional-grade report. The AI performs a deep dive into the stock's health and current setup.",
      benefit:
        "Saves you hours of research and provides a clear, data-driven verdict on emerging opportunities.",
      targetIndex: 1, // Navigates to the 'Stock Analysis' tab
      icon: <BarChart3 className="w-8 h-8 text-blue-400" />,
    },
    {
      title: "Portfolio Dashboard",
      description:
        "View the AI's complete portfolio management process. See all 250 analyzed stocks daily, with the top 10 highest-conviction trades selected for execution based on institutional risk management.",
      benefit:
        "Complete transparency into why stocks are selected or rejected, with sector limits and risk controls clearly visible.",
      targetIndex: 2, // Navigates to the 'Portfolio' tab
      icon: <Layers className="w-8 h-8 text-purple-400" />,
    },
    {
      title: "Open Positions",
      description:
        "A real-time dashboard of the top 10 active trades currently executing. Monitor entry prices, targets, stop-losses, and live P&L for institutional-grade position tracking.",
      benefit:
        "Track the AI's highest-conviction trades with complete transparency on risk management and exit strategy.",
      targetIndex: 3, // Navigates to the 'Open Positions' tab
      icon: <TrendingUp className="w-8 h-8 text-green-400" />,
    },
    {
      title: "Index Analysis",
      description:
        "Get a high-level strategic overview of the entire market. The AI analyzes key indices including Nifty 50, Nifty Smallcap 250, and sectoral indices to determine the overall market 'weather'.",
      benefit:
        "Ensures your trading decisions are aligned with the broader market trend and smallcap universe momentum.",
      targetIndex: 4, // Navigates to the 'Index Analysis' tab
      icon: <Layers className="w-8 h-8 text-cyan-400" />,
    },
    {
      title: "AI Track Record",
      description:
        "A fully transparent performance log of every trade signal the AI has ever closed. See the wins, the losses, and the overall historical performance with complete honesty.",
      benefit:
        "Provides an honest look at the strategy's long-term effectiveness and builds trust through transparency.",
      targetIndex: 5, // Navigates to the 'AI Track Record' tab
      icon: <Activity className="w-8 h-8 text-pink-400" />,
    },
    {
      title: "The Rulebook",
      description:
        "A detailed guide to the disciplined, institutional-grade strategy our AI uses. Learn about our portfolio management rules, sector concentration limits, and risk controls.",
      benefit:
        "Builds your confidence by showing you the professional fund manager logic behind every decision.",
      targetIndex: 6, // Navigates to 'The Rulebook' tab
      icon: <BookOpen className="w-8 h-8 text-orange-400" />,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-12 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">
          Welcome to Scrybe AI
        </h2>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto">
          Your institutional-grade AI analyst for the Nifty Smallcap 250 universe. 
          Master the app with this interactive guide.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {roadmapItems.map((item) => (
          <div
            key={item.title}
            onClick={() => navigateToTab(item.targetIndex)}
            className="flex flex-col bg-slate-900/50 border border-slate-700/70 rounded-2xl p-6 shadow-lg cursor-pointer 
                       transition-all duration-300 hover:border-blue-500/80 hover:bg-slate-800/60 hover:scale-105 group"
          >
            {/* Icon */}
            <div className="mb-4">{item.icon}</div>

            {/* Title */}
            <h3 className="font-bold text-xl text-white group-hover:text-blue-400 transition">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-400 mt-2 flex-grow">
              {item.description}
            </p>

            {/* Benefit */}
            <div className="mt-6 pt-4 border-t border-slate-700">
              <p className="text-xs font-semibold text-green-400 mb-1">
                Why This Is Useful:
              </p>
              <p className="text-sm text-green-200/80">{item.benefit}</p>
            </div>

            {/* CTA */}
            <p className="text-sm font-semibold text-blue-400 mt-6 pt-4 border-t border-slate-800">
              Go to Section →
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppGuide;
