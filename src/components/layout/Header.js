// src/components/layout/Header.js

import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import { Menu, LogOut } from "lucide-react";

// --- Subcomponents for Buttons ---
const baseClasses =
  "px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm flex items-center gap-2 border";

// Light, accessible variants for white/light-gray surfaces
const variants = {
  primary:
    "bg-primary-500 hover:bg-primary-600 text-white border-primary-500",
  secondary:
    "bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 border-gray-300",
  accent:
    "bg-secondary-500 hover:bg-secondary-600 text-white border-secondary-500",
  danger:
    "bg-white hover:bg-red-50 text-red-600 border-red-200",
};

// Button (for actions)
const NavButton = ({ label, onClick, variant = "secondary", icon: Icon }) => (
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
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
  mode = "app", // "landing" or "app"; defaults to app for light theme
  onReset,
  onSignOut,
  onBetaModalOpen,
  onFaqClick,
  onGuideClick,
  onLaunchAppClick,
  onDemoClick,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Landing header (rarely used now since NewLandingPage has its own)
  const landingNavButtons = (
    <>
      <NavButton label="Demo" onClick={onDemoClick} variant="secondary" />
      <NavButton label="FAQ" onClick={onFaqClick} />
      <NavButton label="User Guide" onClick={onGuideClick} />
      <NavButton label="Beta Info" onClick={onBetaModalOpen} variant="secondary" />
      <NavButton label="Launch App" onClick={onLaunchAppClick} variant="primary" />
      <NavButton label={theme === 'dark' ? 'Light Mode' : 'Dark Mode'} onClick={toggleTheme} variant="secondary" />
    </>
  );

  const appNavButtons = (
    <>
      {onReset && (
        <NavButton label="Reset" onClick={onReset} variant="secondary" />
      )}
      <NavButton label="Beta Info" onClick={onBetaModalOpen} variant="secondary" />
      <NavButton label={theme === 'dark' ? 'Light Mode' : 'Dark Mode'} onClick={toggleTheme} variant="secondary" />
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          {mode === "landing" ? (
            <>
              <img src="/logo192.png" alt="Scrybe AI Logo" className="w-9 h-9" />
              <span className="text-2xl font-bold tracking-tight text-gray-900">
                Scrybe <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">AI</span>
              </span>
            </>
          ) : (
            <NavButton label="Sign Out" onClick={onSignOut} variant="danger" icon={LogOut} />
          )}
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-3">
          {mode === "landing" ? landingNavButtons : appNavButtons}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700 hover:text-gray-900"
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
          className="flex flex-col gap-3 px-6 py-4 bg-white border-t border-gray-200 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          {mode === "landing" ? (
            landingNavButtons
          ) : (
            <>
              {appNavButtons}
              <NavButton label="Sign Out" onClick={onSignOut} variant="danger" icon={LogOut} />
            </>
          )}
        </motion.nav>
      )}
    </header>
  );
}
