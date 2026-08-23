# 🚀 Startup Idea Validation Engine

An AI-powered startup idea validation platform that provides comprehensive analysis using the **Groq LLM API (Llama 3.3 70B)**. Get data-driven insights on your startup idea's potential with 7 in-depth validation tasks.

![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=nodedotjs)
![Express](https://img.shields.io/badge/Express-Backend-lightgrey?style=flat-square&logo=express)
![Groq](https://img.shields.io/badge/Groq-Llama_3.3_70B-orange?style=flat-square)
![Chart.js](https://img.shields.io/badge/Chart.js-Visuals-FF6384?style=flat-square&logo=chartdotjs)

---

## ✨ Features

### 🎯 7-Point Validation Analysis
* **Idea Clarity & Assumption Extraction:** Analyzes problem-solution fit and core business assumptions.
* **Market Analysis:** TAM, SAM, and SOM estimation with industry growth trends.
* **Competitor Analysis:** Identifies direct & indirect competitors alongside clear market gaps.
* **ML-Based Success Probability:** AI-driven success probability with detailed factor breakdown.
* **Risk & Failure Mode Analysis:** Highlights critical failure risks and outlines mitigation strategies.
* **Business Feasibility:** Assesses scalability, monetization models, and break-even timelines.
* **Final Verdict:** Generates a definitive **GO**, **PIVOT**, or **KILL** recommendation with rationale.

### 📊 Visual Analytics
* **Radar Chart:** Multi-dimensional metric evaluation across all 7 parameters.
* **Success Gauge:** Animated visual meter displaying viability percentage.
* **Breakdown Bars:** Granular scores for individual business components.
* **Score Badges:** Color-coded status indicators for rapid scanning.

### 🎨 Premium UI/UX
* **Dark/Light Theme Toggle:** Persistent theme state saved across browser sessions.
* **Glassmorphism Design:** Clean, modern visual aesthetics.
* **Mobile Responsive:** Seamless experience across mobile, tablet, and desktop screens.
* **PDF Export:** Instant one-click download of professional reports via `jsPDF`.
* **Validation History:** Offline persistence of previous analyses directly via `localStorage`.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite |
| **Styling** | Custom CSS, Glassmorphism UI |
| **Charts** | Chart.js, react-chartjs-2 |
| **Document Generation** | jsPDF |
| **Backend** | Node.js, Express.js |
| **AI / LLM** | Groq API (Llama 3.3 70B) |
| **Client Storage** | Browser `localStorage` |

---

## 📁 Project Structure

```text
startup-idea-validator/
├── client/                     # React Frontend (Vite)
│   ├── src/
│   │   ├── components/         # Reusable UI components (Charts, Navbar, ResultDisplays)
│   │   ├── context/            # ThemeContext (Dark/Light theme state)
│   │   ├── pages/              # Home, Validate, Results, History
│   │   ├── services/           # historyService (localStorage wrapper)
│   │   └── utils/              # pdfExport.js (jsPDF utilities)
│   └── package.json
│
├── server/                     # Express Backend
│   ├── lib/                    # Groq AI client, Prompt templates, Session store
│   ├── routes/                 # validate.js (API routes)
│   ├── services/               # validationService.js (7 validation tasks)
│   ├── index.js                # Express entry point
│   └── package.json
│
├── .env.example
├── .gitignore
└── README.md
