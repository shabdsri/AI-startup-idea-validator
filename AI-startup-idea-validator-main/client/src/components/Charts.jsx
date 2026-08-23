import { Radar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    ArcElement
);

// Radar chart for overall scores
export function ScoreRadarChart({ results }) {
    if (!results) return null;

    const scores = {
        'Idea Clarity': results.ideaClarity?.ideaClarityScore || 5,
        'Market': results.marketAnalysis?.marketScore || 5,
        'Competition': results.competitorAnalysis?.competitorScore || 5,
        'Feasibility': results.businessFeasibility?.feasibilityScore || 5,
        'Risk (inverted)': 10 - (results.riskAnalysis?.overallRiskScore || 5),
        'Success': ((results.successProbability?.probability || results.successProbability?.successProbability?.percentage || 35) / 10)
    };

    const data = {
        labels: Object.keys(scores),
        datasets: [
            {
                label: 'Score',
                data: Object.values(scores),
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                borderColor: 'rgba(99, 102, 241, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(99, 102, 241, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(99, 102, 241, 1)'
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                beginAtZero: true,
                max: 10,
                ticks: {
                    stepSize: 2,
                    color: 'rgba(255, 255, 255, 0.5)'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                pointLabels: {
                    color: 'rgba(255, 255, 255, 0.8)',
                    font: { size: 11 }
                }
            }
        },
        plugins: {
            legend: { display: false }
        }
    };

    return (
        <div style={{ height: '280px', width: '100%' }}>
            <Radar data={data} options={options} />
        </div>
    );
}

// Gauge-like doughnut for success probability
export function SuccessGauge({ probability }) {
    const value = probability || 35;
    const color = value >= 50 ? '#22c55e' : value >= 30 ? '#eab308' : '#ef4444';

    const data = {
        datasets: [
            {
                data: [value, 100 - value],
                backgroundColor: [color, 'rgba(255, 255, 255, 0.1)'],
                borderWidth: 0,
                circumference: 180,
                rotation: 270
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
        }
    };

    return (
        <div style={{ position: 'relative', height: '150px', width: '200px', margin: '0 auto' }}>
            <Doughnut data={data} options={options} />
            <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color }}>{value}%</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Success Probability</div>
            </div>
        </div>
    );
}

// Score badge component
export function ScoreBadge({ score, label }) {
    const color = score >= 7 ? '#22c55e' : score >= 4 ? '#eab308' : '#ef4444';

    return (
        <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: `${color}20`,
            border: `1px solid ${color}`,
            borderRadius: '2rem'
        }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color }}>{score}/10</span>
            {label && <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{label}</span>}
        </div>
    );
}
