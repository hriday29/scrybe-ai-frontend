import React from "react";

const AppBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">
      {/* Aurora glow overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[60vw] h-[60vw] top-[-20%] left-[-10%] bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute w-[70vw] h-[70vw] bottom-[-20%] right-[-10%] bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      {/* Actual page content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AppBackground;
