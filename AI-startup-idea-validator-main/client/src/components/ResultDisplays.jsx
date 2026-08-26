import React from 'react';

// Formatted display for Idea Clarity results
export function IdeaClarityDisplay({ data }) {
    if (!data) return null;

    return (
        <div className="result-display">
            {data.problemSolutionStatement && (
                <div className="result-section-item">
                    <h4>💡 Problem-Solution Statement</h4>
                    <p>{data.problemSolutionStatement}</p>
                </div>
            )}

            {data.valueProposition && (
                <div className="result-section-item">
                    <h4>🎯 Value Proposition</h4>
                    <p>{data.valueProposition}</p>
                </div>
            )}

            {data.customerPainPoints?.length > 0 && (
                <div className="result-section-item">
                    <h4>😣 Customer Pain Points</h4>
                    <ul>
                        {data.customerPainPoints.map((point, i) => (
                            <li key={i}>{point}</li>
                        ))}
                    </ul>
                </div>
            )}

            {data.coreAssumptions?.length > 0 && (
                <div className="result-section-item">
                    <h4>🤔 Core Assumptions</h4>
                    <ul>
                        {data.coreAssumptions.map((assumption, i) => (
                            <li key={i}>{assumption}</li>
                        ))}
                    </ul>
                </div>
            )}

            {data.flaggedAssumptions?.length > 0 && (
                <div className="result-section-item">
                    <h4>⚠️ Flagged Assumptions</h4>
                    {data.flaggedAssumptions.map((item, i) => (
                        <div key={i} className="flagged-item">
                            <strong>{item.assumption}</strong>
                            <p><span style={{ color: 'var(--warning)' }}>Risk:</span> {item.risk}</p>
                            <p><span style={{ color: 'var(--success)' }}>Validation:</span> {item.validation}</p>
                        </div>
                    ))}
                </div>
            )}

            {data.ideaClarityScore && (
                <div className="score-display">
                    <span className="score-label">Clarity Score:</span>
                    <span className={`score-value ${data.ideaClarityScore >= 7 ? 'score-good' : data.ideaClarityScore >= 4 ? 'score-medium' : 'score-low'}`}>
                        {data.ideaClarityScore}/10
                    </span>
                </div>
            )}
        </div>
    );
}

// Market Analysis Display
export function MarketAnalysisDisplay({ data }) {
    if (!data) return null;

    // Support both AI output format (tam/sam/som objects) and legacy format (marketSizeEstimate)
    const tam = data.tam || (data.marketSizeEstimate ? { value: data.marketSizeEstimate.TAM } : null);
    const sam = data.sam || (data.marketSizeEstimate ? { value: data.marketSizeEstimate.SAM } : null);
    const som = data.som || (data.marketSizeEstimate ? { value: data.marketSizeEstimate.SOM } : null);
    // Support both growthTrend (object from AI) and growthTrends (array from legacy)
    const growthTrend = data.growthTrend || null;
    const growthTrends = data.growthTrends || [];

    return (
        <div className="result-display">
            {(tam || sam || som) && (
                <div className="result-section-item">
                    <h4>📊 Market Size</h4>
                    <div className="market-sizes">
                        {tam && (
                            <div className="market-size-box">
                                <span className="label">TAM</span>
                                <span className="value">{tam.value}</span>
                                {tam.confidence && <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Confidence: {tam.confidence}</span>}
                            </div>
                        )}
                        {sam && (
                            <div className="market-size-box">
                                <span className="label">SAM</span>
                                <span className="value">{sam.value}</span>
                                {sam.confidence && <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Confidence: {sam.confidence}</span>}
                            </div>
                        )}
                        {som && (
                            <div className="market-size-box">
                                <span className="label">SOM</span>
                                <span className="value">{som.value}</span>
                                {som.confidence && <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Confidence: {som.confidence}</span>}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {growthTrend && (
                <div className="result-section-item">
                    <h4>📈 Growth Trend</h4>
                    <p>
                        <strong style={{ textTransform: 'capitalize', color: growthTrend.direction === 'growing' ? 'var(--success)' : growthTrend.direction === 'declining' ? 'var(--error)' : 'var(--warning)' }}>
                            {growthTrend.direction}
                        </strong>{' — '}{growthTrend.rationale}
                    </p>
                </div>
            )}

            {growthTrends.length > 0 && (
                <div className="result-section-item">
                    <h4>📈 Growth Trends</h4>
                    <ul>
                        {growthTrends.map((trend, i) => (
                            <li key={i}>{trend}</li>
                        ))}
                    </ul>
                </div>
            )}

            {data.adoptionBarriers?.length > 0 && (
                <div className="result-section-item">
                    <h4>🚧 Adoption Barriers</h4>
                    <ul>
                        {data.adoptionBarriers.map((barrier, i) => (
                            <li key={i}>{barrier}</li>
                        ))}
                    </ul>
                </div>
            )}

            {data.willingnessToPay && (
                <div className="result-section-item">
                    <h4>💳 Willingness to Pay</h4>
                    <p><strong style={{ textTransform: 'capitalize' }}>{data.willingnessToPay.assessment}</strong></p>
                    {data.willingnessToPay.factors?.length > 0 && (
                        <ul>{data.willingnessToPay.factors.map((f, i) => <li key={i}>{f}</li>)}</ul>
                    )}
                </div>
            )}

            {data.dataLimitations?.length > 0 && (
                <div className="result-section-item" style={{ background: 'rgba(234,179,8,0.07)', borderRadius: '0.5rem', padding: '0.75rem' }}>
                    <h4 style={{ color: 'var(--warning)' }}>⚠️ Data Limitations</h4>
                    <ul>{data.dataLimitations.map((l, i) => <li key={i} style={{ color: 'var(--text-secondary)' }}>{l}</li>)}</ul>
                </div>
            )}

            {data.marketScore && (
                <div className="score-display">
                    <span className="score-label">Market Score:</span>
                    <span className={`score-value ${data.marketScore >= 7 ? 'score-good' : data.marketScore >= 4 ? 'score-medium' : 'score-low'}`}>
                        {data.marketScore}/10
                    </span>
                </div>
            )}
        </div>
    );
}

// Competitor Analysis Display
export function CompetitorAnalysisDisplay({ data }) {
    if (!data) return null;

    return (
        <div className="result-display">
            {data.directCompetitors?.length > 0 && (
                <div className="result-section-item">
                    <h4>🎯 Direct Competitors</h4>
                    {data.directCompetitors.map((comp, i) => (
                        <div key={i} className="competitor-card">
                            <strong>{comp.name}</strong>
                            {comp.offering && <p style={{ color: 'var(--text-secondary)' }}>{comp.offering}</p>}
                            {comp.pricing && <p><span style={{ color: 'var(--text-secondary)' }}>Pricing:</span> {comp.pricing}</p>}
                            {comp.strengths && (
                                <p><span style={{ color: 'var(--text-secondary)' }}>Strengths:</span>{' '}
                                    {Array.isArray(comp.strengths) ? comp.strengths.join(', ') : comp.strengths}
                                </p>
                            )}
                            {comp.weaknesses && (
                                <p><span style={{ color: 'var(--text-secondary)' }}>Weaknesses:</span>{' '}
                                    {Array.isArray(comp.weaknesses) ? comp.weaknesses.join(', ') : comp.weaknesses}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {data.indirectCompetitors?.length > 0 && (
                <div className="result-section-item">
                    <h4>🔄 Indirect Competitors</h4>
                    {data.indirectCompetitors.map((comp, i) => (
                        <div key={i} style={{ marginBottom: '0.5rem' }}>
                            <strong>{comp.name}</strong>
                            {comp.howTheyCompete && <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>— {comp.howTheyCompete}</span>}
                        </div>
                    ))}
                </div>
            )}

            {data.marketGaps?.length > 0 && (
                <div className="result-section-item">
                    <h4>🕳️ Market Gaps</h4>
                    <ul>
                        {data.marketGaps.map((gap, i) => (
                            <li key={i}>{gap}</li>
                        ))}
                    </ul>
                </div>
            )}

            {data.competitorScore && (
                <div className="score-display">
                    <span className="score-label">Competitive Position:</span>
                    <span className={`score-value ${data.competitorScore >= 7 ? 'score-good' : data.competitorScore >= 4 ? 'score-medium' : 'score-low'}`}>
                        {data.competitorScore}/10
                    </span>
                </div>
            )}
        </div>
    );
}

// Success Probability Display with breakdown bars
export function SuccessProbabilityDisplay({ data }) {
    if (!data) return null;

    // Handle both old and new response formats
    const prob = data.probability || data.successProbability?.percentage || 0;
    const probColor = prob >= 50 ? 'var(--success)' : prob >= 30 ? 'var(--warning)' : 'var(--error)';
    const breakdown = data.probabilityBreakdown || {};

    // Breakdown categories with labels
    const breakdownItems = [
        { key: 'marketOpportunity', label: 'Market Opportunity', icon: '📊' },
        { key: 'problemSolutionFit', label: 'Problem-Solution Fit', icon: '🎯' },
        { key: 'executionFeasibility', label: 'Execution Feasibility', icon: '⚙️' },
        { key: 'competitivePosition', label: 'Competitive Position', icon: '🏆' },
        { key: 'timing', label: 'Market Timing', icon: '⏰' }
    ];

    return (
        <div className="result-display">
            {/* Main probability display */}
            <div className="probability-display" style={{ textAlign: 'center', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{
                    fontSize: '4rem',
                    fontWeight: 'bold',
                    color: probColor,
                    textShadow: `0 0 30px ${probColor}40`
                }}>{prob}%</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Success Probability</div>
                {data.confidenceInterval && (
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                        Confidence: {typeof data.confidenceInterval === 'string' ? data.confidenceInterval : `${data.confidenceInterval.low}% - ${data.confidenceInterval.high}%`}
                    </div>
                )}
            </div>

            {/* Probability breakdown bars */}
            {Object.keys(breakdown).length > 0 && (
                <div className="result-section-item">
                    <h4>📊 Probability Breakdown</h4>
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                        {breakdownItems.map(item => {
                            const score = breakdown[item.key];
                            if (!score) return null;
                            const barColor = score >= 7 ? 'var(--success)' : score >= 5 ? 'var(--warning)' : 'var(--error)';
                            return (
                                <div key={item.key}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                            {item.icon} {item.label}
                                        </span>
                                        <span style={{ fontWeight: 'bold', color: barColor }}>{score}/10</span>
                                    </div>
                                    <div style={{
                                        height: '8px',
                                        background: 'var(--bg-tertiary)',
                                        borderRadius: '4px',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            height: '100%',
                                            width: `${score * 10}%`,
                                            background: barColor,
                                            borderRadius: '4px',
                                            transition: 'width 0.5s ease'
                                        }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Industry benchmark */}
            {data.industryBenchmark && (
                <div className="result-section-item" style={{
                    padding: '1rem',
                    background: 'var(--bg-tertiary)',
                    borderRadius: '0.75rem',
                    borderLeft: '4px solid var(--accent-primary)'
                }}>
                    <strong style={{ color: 'var(--accent-primary)' }}>📈 Industry Benchmark:</strong>
                    <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>{data.industryBenchmark}</p>
                </div>
            )}

            {/* Positive factors */}
            {data.positiveFactors?.length > 0 && (
                <div className="result-section-item">
                    <h4>✅ Positive Factors</h4>
                    <ul>
                        {data.positiveFactors.map((factor, i) => (
                            <li key={i} style={{ color: 'var(--success)' }}>
                                {typeof factor === 'string' ? factor : factor.factor}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Negative factors */}
            {data.negativeFactors?.length > 0 && (
                <div className="result-section-item">
                    <h4>⚠️ Negative Factors</h4>
                    <ul>
                        {data.negativeFactors.map((factor, i) => (
                            <li key={i} style={{ color: 'var(--warning)' }}>
                                {typeof factor === 'string' ? factor : factor.factor}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Key factors (legacy format) */}
            {data.keyFactors?.length > 0 && (
                <div className="result-section-item">
                    <h4>🔑 Key Success Factors</h4>
                    <ul>
                        {data.keyFactors.map((factor, i) => (
                            <li key={i}>{factor}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

// Risk Analysis Display
export function RiskAnalysisDisplay({ data }) {
    if (!data) return null;

    // Support both AI format (failureModes array + riskScore) and legacy format
    const failureModes = data.failureModes || [];
    const criticalRisks = data.criticalRisks || [];
    const riskScore = data.riskScore || data.overallRiskScore;

    return (
        <div className="result-display">
            {failureModes.length > 0 && (
                <div className="result-section-item">
                    <h4>🔴 Failure Modes</h4>
                    {failureModes.map((item, i) => (
                        <div key={i} className={`risk-card risk-${item.likelihood === 'high' ? 'high' : item.likelihood === 'medium' ? 'medium' : 'low'}`} style={{ marginBottom: '1rem' }}>
                            <div className="risk-header" style={{ fontWeight: 'bold' }}>{item.mode}</div>
                            <div className="risk-likelihood" style={{ marginTop: '0.25rem' }}>
                                <span style={{
                                    color: item.likelihood === 'high' ? 'var(--error)' : item.likelihood === 'medium' ? 'var(--warning)' : 'var(--success)',
                                    fontWeight: 'bold'
                                }}>● {item.likelihood?.toUpperCase()}</span>
                            </div>
                            {item.earlyWarnings?.length > 0 && (
                                <div style={{ marginTop: '0.5rem' }}>
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Early Warnings: </span>
                                    <span style={{ fontSize: '0.875rem' }}>{item.earlyWarnings.join(', ')}</span>
                                </div>
                            )}
                            {item.mitigations?.length > 0 && (
                                <div style={{ marginTop: '0.25rem' }}>
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Mitigations: </span>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--success)' }}>{item.mitigations.join(', ')}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {criticalRisks.length > 0 && (
                <div className="result-section-item">
                    <h4>🚨 Critical Risks</h4>
                    <ul>
                        {criticalRisks.map((risk, i) => (
                            <li key={i} style={{ color: 'var(--error)' }}>
                                {typeof risk === 'string' ? risk : risk.risk}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {riskScore && (
                <div className="score-display">
                    <span className="score-label">Risk Level:</span>
                    <span className={`score-value ${riskScore <= 3 ? 'score-good' : riskScore <= 6 ? 'score-medium' : 'score-low'}`}>
                        {riskScore}/10
                    </span>
                </div>
            )}
        </div>
    );
}

// Business Feasibility Display
export function BusinessFeasibilityDisplay({ data }) {
    if (!data) return null;

    // Support AI format: scalability is {assessment, challenges}, monetizationViability.opportunities
    const scalabilityText = typeof data.scalability === 'object'
        ? data.scalability?.assessment
        : data.scalabilityAssessment;
    const scalabilityChallenges = typeof data.scalability === 'object'
        ? data.scalability?.challenges || []
        : [];
    const monetizationStrategies = data.monetizationStrategies ||
        data.monetizationViability?.opportunities || [];
    const breakEven = data.timeToBreakeven?.estimate || data.breakEvenEstimate;
    const capitalRequired = data.capitalRequired?.estimate;
    const keyResources = data.keyResources || [];
    const operationalBottlenecks = data.operationalBottlenecks || [];

    return (
        <div className="result-display">
            {(scalabilityText) && (
                <div className="result-section-item">
                    <h4>📈 Scalability</h4>
                    <p><strong style={{ textTransform: 'capitalize' }}>{scalabilityText}</strong></p>
                    {scalabilityChallenges.length > 0 && (
                        <ul>{scalabilityChallenges.map((c, i) => <li key={i}>{c}</li>)}</ul>
                    )}
                </div>
            )}

            {data.costStructure && (
                <div className="result-section-item">
                    <h4>💵 Cost Structure</h4>
                    <p>{data.costStructure.assessment}</p>
                    {data.costStructure.concerns?.length > 0 && (
                        <ul style={{ color: 'var(--warning)' }}>
                            {data.costStructure.concerns.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                    )}
                </div>
            )}

            {monetizationStrategies.length > 0 && (
                <div className="result-section-item">
                    <h4>💰 Monetization</h4>
                    <ul>
                        {monetizationStrategies.map((strategy, i) => (
                            <li key={i}>{strategy}</li>
                        ))}
                    </ul>
                </div>
            )}

            {operationalBottlenecks.length > 0 && (
                <div className="result-section-item">
                    <h4>⚙️ Operational Bottlenecks</h4>
                    <ul>{operationalBottlenecks.map((b, i) => <li key={i}>{b}</li>)}</ul>
                </div>
            )}

            {(breakEven || capitalRequired) && (
                <div className="result-section-item">
                    <h4>⚖️ Financial Estimates</h4>
                    {breakEven && <p>Break-even: <strong>{breakEven}</strong></p>}
                    {capitalRequired && <p>Capital required: <strong>{capitalRequired}</strong></p>}
                </div>
            )}

            {keyResources.length > 0 && (
                <div className="result-section-item">
                    <h4>🔑 Key Resources</h4>
                    <ul>{keyResources.map((r, i) => <li key={i}>{r}</li>)}</ul>
                </div>
            )}

            {data.feasibilityScore && (
                <div className="score-display">
                    <span className="score-label">Feasibility Score:</span>
                    <span className={`score-value ${data.feasibilityScore >= 7 ? 'score-good' : data.feasibilityScore >= 4 ? 'score-medium' : 'score-low'}`}>
                        {data.feasibilityScore}/10
                    </span>
                </div>
            )}
        </div>
    );
}

// Final Verdict Display
export function FinalVerdictDisplay({ data }) {
    if (!data) return null;

    const verdictColor = data.recommendation === 'GO' ? 'var(--success)' :
        data.recommendation === 'PIVOT' ? 'var(--warning)' : 'var(--error)';

    return (
        <div className="result-display">
            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{
                    display: 'inline-block',
                    padding: '1rem 2rem',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: verdictColor,
                    border: `3px solid ${verdictColor}`,
                    borderRadius: '1rem',
                    background: `${verdictColor}15`
                }}>
                    {data.recommendation}
                </div>
                {data.overallScore && (
                    <div style={{ marginTop: '1rem', fontSize: '1.5rem', color: 'var(--text-secondary)' }}>
                        Score: <strong>{data.overallScore}/10</strong>
                    </div>
                )}
            </div>

            {data.recommendationRationale && (
                <div className="result-section-item">
                    <h4>📝 Rationale</h4>
                    <p>{data.recommendationRationale}</p>
                </div>
            )}

            {data.keyStrengths?.length > 0 && (
                <div className="result-section-item">
                    <h4>✅ Key Strengths</h4>
                    <ul>
                        {data.keyStrengths.map((strength, i) => (
                            <li key={i}>{strength}</li>
                        ))}
                    </ul>
                </div>
            )}

            {data.criticalWeaknesses?.length > 0 && (
                <div className="result-section-item">
                    <h4>❌ Critical Weaknesses</h4>
                    <ul>
                        {data.criticalWeaknesses.map((weakness, i) => (
                            <li key={i}>{weakness}</li>
                        ))}
                    </ul>
                </div>
            )}

            {data.nextSteps?.length > 0 && (
                <div className="result-section-item">
                    <h4>📋 Next Steps</h4>
                    <ol>
                        {data.nextSteps.map((step, i) => (
                            <li key={i}>{step}</li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
}

// Helper to get the right display component for a task
export function getResultDisplay(taskId, data) {
    switch (taskId) {
        case 'ideaClarity':
            return <IdeaClarityDisplay data={data} />;
        case 'marketAnalysis':
            return <MarketAnalysisDisplay data={data} />;
        case 'competitorAnalysis':
            return <CompetitorAnalysisDisplay data={data} />;
        case 'successProbability':
            return <SuccessProbabilityDisplay data={data} />;
        case 'riskAnalysis':
            return <RiskAnalysisDisplay data={data} />;
        case 'businessFeasibility':
            return <BusinessFeasibilityDisplay data={data} />;
        case 'finalVerdict':
            return <FinalVerdictDisplay data={data} />;
        default:
            return <pre>{JSON.stringify(data, null, 2)}</pre>;
    }
}
