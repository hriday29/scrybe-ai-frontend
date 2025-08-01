import React from 'react';
import { motion } from 'framer-motion';

// You will need to import your icons from App.js or a shared file
const BrainCircuitIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 5V3M5 12H3M19 12h2M12 21v-2M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M17.6 14.8A5 5 0 0 0 15 7.2"/><path d="M6.4 14.8A5 5 0 0 1 9 7.2"/><path d="M12 15v2.5"/><path d="M12 9V6.5"/><path d="M17.6 14.8l1.5 1.5"/><path d="M6.4 14.8l-1.5 1.5"/><path d="M17.6 9.2l1.5-1.5"/><path d="M6.4 9.2 4.9 7.7"/></svg>);
const TargetIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>);
const ShieldCheckIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>);
const BookOpenIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>);

const LandingWalkthrough = ({ handleLaunchAndNavigate, onUserGuideOpen, onFaqOpen, onPrivacyOpen, onTermsOpen, onDemoOpen }) => {
    
    const sections = [
        {
            icon: <BrainCircuitIcon className="w-8 h-8 text-purple-400" />,
            title: "The Core Engine",
            description: "At the heart of Scrybe AI is our proprietary 'Scrybe Score' system. The AI performs a deep, multi-layered analysis of every stock and assigns a single, objective score from -100 (a perfect short setup) to +100 (a perfect long setup), giving you an instant measure of quality.",
            links: [
                { text: "Launch the Ranked List", action: () => handleLaunchAndNavigate(1) }, // Jumps to Stock Analysis tab
                { text: "Read the Full Strategy", action: onUserGuideOpen },
            ]
        },
        {
            icon: <TargetIcon className="w-8 h-8 text-blue-400" />,
            title: "Actionable Features",
            description: "Go beyond a simple list. Our 'On The Radar' feature shows you which stocks are on the verge of a signal and tells you the exact condition the AI is waiting for. Use the 'Index Analysis' to understand the big picture before you make a move.",
            links: [
                { text: "See a Live Demo", action: onDemoOpen },
                { text: "Explore 'On The Radar'", action: () => handleLaunchAndNavigate(2) }, // Jumps to On The Radar tab
            ]
        },
        {
            icon: <ShieldCheckIcon className="w-8 h-8 text-green-400" />,
            title: "Trust & Transparency",
            description: "We believe in a transparent process. You can review the AI's full historical 'Track Record' to see its performance over time and read our detailed 'Rulebook' to understand the disciplined logic behind every single score.",
            links: [
                { text: "View AI Track Record", action: () => handleLaunchAndNavigate(5) }, // Jumps to Track Record tab
                { text: "Read the Rulebook", action: () => handleLaunchAndNavigate(6) }, // Jumps to Rulebook tab
            ]
        },
        {
            icon: <BookOpenIcon className="w-8 h-8 text-slate-400" />,
            title: "Support & Legal",
            description: "Your trust and privacy are paramount. Our comprehensive documentation and legal pages are always available to provide clarity on how our service works and how your data is handled. Have a question? Our FAQ has you covered.",
            links: [
                { text: "Frequently Asked Questions (FAQ)", action: onFaqOpen },
                { text: "Privacy Policy", action: onPrivacyOpen },
                { text: "Terms & Conditions", action: onTermsOpen },
            ]
        }
    ];

    return (
        <div className="w-full max-w-7xl mx-auto my-16 px-4 py-16">
            <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
                    Your Complete Analytical Toolkit
                </h2>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-400">
                    Scrybe AI is more than a signal generator. It's a full suite of tools designed to give you a professional edge. Here's your map to everything the app has to offer.
                </p>
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
                {sections.map((section, index) => (
                    <motion.div 
                        key={section.title}
                        className="bg-slate-900/60 border border-slate-700/60 rounded-2xl p-8 shadow-2xl backdrop-blur-lg flex flex-col"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-slate-800 rounded-lg flex items-center justify-center">
                                {section.icon}
                            </div>
                            <h3 className="text-3xl font-bold text-white">{section.title}</h3>
                        </div>
                        <p className="text-slate-300 leading-relaxed flex-grow">{section.description}</p>
                        
                        <div className="mt-6 pt-6 border-t border-slate-700/50 space-y-3">
                            {section.links.map(link => (
                                <button 
                                    key={link.text} 
                                    onClick={link.action} 
                                    className="w-full text-left text-blue-400 font-semibold hover:text-blue-300 transition-colors p-2 rounded-md hover:bg-slate-800/50"
                                >
                                    {link.text} &rarr;
                                </button>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default LandingWalkthrough;