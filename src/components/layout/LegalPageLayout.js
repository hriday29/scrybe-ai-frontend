import React from "react";
import { ArrowLeft } from "lucide-react";

const LegalPageLayout = ({ title, lastUpdated, summaryPoints, onBack, children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-gray-200 px-4 py-10 flex justify-center">
      <div className="w-full max-w-4xl">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-sm">
            {title}
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Last updated: <span className="text-gray-300">{lastUpdated}</span>
          </p>
        </div>

        {/* Summary Section */}
        {summaryPoints && (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-10 shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-3">🔑 Summary</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300 leading-relaxed">
              {summaryPoints.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-8">
          {React.Children.map(children, (child, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegalPageLayout;
