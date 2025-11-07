// src/components/layout/Header.js

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, LogOut } from "lucide-react";
// We no longer need Link for the landing page header
import { Link } from "react-router-dom";

// --- Subcomponents for Buttons ---
const baseClasses =
  "px-4 py-2 rounded-xl text-sm font-semibold backdrop-blur-lg transition-all duration-200 shadow-lg flex items-center gap-2";

// --- MODIFIED: Made all button variants uniform and colorless for a consistent glass look ---
const uniformStyle = "bg-white/10 hover:bg-white/20 text-slate-100 hover:text-white border border-white/20";
const variants = {
  primary: uniformStyle,
  secondary: uniformStyle,
  accent: uniformStyle,
  danger: uniformStyle,
};


// Button (for actions)
const NavButton = ({ label, onClick, variant = "secondary", icon: Icon }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    aria-label={label}
    className={`${baseClasses} ${variants[variant]}`}
  >
    {Icon && <Icon size={16} />}
    {label}
  </motion.button>
);

// --- Main Header Component ---
export default function Header({
  mode = "landing", // "landing" or "app"
  onReset,
  onSignOut,
  onBetaModalOpen,
  // --- CHANGE 1: Add new props for handling clicks ---
  onFaqClick,
  onGuideClick,
  onLaunchAppClick,
  onDemoClick, // Assuming you might have a demo modal/view
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- CHANGE 2: Create a consistent set of landing page buttons ---
  const landingNavButtons = (
    <>
      <NavButton label="Demo" onClick={onDemoClick} variant="primary" />
      <NavButton label="FAQ" onClick={onFaqClick} />
      <NavButton label="User Guide" onClick={onGuideClick} />
      <NavButton
        label="Beta Info"
        onClick={onBetaModalOpen}
        variant="accent"
      />
      <NavButton label="Launch App" onClick={onLaunchAppClick} variant="primary" />
    </>
  );

  const appNavButtons = (
    <>
      {onReset && (
        <NavButton label="Reset" onClick={onReset} variant="primary" />
      )}
      <NavButton
        label="Beta Info"
        onClick={onBetaModalOpen}
        variant="accent"
      />
    </>
  );

  return (
    <header className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          {mode === "landing" ? (
            <>
              <img
                src="/logo192.png"
                alt="Scrybe AI Logo"
                className="w-9 h-9"
              />
              <span className="text-2xl font-bold text-white tracking-tight">
                Scrybe <span className="text-blue-400">AI</span>
              </span>
            </>
          ) : (
            <NavButton
              label="Sign Out"
              onClick={onSignOut}
              variant="danger"
              icon={LogOut}
            />
          )}
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-3">
          {mode === "landing" ? landingNavButtons : appNavButtons}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white hover:text-blue-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="flex flex-col gap-3 px-6 py-4 bg-white backdrop-blur-none border-t border-gray-200 md:hidden"
          onClick={() => setMobileMenuOpen(false)} // Close menu on link click
        >
          {mode === "landing" ? landingNavButtons :
            <>
              {appNavButtons}
              <NavButton
                label="Sign Out"
                onClick={onSignOut}
                variant="danger"
                icon={LogOut}
              />
            </>
          }
        </motion.nav>
      )}
    </header>
  );
}
