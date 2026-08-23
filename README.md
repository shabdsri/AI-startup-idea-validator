# AI-startup-idea-validator
🚀 Startup Idea Validation Engine
An AI-powered startup idea validation platform that provides comprehensive analysis using the Groq LLM API. Get data-driven insights on your startup idea's potential with 7 in-depth validation tasks.

React Node.js Groq Chart.js

✨ Features
🎯 7-Point Validation Analysis
Idea Clarity & Assumption Extraction - Analyzes problem-solution fit and core assumptions
Market Analysis - TAM/SAM/SOM estimation and growth trends
Competitor Analysis - Direct/indirect competitors and market gaps
ML-Based Success Probability - AI-driven success probability with breakdown
Risk & Failure Mode Analysis - Critical risks and mitigation strategies
Business Feasibility - Scalability, monetization, and break-even analysis
Final Verdict - GO/PIVOT/KILL recommendation with rationale
📊 Visual Analytics
Radar Chart - Multi-dimensional score visualization
Success Gauge - Animated probability meter
Breakdown Bars - Individual factor scores
Score Badges - Color-coded performance indicators
🎨 Premium UI Features
Dark/Light Theme Toggle - Persistent preference
Glassmorphism Design - Modern, premium aesthetics
Mobile Responsive - Works on all devices
PDF Export - Download professional reports
Share Results - Copy shareable link
Validation History - Track past analyses
🛠️ Tech Stack
Layer	Technology
Frontend	React 18 + Vite
Styling	Custom CSS + Glassmorphism
Charts	Chart.js + react-chartjs-2
PDF	jsPDF
Backend	Node.js + Express
AI	Groq API (Llama 3.3 70B)
Storage	localStorage
🚀 Quick Start
Prerequisites
Node.js 18+
npm or yarn
Groq API key (free at console.groq.com)
Installation
Clone the repository

git clone https://github.com/YOUR_USERNAME/startup-idea-validator.git
cd startup-idea-validator
Set up environment variables

cp .env.example .env
# Edit .env and add your GROQ_API_KEY
Install dependencies

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
Start the development servers

# Terminal 1: Start backend
cd server
npm run dev

# Terminal 2: Start frontend
cd client
npm run dev
Open in browser

Frontend: http://localhost:5173
Backend API: http://localhost:3001
📁 Project Structure
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
🔧 Environment Variables
Create a .env file in the root directory:

GROQ_API_KEY=your_groq_api_key_here
PORT=3001
📸 Screenshots
Landing Page
Modern dark theme with glassmorphism effects

Validation Form
Step-by-step input wizard

Analysis Results
Charts, scores, and detailed breakdowns

PDF Export
Professional downloadable reports

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

📄 License
This project is licensed under the MIT License.

🙏 Acknowledgments
Groq for the fast LLM API
Chart.js for beautiful charts
React for the UI framework
Made with ❤️ for startup founders and entrepreneurs

🧑‍💻 Developer: Run locally (quick)
Start the backend (terminal A):
cd server
npm install
npm run dev
Start the frontend (terminal B):
cd client
npm install
npm run dev
Open the site:
Frontend: http://localhost:5173/
Backend health: http://localhost:3001/api/health
Notes:

If npm audit shows vulnerabilities, run npm audit fix first. Use npm audit fix --force only if you accept possible breaking upgrades (it may bump Vite).
If the server fails to start due to port in use, stop the old process (or set PORT in .env).
