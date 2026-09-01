import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Home() {
    return (
        <div className="page">
            <Navbar />

            {/* Hero Section with animated background */}
            <section className="hero-section">
                <div className="hero-bg-animation"></div>
                <div className="hero-glow hero-glow-1"></div>
                <div className="hero-glow hero-glow-2"></div>

                <div className="container hero-content">
                    <div className="hero-badge">
                        <span className="badge-dot"></span>
                        AI-Powered Validation Engine
                    </div>

                    <h1 className="hero-title">
                        Validate Your <br />
                        <span className="gradient-text animated-gradient">Startup Idea</span>
                        <br />Before You Build
                    </h1>

                    <p className="hero-subtitle">
                        Get brutally honest, data-driven analysis powered by AI.
                        No hype—just real insights from market data, competitor research,
                        and ML-based probability estimation.
                    </p>

                    <div className="hero-cta">
                        <Link to="/validate" className="btn btn-primary btn-lg btn-glow">
                            <span>🚀</span> Start Free Validation
                        </Link>
                        <a href="#how-it-works" className="btn btn-ghost btn-lg">
                            See How It Works
                        </a>
                    </div>

                    {/* Trust indicators */}
                    <div className="trust-indicators">
                        <div className="trust-item">
                            <span className="trust-number">7</span>
                            <span className="trust-label">Analysis Points</span>
                        </div>
                        <div className="trust-divider"></div>
                        <div className="trust-item">
                            <span className="trust-number">AI</span>
                            <span className="trust-label">Powered</span>
                        </div>
                        <div className="trust-divider"></div>
                        <div className="trust-item">
                            <span className="trust-number">Free</span>
                            <span className="trust-label">To Use</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">📊</div>
                            <div className="stat-value">90%</div>
                            <div className="stat-label">of startups fail without validation</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">💡</div>
                            <div className="stat-value">42%</div>
                            <div className="stat-label">fail due to no market need</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">⚡</div>
                            <div className="stat-value">2 Min</div>
                            <div className="stat-label">to get comprehensive analysis</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="how-it-works-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">How It Works</span>
                        <h2 className="section-title">
                            7-Point <span className="gradient-text">AI Analysis</span>
                        </h2>
                        <p className="section-subtitle">
                            Our AI engine runs your idea through 7 comprehensive validation checks
                        </p>
                    </div>

                    <div className="steps-timeline">
                        <div className="step-card">
                            <div className="step-number">01</div>
                            <div className="step-icon">🎯</div>
                            <h3>Idea Clarity</h3>
                            <p>Extract assumptions, pain points, and value propositions</p>
                        </div>

                        <div className="step-card">
                            <div className="step-number">02</div>
                            <div className="step-icon">📈</div>
                            <h3>Market Analysis</h3>
                            <p>TAM/SAM/SOM estimation with growth trends</p>
                        </div>

                        <div className="step-card">
                            <div className="step-number">03</div>
                            <div className="step-icon">🏆</div>
                            <h3>Competitor Intel</h3>
                            <p>Direct competitors, market gaps, switching costs</p>
                        </div>

                        <div className="step-card">
                            <div className="step-number">04</div>
                            <div className="step-icon">🎲</div>
                            <h3>Success Probability</h3>
                            <p>ML-based estimation using historical patterns</p>
                        </div>

                        <div className="step-card">
                            <div className="step-number">05</div>
                            <div className="step-icon">⚠️</div>
                            <h3>Risk Analysis</h3>
                            <p>Failure modes with mitigation strategies</p>
                        </div>

                        <div className="step-card">
                            <div className="step-number">06</div>
                            <div className="step-icon">💰</div>
                            <h3>Business Feasibility</h3>
                            <p>Costs, scalability, and break-even timeline</p>
                        </div>

                        <div className="step-card featured">
                            <div className="step-number">07</div>
                            <div className="step-icon">⚖️</div>
                            <h3>Final Verdict</h3>
                            <p>GO / PIVOT / KILL recommendation</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="features-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">Features</span>
                        <h2 className="section-title">
                            Everything You Need to <span className="gradient-text">Decide</span>
                        </h2>
                    </div>

                    <div className="features-grid-pro">
                        <div className="feature-card-pro">
                            <div className="feature-icon-pro">📄</div>
                            <h3>PDF Export</h3>
                            <p>Download professional reports to share with investors and co-founders</p>
                        </div>

                        <div className="feature-card-pro">
                            <div className="feature-icon-pro">📊</div>
                            <h3>Visual Charts</h3>
                            <p>Radar charts, gauges, and score breakdowns for easy understanding</p>
                        </div>

                        <div className="feature-card-pro">
                            <div className="feature-icon-pro">📚</div>
                            <h3>History Tracking</h3>
                            <p>Save and compare multiple idea validations over time</p>
                        </div>

                        <div className="feature-card-pro">
                            <div className="feature-icon-pro">🌓</div>
                            <h3>Dark/Light Mode</h3>
                            <p>Easy on the eyes with automatic preference saving</p>
                        </div>

                        <div className="feature-card-pro">
                            <div className="feature-icon-pro">🔗</div>
                            <h3>Shareable Links</h3>
                            <p>Share your validation results with anyone via URL</p>
                        </div>

                        <div className="feature-card-pro">
                            <div className="feature-icon-pro">📱</div>
                            <h3>Mobile Ready</h3>
                            <p>Works perfectly on all devices and screen sizes</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-card">
                        <div className="cta-glow"></div>
                        <h2>Ready to Validate Your Idea?</h2>
                        <p>Get a comprehensive analysis in under 2 minutes. No signup required.</p>
                        <Link to="/validate" className="btn btn-primary btn-lg btn-glow">
                            Start Validation Now →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <span className="logo-icon">🚀</span>
                            <span>Startup Validator</span>
                        </div>
                        <p className="footer-text">
                            Built with ❤️ for founders who want real answers, not hype.
                        </p>
                        <div className="footer-tech">
                            <span>React</span>
                            <span>•</span>
                            <span>Node.js</span>
                            <span>•</span>
                            <span>Groq AI</span>
                            <span>•</span>
                            <span>Chart.js</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home
