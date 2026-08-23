# 🚀 Startup Idea Validation Engine

An AI-powered startup idea validation platform that provides comprehensive analysis using the Groq LLM API. Get data-driven insights on your startup idea's potential with 7 in-depth validation tasks.

![React](https://img.shields.io/badge/React-18.2-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![Groq](https://img.shields.io/badge/AI-Groq%20LLM-orange)
![Chart.js](https://img.shields.io/badge/Charts-Chart.js-yellow)

## ✨ Features

### 🎯 7-Point Validation Analysis
1. **Idea Clarity & Assumption Extraction** - Analyzes problem-solution fit and core assumptions
2. **Market Analysis** - TAM/SAM/SOM estimation and growth trends
3. **Competitor Analysis** - Direct/indirect competitors and market gaps
4. **ML-Based Success Probability** - AI-driven success probability with breakdown
5. **Risk & Failure Mode Analysis** - Critical risks and mitigation strategies
6. **Business Feasibility** - Scalability, monetization, and break-even analysis
7. **Final Verdict** - GO/PIVOT/KILL recommendation with rationale

### 📊 Visual Analytics
- **Radar Chart** - Multi-dimensional score visualization
- **Success Gauge** - Animated probability meter
- **Breakdown Bars** - Individual factor scores
- **Score Badges** - Color-coded performance indicators

### 🎨 Premium UI Features
- **Dark/Light Theme Toggle** - Persistent preference
- **Glassmorphism Design** - Modern, premium aesthetics
- **Mobile Responsive** - Works on all devices
- **PDF Export** - Download professional reports
- **Share Results** - Copy shareable link
- **Validation History** - Track past analyses

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + Vite |
| Styling | Custom CSS + Glassmorphism |
| Charts | Chart.js + react-chartjs-2 |
| PDF | jsPDF |
| Backend | Node.js + Express |
| AI | Groq API (Llama 3.3 70B) |
| Storage | localStorage |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Groq API key (free at [console.groq.com](https://console.groq.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/startup-idea-validator.git
   cd startup-idea-validator
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your GROQ_API_KEY
   ```

3. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

4. **Start the development servers**
   ```bash
   # Terminal 1: Start backend
   cd server
   npm run dev

   # Terminal 2: Start frontend
   cd client
   npm run dev
   ```

5. **Open in browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 📁 Project Structure

```
startup-idea-validator/
├── client/                    # React Frontend (Vite)
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Charts.jsx     # Radar chart, gauge, badges
│   │   │   ├── Navbar.jsx     # Navigation with theme toggle
│   │   │   └── ResultDisplays.jsx  # Formatted task results
│   │   ├── context/
│   │   │   └── ThemeContext.jsx    # Dark/light theme
│   │   ├── pages/
│   │   │   ├── Home.jsx       # Landing page
│   │   │   ├── Validate.jsx   # Input form
│   │   │   ├── Results.jsx    # Analysis results
│   │   │   └── History.jsx    # Past validations
│   │   ├── services/
│   │   │   └── historyService.js   # localStorage
│   │   └── utils/
│   │       └── pdfExport.js   # PDF generation
│   └── package.json
│
├── server/                    # Express Backend
│   ├── lib/
│   │   ├── gemini.js          # Groq AI client
│   │   ├── prompts.js         # AI prompt templates
│   │   └── sessionStore.js    # In-memory sessions
│   ├── routes/
│   │   └── validate.js        # API endpoints
│   ├── services/
│   │   └── validationService.js  # 7 validation tasks
│   ├── index.js               # Express server
│   └── package.json
│
├── .env.example               # Environment template
├── .gitignore
└── README.md
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
GROQ_API_KEY=your_groq_api_key_here
PORT=3001
```

## 📸 Screenshots

### Landing Page
Modern dark theme with glassmorphism effects

### Validation Form
Step-by-step input wizard

### Analysis Results
Charts, scores, and detailed breakdowns

### PDF Export
Professional downloadable reports

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Groq](https://groq.com) for the fast LLM API
- [Chart.js](https://chartjs.org) for beautiful charts
- [React](https://react.dev) for the UI framework

---

Made with ❤️ for startup founders and entrepreneurs

## 🧑‍💻 Developer: Run locally (quick)

1. Start the backend (terminal A):
```bash
cd server
npm install
npm run dev
```

2. Start the frontend (terminal B):
```bash
cd client
npm install
npm run dev
```

3. Open the site:
- Frontend: http://localhost:5173/
- Backend health: http://localhost:3001/api/health

Notes:
- If `npm audit` shows vulnerabilities, run `npm audit fix` first. Use `npm audit fix --force` only if you accept possible breaking upgrades (it may bump Vite). 
- If the server fails to start due to port in use, stop the old process (or set `PORT` in `.env`).
