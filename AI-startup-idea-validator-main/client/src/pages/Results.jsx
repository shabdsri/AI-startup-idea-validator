import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config/api';
import Navbar from '../components/Navbar';
import { ScoreRadarChart, SuccessGauge, ScoreBadge } from '../components/Charts';
import { getResultDisplay } from '../components/ResultDisplays';
import { generatePDF } from '../utils/pdfExport';
import historyService from '../services/historyService';

function Results() {
    const { id } = useParams();
    const [validation, setValidation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedTasks, setExpandedTasks] = useState({});
    const [copied, setCopied] = useState(false);
    const [exporting, setExporting] = useState(false);

    useEffect(() => {
        let interval;

        const fetchResults = async () => {
            try {
                // First check localStorage for cached results
                // Skip cache if results have _notice (stale fallback from when API key was missing)
                const cached = historyService.getById(id);
                const hasStaleNotice = cached?.results && Object.values(cached.results).some(r => r?._notice);
                if (cached && cached.status === 'complete' && !hasStaleNotice) {
                    setValidation(cached);
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`${API_URL}/api/validate/${id}`);
                setValidation(response.data);

                if (response.data.status === 'complete' || response.data.status === 'error') {
                    setLoading(false);
                    clearInterval(interval);

                    // Save to history when complete
                    if (response.data.status === 'complete') {
                        historyService.save(response.data);
                    }
                }
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to fetch results');
                setLoading(false);
                clearInterval(interval);
            }
        };

        fetchResults();
        interval = setInterval(fetchResults, 2000);

        return () => clearInterval(interval);
    }, [id]);

    const toggleTask = (taskId) => {
        setExpandedTasks(prev => ({
            ...prev,
            [taskId]: !prev[taskId]
        }));
    };

    const handleShare = async () => {
        const url = window.location.href;
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback
            prompt('Copy this link:', url);
        }
    };

    const handleExportPDF = async () => {
        if (!validation?.results) return;
        setExporting(true);
        try {
            await generatePDF(validation.results, validation.ideaDescription);
        } catch (err) {
            console.error('PDF export failed:', err);
        }
        setExporting(false);
    };

    if (error) {
        return (
            <div className="page">
                <Navbar />
                <main className="container" style={{ paddingTop: '6rem', textAlign: 'center' }}>
                    <div className="glass-card" style={{ padding: '3rem' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>❌</div>
                        <h2>Error Loading Results</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>{error}</p>
                        <Link to="/validate" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                            Try Again
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    const tasks = [
        { id: 'ideaClarity', title: 'Task 1: Idea Clarity & Assumption Extraction', icon: '🎯', desc: 'Analyzing idea clarity, core assumptions, and value proposition' },
        { id: 'marketAnalysis', title: 'Task 2: Market Analysis', icon: '📊', desc: 'Researching market size, growth trends, and adoption barriers' },
        { id: 'competitorAnalysis', title: 'Task 3: Competitor Analysis', icon: '🏢', desc: 'Identifying competitors, market gaps, and switching costs' },
        { id: 'successProbability', title: 'Task 4: ML-Based Success Probability', icon: '📈', desc: 'Calculating success probability using historical patterns' },
        { id: 'riskAnalysis', title: 'Task 5: Risk & Failure Mode Analysis', icon: '⚠️', desc: 'Evaluating failure modes and risk mitigation strategies' },
        { id: 'businessFeasibility', title: 'Task 6: Business Feasibility', icon: '💼', desc: 'Assessing scalability, monetization, and break-even' },
        { id: 'finalVerdict', title: 'Task 7: Final Verdict', icon: '⚖️', desc: 'Comprehensive GO/PIVOT/KILL recommendation' }
    ];

    const getProgress = () => {
        if (!validation?.tasks) return 0;
        const completed = Object.values(validation.tasks).filter(t => t.status === 'complete').length;
        return Math.round((completed / 7) * 100);
    };

    const results = validation?.results || {};
    const verdict = results.finalVerdict;

    return (
        <div className="page">
            <Navbar />
            <main className="container" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 className="gradient-text">Validation Results</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        Session ID: {id}
                    </p>
                </div>

                {/* Action buttons */}
                {validation?.status === 'complete' && (
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
                        <button onClick={handleShare} className="btn btn-secondary">
                            {copied ? '✅ Copied!' : '🔗 Share Results'}
                        </button>
                        <button onClick={handleExportPDF} className="btn btn-primary" disabled={exporting}>
                            {exporting ? '⏳ Generating...' : '📄 Export PDF'}
                        </button>
                        <Link to="/validate" className="btn btn-secondary">
                            🔄 New Validation
                        </Link>
                    </div>
                )}

                {/* Progress bar */}
                {loading && (
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Analyzing...</span>
                            <span style={{ color: 'var(--primary)' }}>{getProgress()}%</span>
                        </div>
                        <div style={{
                            height: '8px',
                            background: 'var(--glass-bg)',
                            borderRadius: '4px',
                            overflow: 'hidden'
                        }}>
                            <div
                                style={{
                                    height: '100%',
                                    width: `${getProgress()}%`,
                                    background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                                    transition: 'width 0.5s ease'
                                }}
                            />
                        </div>
                    </div>
                )}

                {/* Final Verdict Summary */}
                {verdict && !verdict._notice && (
                    <div className="glass-card" style={{
                        marginBottom: '2rem',
                        padding: '2rem',
                        textAlign: 'center',
                        background: verdict.recommendation === 'GO' ? 'rgba(34, 197, 94, 0.1)' :
                            verdict.recommendation === 'PIVOT' ? 'rgba(234, 179, 8, 0.1)' :
                                'rgba(239, 68, 68, 0.1)'
                    }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', alignItems: 'center' }}>
                            {/* Verdict Badge */}
                            <div>
                                <span style={{
                                    display: 'inline-block',
                                    padding: '1rem 2rem',
                                    fontSize: '2rem',
                                    fontWeight: 'bold',
                                    borderRadius: '1rem',
                                    color: verdict.recommendation === 'GO' ? '#22c55e' :
                                        verdict.recommendation === 'PIVOT' ? '#eab308' : '#ef4444',
                                    background: 'var(--glass-bg)'
                                }}>
                                    {verdict.recommendation}
                                </span>
                                <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                                    Overall Score: <strong>{verdict.overallScore}/10</strong>
                                </p>
                            </div>

                            {/* Success Gauge */}
                            {results.successProbability && (
                                <SuccessGauge probability={results.successProbability.probability} />
                            )}

                            {/* Radar Chart */}
                            <div style={{ minHeight: '280px' }}>
                                <ScoreRadarChart results={results} />
                            </div>
                        </div>

                        {verdict.recommendationRationale && (
                            <p style={{ marginTop: '1.5rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '1.5rem auto 0' }}>
                                {verdict.recommendationRationale}
                            </p>
                        )}
                    </div>
                )}

                {/* Quick Stats */}
                {validation?.status === 'complete' && !verdict?._notice && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '1rem',
                        marginBottom: '2rem'
                    }}>
                        <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Idea Clarity</div>
                            <ScoreBadge score={results.ideaClarity?.ideaClarityScore || 'N/A'} />
                        </div>
                        <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Market</div>
                            <ScoreBadge score={results.marketAnalysis?.marketScore || 'N/A'} />
                        </div>
                        <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Competition</div>
                            <ScoreBadge score={results.competitorAnalysis?.competitorScore || 'N/A'} />
                        </div>
                        <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Feasibility</div>
                            <ScoreBadge score={results.businessFeasibility?.feasibilityScore || 'N/A'} />
                        </div>
                    </div>
                )}

                {/* Task Results */}
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {tasks.map((task) => {
                        const taskData = validation?.tasks?.[task.id];
                        const result = results[task.id];
                        const isComplete = taskData?.status === 'complete';
                        const isExpanded = expandedTasks[task.id];

                        return (
                            <div key={task.id} className="glass-card" style={{ overflow: 'hidden' }}>
                                <div
                                    onClick={() => isComplete && toggleTask(task.id)}
                                    style={{
                                        padding: '1.25rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        cursor: isComplete ? 'pointer' : 'default'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <span style={{ fontSize: '1.5rem' }}>{task.icon}</span>
                                        <div>
                                            <h3 style={{ margin: 0, fontSize: '1rem' }}>{task.title}</h3>
                                            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                                {task.desc}
                                            </p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        {isComplete ? (
                                            <span style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '1rem',
                                                background: 'rgba(34, 197, 94, 0.2)',
                                                color: '#22c55e',
                                                fontSize: '0.75rem',
                                                fontWeight: 'bold'
                                            }}>
                                                ✓ COMPLETE
                                            </span>
                                        ) : taskData?.status === 'running' ? (
                                            <span className="loading-spinner" />
                                        ) : (
                                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>PENDING</span>
                                        )}
                                        {isComplete && (
                                            <span style={{
                                                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                                                transition: 'transform 0.2s'
                                            }}>▼</span>
                                        )}
                                    </div>
                                </div>

                                {isExpanded && result && (
                                    <div style={{
                                        padding: '1.25rem',
                                        borderTop: '1px solid var(--glass-border)',
                                        background: 'rgba(0,0,0,0.2)'
                                    }}>
                                        {result._notice && (
                                            <div style={{
                                                padding: '1rem',
                                                background: 'rgba(234, 179, 8, 0.1)',
                                                border: '1px solid rgba(234, 179, 8, 0.3)',
                                                borderRadius: '0.5rem',
                                                color: '#eab308',
                                                marginBottom: '1rem'
                                            }}>
                                                ⚠️ {result._notice}
                                            </div>
                                        )}
                                        {getResultDisplay(task.id, result)}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

export default Results;
