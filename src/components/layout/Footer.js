import React from 'react';

const Footer = ({ onPrivacyClick, onTermsClick, onUserGuideClick, onFaqClick }) => {
  return (
    <footer className="w-full max-w-7xl mx-auto px-4 py-8 mt-auto text-center text-gray-600 text-sm z-10">
      <div className="flex justify-center gap-6 mb-4">
        <button onClick={onUserGuideClick} className="hover:text-primary-600 transition-colors">User Guide</button>
        <button onClick={onFaqClick} className="hover:text-primary-600 transition-colors">FAQ</button>
        <button onClick={onPrivacyClick} className="hover:text-primary-600 transition-colors">Privacy Policy</button>
        <button onClick={onTermsClick} className="hover:text-primary-600 transition-colors">Terms & Conditions</button>
      </div>
      <p className="text-gray-500">&copy; {new Date().getFullYear()} Scrybe AI. All Rights Reserved.</p>
      <p className="mt-2 text-xs text-gray-500">
        Disclaimer: All information provided is for informational purposes only and does not constitute financial advice.
      </p>
    </footer>
  );
};

export default Footer;