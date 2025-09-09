import React from 'react';

// NOTE: The entire news feature (fetching and analysis) has been disabled
// because the required backend API endpoints do not exist. This component
// is now a placeholder to prevent application errors.

const NewsSection = ({ ticker }) => {
  return (
    <details className="bg-slate-900/40 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 group mb-8" open>
      <summary className="font-bold text-xl text-white list-none flex justify-between items-center cursor-pointer">
        Recent News
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-open:rotate-180 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
      </summary>
      <div className="p-4 text-center text-gray-400">
        The news analysis feature is currently unavailable.
      </div>
    </details>
  );
};

export default NewsSection;