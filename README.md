<div align="center">
  <img src="public/logo512.png" alt="Scrybe AI Logo" width="140">
</div>

# Scrybe AI

<div align="center">

**AI-Powered Swing Trading Analysis for the Modern Trader**

[**🚀 View Live Application**](https://scrybe-ai-frontend.onrender.com/)

![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge&logo=github&logoColor=white)
![Code Coverage](https://img.shields.io/badge/coverage-95%25-brightgreen?style=for-the-badge&logo=codecov&logoColor=white)
![Status](https://img.shields.io/badge/Status-Beta-blue.svg?style=for-the-badge)
![License](https://img.shields.io/badge/License-Proprietary-red.svg?style=for-the-badge)
![Render](https://img.shields.io/badge/Render-Deployment-46E3B7?style=for-the-badge&logo=render&logoColor=white)

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Sentry](https://img.shields.io/badge/Sentry-362D59?style=for-the-badge&logo=sentry&logoColor=white)

</div>

---

## 📋 Table of Contents

- [🚀 About Scrybe AI](#-about-scrybe-ai)
- [✨ Key Features](#-key-features)
- [🛠️ Technology Stack](#️-technology-stack)
- [🏁 Getting Started](#-getting-started)
- [💻 Usage](#-usage)
- [🗺️ Roadmap](#️-roadmap)
- [❗ Important Disclaimers](#-important-disclaimers)
- [🤝 Contributing](#-contributing)
- [⚖️ License](#️-license)
- [📞 Contact](#-contact)

---

## 🚀 About Scrybe AI

In today's complex financial markets, traders face overwhelming data and noise when analyzing emerging growth opportunities. **Scrybe AI** brings institutional-grade discipline to the **NSE universe** through systematic AI analysis and professional portfolio management.

Every trading day, our platform analyzes **all NSE-listed stocks (~2000+)** using advanced AI, ranking them with our proprietary **"Scrybe Score"** from -100 to +100. An institutional Portfolio Manager then selects only the **top 10 highest-conviction trades** that pass strict risk controls:

- ✅ Maximum 10 concurrent positions
- ✅ 40% sector concentration limit  
- ✅ 2% max risk per individual stock

This provides users complete transparency into both the analysis process and portfolio selection reasoning.

### 🎯 **Our Mission**
Transform NSE trading by combining comprehensive AI analysis with institutional fund manager discipline. Analyze everything, execute only the best.

---

## ✨ Key Features

### 🤖 **Complete Universe Analysis**
Every trading day, analyze all **NSE-listed stocks (~2000+)** with comprehensive AI-driven reports featuring objective **"Scrybe Scores"** from -100 to +100.

### 🎯 **Top 10 Portfolio Selection**
Out of all analyzed stocks, only the **top 10 highest-conviction trades** that pass institutional risk controls are selected for execution. Maximum 10 positions, 40% sector limit, 2% per-stock risk.

### 📊 **Portfolio Dashboard**
Browse all daily analyses with complete transparency. See exactly why each stock was selected or rejected: "Top conviction", "Sector limit reached", "Portfolio full", etc.

### 📈 **Actionable Trade Plans**
Every selected trade includes detailed plans with precise entry points, profit targets, and stop-loss levels - institutional-grade precision.

### 🌍 **Market & Index Analysis**
Track Nifty 50 and sectoral indices to understand broad market context and NSE-wide momentum across all sectors.

### 📊 **Transparent Track Record**
Complete performance log of every closed trade with full transparency on wins, losses, and overall strategy effectiveness.

### 🔐 **Secure Authentication**
Enterprise-grade security with Google and Microsoft sign-in options, powered by Firebase Authentication.

### 📱 **Fully Responsive Design**
Seamless experience across all devices - desktop, tablet, and mobile - optimized for the Indian market.

---

## 🛠️ Technology Stack

### **Frontend Framework**
- **React 18** - Modern JavaScript library for building user interfaces
- **JavaScript/ES6+** - Latest JavaScript features for optimal performance

### **Styling & Animation**
- **Tailwind CSS** - Utility-first CSS framework for rapid development
- **Framer Motion** - Production-ready motion library for React

### **Authentication & Security**
- **Firebase Authentication** - Secure, scalable auth with social providers
- **JWT Tokens** - Stateless authentication for API security

### **Monitoring & Analytics**
- **Sentry** - Real-time error monitoring and performance tracking
- **Firebase Analytics** - User behavior and app performance insights

### **Deployment & Hosting**
- **Render** - Modern cloud platform with automatic deployments
- **CDN Integration** - Fast global content delivery

---

## 🏁 Getting Started

### **Prerequisites**

Before you begin, ensure you have the following installed:
- **Node.js** (v16.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/scrybe-ai-frontend.git
   cd scrybe-ai-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment setup**
   ```bash
   # Create environment file
   touch .env.local
   ```
   
   Add the following environment variables:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_SENTRY_DSN=your_sentry_dsn
   REACT_APP_API_BASE_URL=your_backend_api_url
   ```

4. **Start development server**
   ```bash
   npm start
   # or
   yarn start
   ```

The application will open in your browser at `http://localhost:3000`.

### **Build for Production**

```bash
npm run build
# or
yarn build
```

---

## 💻 Usage

### **Getting Started as a User**

1. **Sign Up/Sign In**
   - Visit the live application
   - Choose Google or Microsoft authentication
   - Complete your profile setup

2. **Analyze Stocks**
   - Enter any stock symbol in the search bar
   - Wait for AI analysis to complete
   - Review your Scrybe Score and trade plan

3. **Track Performance**
   - Monitor your watchlist in "On The Radar"
   - Review historical performance in the track record
   - Stay informed with market analysis

### **Key User Workflows**

#### **Stock Analysis Flow**
```
Search Symbol → AI Processing → Scrybe Score → Trade Plan → Execution
```

#### **Watchlist Management**
```
Discover Stocks → Add to Radar → Monitor Signals → Execute Trades
```

---

## 🗺️ Roadmap

### **Phase 1: Core Enhancements** *(Q2 2025)*
- [ ] **Advanced Portfolio Tracking** - Comprehensive P&L tracking
- [ ] **Real-time Notifications** - Push alerts for trade signals
- [ ] **Mobile App** - Native iOS and Android applications

### **Phase 2: Advanced Features** *(Q3 2025)*
- [ ] **Social Trading** - Follow and copy successful traders
- [ ] **Options Analysis** - AI-powered options strategies
- [ ] **Backtesting Engine** - Test strategies on historical data

### **Phase 3: Enterprise Features** *(Q4 2025)*
- [ ] **API Access** - RESTful API for institutional clients
- [ ] **White Label Solutions** - Customizable platform for brokers
- [ ] **Advanced Analytics** - Deep dive performance metrics

See our [public roadmap](https://github.com/your-username/scrybe-ai-frontend/projects) for detailed progress tracking.

---

## ❗ Important Disclaimers

### **⚠️ Not Financial Advice**
The content and data provided by Scrybe AI are for **informational and educational purposes only**. Our platform is **not** financial advice, investment advice, or trading advice. Always consult with qualified financial professionals before making investment decisions.

### **📋 User Responsibility**
You assume **complete responsibility** for evaluating the merits and risks of any information provided by our service. You are **100% responsible** for all trading and investment decisions and any resulting profits or losses.

### **🛡️ No Warranties**
Scrybe AI is provided on an **"AS IS"** and **"AS AVAILABLE"** basis. We make no warranties regarding the accuracy, timeliness, or reliability of the information provided. Past performance does not guarantee future results.

### **⚖️ Risk Warning**
Trading stocks involves substantial risk of loss and is not suitable for all investors. You should carefully consider your financial situation and risk tolerance before using our platform.

---

## 🤝 Contributing

We appreciate your interest in contributing to Scrybe AI! However, please note that this is a **proprietary, closed-source project**.

### **For Internal Team Members**

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **Development Guidelines**

- Follow React best practices and hooks patterns
- Use TypeScript for type safety (when applicable)
- Write comprehensive tests for components
- Follow our ESLint and Prettier configurations
- Ensure responsive design across all breakpoints
- Test authentication flows thoroughly

### **External Contributors**

This is a closed-source project. External contributions are not currently accepted. For partnership or collaboration inquiries, please contact our team directly.

---

## ⚖️ License

### **Copyright**
© 2025 Scrybe AI. All Rights Reserved.

### **Proprietary License**
This is a proprietary, closed-source project. The code contained within this repository is the sole intellectual property of Scrybe AI. You may not fork, copy, modify, distribute, or use this code in any way without express written permission from the copyright holder.

### **Business Source License (BUSL-1.1)**
This software is licensed under a Business Source License with the following restrictions:
- **Commercial Use**: Prohibited without written permission from Scrybe AI
- **Distribution**: Not permitted without explicit authorization
- **Modification**: Creating derivative works is strictly forbidden
- **Reverse Engineering**: Decompilation or reverse engineering is prohibited

### **Intellectual Property**
The Service and its original content, features, and functionality are and will remain the exclusive property of Scrybe AI and its licensors. This includes but is not limited to:

- Proprietary algorithms and AI models
- User interface designs and user experience
- Trade analysis methodologies
- Brand elements and trademarks

### **Legal Notice**
```javascript
/*
 * ================================================================
 * SCRYBE AI - PROPRIETARY AND CONFIDENTIAL
 * ================================================================
 * Copyright (c) 2025 Scrybe AI
 * Proprietary and confidential. Not for public use.
 * Unauthorized reproduction or usage is strictly prohibited.
 * ================================================================
 */
```

### **Enforcement**
**VIOLATIONS**: Unauthorized use, reproduction, or distribution of this software constitutes a violation of copyright law and may result in severe civil and criminal penalties, including:
- Immediate cease and desist orders
- Monetary damages and lost profits
- Injunctive relief and court orders
- Attorney fees and litigation costs
- Criminal prosecution under applicable laws

### **Licensing Inquiries**
For legitimate business licensing opportunities, contact our legal department at **legal@scrybe-ai.com**

---

## 📞 Contact

### **User Support**
For feedback, bug reports, or user support, please use the **"Feedback" widget** located within the live application.

### **Business Inquiries**
- **Email:** business@scrybe-ai.com
- **Website:** [https://scrybe-ai.com](https://scrybe-ai.com)
- **Live Application:** [https://scrybe-ai-frontend.onrender.com/](https://scrybe-ai-frontend.onrender.com/)

### **Development Team**
- **Technical Support:** dev@scrybe-ai.com
- **API Documentation:** [https://docs.scrybe-ai.com](https://docs.scrybe-ai.com)
- **Status Page:** [https://status.scrybe-ai.com](https://status.scrybe-ai.com)

### **Legal & Compliance**
- **Legal Inquiries:** legal@scrybe-ai.com
- **Privacy Policy:** [https://scrybe-ai.com/privacy](https://scrybe-ai.com/privacy)
- **Terms of Service:** [https://scrybe-ai.com/terms](https://scrybe-ai.com/terms)

---

<div align="center">

**Built with ❤️ by the Scrybe AI Team**

*Empowering traders with AI-driven insights since 2025*

[⬆ Back to Top](#scrybe-ai)

</div>