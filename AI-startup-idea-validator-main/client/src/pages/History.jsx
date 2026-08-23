import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import historyService from '../services/historyService';

function History() {
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setHistory(historyService.getAll());
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Delete this validation?')) {
            const updated = historyService.delete(id);
            setHistory(updated);
        }
    };

    const handleClearAll = () => {
        if (window.confirm('Clear all history? This cannot be undone.')) {
            historyService.clearAll();
            setHistory([]);
        }
    };

    const getVerdictColor = (verdict) => {
        switch (verdict) {
            case 'GO': return 'var(--success)';
            case 'PIVOT': return 'var(--warning)';
            case 'KILL': return 'var(--danger)';
            default: return 'var(--text-secondary)';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="page">
            <Navbar />
            <main className="container" style={{ paddingTop: '6rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <h1 className="gradient-text">Validation History</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            {history.length} saved validation{history.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                    {history.length > 0 && (
                        <button
                            onClick={handleClearAll}
                            style={{
                                background: 'transparent',
                                border: '1px solid var(--danger)',
                                color: 'var(--danger)',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                cursor: 'pointer'
                            }}
                        >
                            Clear All
                        </button>
                    )}
                </div>

                {history.length === 0 ? (
                    <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📭</div>
                        <h2>No validations yet</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            Start validating startup ideas to build your history
                        </p>
                        <Link to="/validate" className="btn btn-primary">
                            Validate an Idea
                        </Link>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {history.map((item) => (
                            <div
                                key={item.id}
                                className="glass-card"
                                style={{
                                    padding: '1.5rem',
                                    display: 'grid',
                                    gridTemplateColumns: '1fr auto auto',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s'
                                }}
                                onClick={() => navigate(`/results/${item.id}`)}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div>
                                    <p style={{
                                        color: 'var(--text-primary)',
                                        marginBottom: '0.5rem',
                                        fontWeight: '500'
                                    }}>
                                        {item.ideaDescription}
                                    </p>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                        {formatDate(item.createdAt)}
                                    </p>
                                </div>

                                <div style={{ textAlign: 'center' }}>
                                    <span style={{
                                        display: 'inline-block',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '1rem',
                                        background: `${getVerdictColor(item.verdict)}20`,
                                        color: getVerdictColor(item.verdict),
                                        fontWeight: 'bold',
                                        fontSize: '0.875rem'
                                    }}>
                                        {item.verdict}
                                    </span>
                                    {item.score && (
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                            Score: {item.score}/10
                                        </p>
                                    )}
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(item.id);
                                    }}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: 'var(--text-secondary)',
                                        cursor: 'pointer',
                                        padding: '0.5rem',
                                        fontSize: '1.25rem',
                                        opacity: 0.6,
                                        transition: 'opacity 0.2s'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                                    onMouseOut={(e) => e.currentTarget.style.opacity = '0.6'}
                                    title="Delete"
                                >
                                    🗑️
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default History;
