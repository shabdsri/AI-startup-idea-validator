import gemini from '../lib/gemini.js';
import { prompts, SYSTEM_CONTEXT } from '../lib/prompts.js';
import { updateTaskStatus } from '../lib/sessionStore.js';

// Task 1: Idea Clarity & Assumption Extraction
export async function analyzeIdeaClarity(sessionId, startupData) {
    updateTaskStatus(sessionId, 'ideaClarity', 'running');

    try {
        const prompt = prompts.ideaClarity(startupData);
        const result = await gemini.analyzeWithJSON(prompt, SYSTEM_CONTEXT);

        if (!result.success) {
            // Fallback response when AI is unavailable
            const fallbackResult = generateFallbackIdeaClarity(startupData);
            updateTaskStatus(sessionId, 'ideaClarity', 'complete', fallbackResult);
            return fallbackResult;
        }

        updateTaskStatus(sessionId, 'ideaClarity', 'complete', result.content);
        return result.content;
    } catch (error) {
        const errorResult = { error: error.message, status: 'failed' };
        updateTaskStatus(sessionId, 'ideaClarity', 'error', errorResult);
        return errorResult;
    }
}

// Task 2: Market Analysis
export async function analyzeMarket(sessionId, startupData) {
    updateTaskStatus(sessionId, 'marketAnalysis', 'running');

    try {
        const prompt = prompts.marketAnalysis(startupData);
        const result = await gemini.analyzeWithJSON(prompt, SYSTEM_CONTEXT);

        if (!result.success) {
            const fallbackResult = generateFallbackMarketAnalysis(startupData);
            updateTaskStatus(sessionId, 'marketAnalysis', 'complete', fallbackResult);
            return fallbackResult;
        }

        updateTaskStatus(sessionId, 'marketAnalysis', 'complete', result.content);
        return result.content;
    } catch (error) {
        const errorResult = { error: error.message, status: 'failed' };
        updateTaskStatus(sessionId, 'marketAnalysis', 'error', errorResult);
        return errorResult;
    }
}

// Task 3: Competitor Analysis
export async function analyzeCompetitors(sessionId, startupData) {
    updateTaskStatus(sessionId, 'competitorAnalysis', 'running');

    try {
        const prompt = prompts.competitorAnalysis(startupData);
        const result = await gemini.analyzeWithJSON(prompt, SYSTEM_CONTEXT);

        if (!result.success) {
            const fallbackResult = generateFallbackCompetitorAnalysis(startupData);
            updateTaskStatus(sessionId, 'competitorAnalysis', 'complete', fallbackResult);
            return fallbackResult;
        }

        updateTaskStatus(sessionId, 'competitorAnalysis', 'complete', result.content);
        return result.content;
    } catch (error) {
        const errorResult = { error: error.message, status: 'failed' };
        updateTaskStatus(sessionId, 'competitorAnalysis', 'error', errorResult);
        return errorResult;
    }
}

// Task 4: Success Probability
export async function analyzeSuccessProbability(sessionId, startupData, previousResults) {
    updateTaskStatus(sessionId, 'successProbability', 'running');

    try {
        const prompt = prompts.successProbability(startupData, previousResults);
        const result = await gemini.analyzeWithJSON(prompt, SYSTEM_CONTEXT);

        if (!result.success) {
            const fallbackResult = generateFallbackSuccessProbability(startupData);
            updateTaskStatus(sessionId, 'successProbability', 'complete', fallbackResult);
            return fallbackResult;
        }

        updateTaskStatus(sessionId, 'successProbability', 'complete', result.content);
        return result.content;
    } catch (error) {
        const errorResult = { error: error.message, status: 'failed' };
        updateTaskStatus(sessionId, 'successProbability', 'error', errorResult);
        return errorResult;
    }
}

// Task 5: Risk Analysis
export async function analyzeRisks(sessionId, startupData, previousResults) {
    updateTaskStatus(sessionId, 'riskAnalysis', 'running');

    try {
        const prompt = prompts.riskAnalysis(startupData, previousResults);
        const result = await gemini.analyzeWithJSON(prompt, SYSTEM_CONTEXT);

        if (!result.success) {
            const fallbackResult = generateFallbackRiskAnalysis(startupData);
            updateTaskStatus(sessionId, 'riskAnalysis', 'complete', fallbackResult);
            return fallbackResult;
        }

        updateTaskStatus(sessionId, 'riskAnalysis', 'complete', result.content);
        return result.content;
    } catch (error) {
        const errorResult = { error: error.message, status: 'failed' };
        updateTaskStatus(sessionId, 'riskAnalysis', 'error', errorResult);
        return errorResult;
    }
}

// Task 6: Business Feasibility
export async function analyzeBusinessFeasibility(sessionId, startupData, previousResults) {
    updateTaskStatus(sessionId, 'businessFeasibility', 'running');

    try {
        const prompt = prompts.businessFeasibility(startupData, previousResults);
        const result = await gemini.analyzeWithJSON(prompt, SYSTEM_CONTEXT);

        if (!result.success) {
            const fallbackResult = generateFallbackBusinessFeasibility(startupData);
            updateTaskStatus(sessionId, 'businessFeasibility', 'complete', fallbackResult);
            return fallbackResult;
        }

        updateTaskStatus(sessionId, 'businessFeasibility', 'complete', result.content);
        return result.content;
    } catch (error) {
        const errorResult = { error: error.message, status: 'failed' };
        updateTaskStatus(sessionId, 'businessFeasibility', 'error', errorResult);
        return errorResult;
    }
}

// Task 7: Final Verdict
export async function generateFinalVerdict(sessionId, startupData, allResults) {
    updateTaskStatus(sessionId, 'finalVerdict', 'running');

    try {
        const prompt = prompts.finalVerdict(startupData, allResults);
        const result = await gemini.analyzeWithJSON(prompt, SYSTEM_CONTEXT);

        if (!result.success) {
            const fallbackResult = generateFallbackVerdict(startupData, allResults);
            updateTaskStatus(sessionId, 'finalVerdict', 'complete', fallbackResult);
            return fallbackResult;
        }

        updateTaskStatus(sessionId, 'finalVerdict', 'complete', result.content);
        return result.content;
    } catch (error) {
        const errorResult = { error: error.message, status: 'failed' };
        updateTaskStatus(sessionId, 'finalVerdict', 'error', errorResult);
        return errorResult;
    }
}

// Fallback generators when AI is unavailable
function generateFallbackIdeaClarity(startupData) {
    return {
        problemSolutionStatement: `Analyzing: ${startupData.description}`,
        coreAssumptions: [
            'Target customers have the problem described',
            'Customers are willing to pay for a solution',
            `The ${startupData.geography} market is accessible`
        ],
        customerPainPoints: ['Unable to determine without AI analysis'],
        valueProposition: 'Requires AI analysis for detailed extraction',
        flaggedAssumptions: [{
            assumption: 'Market demand exists',
            risk: 'Unvalidated',
            validation: 'Customer interviews required'
        }],
        clarifyingQuestions: [],
        ideaClarityScore: 5,
        _notice: 'AI analysis unavailable. Please check API Key configuration.'
    };
}

function generateFallbackMarketAnalysis(startupData) {
    return {
        tam: { value: 'Unable to estimate', confidence: 'low', basis: 'AI analysis required' },
        sam: { value: 'Unable to estimate', confidence: 'low', basis: 'AI analysis required' },
        som: { value: 'Unable to estimate', confidence: 'low', basis: 'AI analysis required' },
        growthTrend: { direction: 'unknown', rationale: 'Requires market research' },
        adoptionBarriers: ['Unknown - requires analysis'],
        willingnessToPay: { assessment: 'unknown', factors: [] },
        dataLimitations: ['AI analysis unavailable', 'Manual market research required'],
        marketScore: 5,
        _notice: 'AI analysis unavailable. Please check API Key configuration.'
    };
}

function generateFallbackCompetitorAnalysis(startupData) {
    const competitors = startupData.competitors ? startupData.competitors.split(',').map(c => c.trim()) : [];
    return {
        directCompetitors: competitors.map(name => ({
            name,
            offering: 'Requires research',
            pricing: 'Unknown',
            strengths: [],
            weaknesses: []
        })),
        indirectCompetitors: [],
        manualAlternatives: ['Manual processes', 'Spreadsheets', 'Status quo'],
        marketGaps: ['Requires AI analysis to identify'],
        switchingCosts: { level: 'unknown', factors: [] },
        marketSaturation: { isSaturated: false, explanation: 'Unable to determine' },
        competitiveAdvantage: null,
        competitorScore: 5,
        _notice: 'AI analysis unavailable. Please check API Key configuration.'
    };
}

function generateFallbackSuccessProbability(startupData) {
    // Base rates from Startup Genome Report and CB Insights
    const baseRates = {
        'B2B': 25,
        'B2C': 15,
        'B2B2C': 20
    };
    const baseRate = baseRates[startupData.customerType] || 15;

    return {
        successProbability: {
            percentage: baseRate,
            confidenceInterval: { low: baseRate - 10, high: baseRate + 10 },
            confidence: 'low'
        },
        positiveFactors: [],
        negativeFactors: [{ factor: 'Limited analysis available', impact: 'Unknown' }],
        industryBaseRate: 'Average startup success rate: ~10-20%',
        disclaimer: 'This is a rough estimate based on industry averages. AI analysis unavailable.',
        _notice: 'AI analysis unavailable. Please check API Key configuration.'
    };
}

function generateFallbackRiskAnalysis(startupData) {
    return {
        failureModes: [
            {
                mode: 'Low Customer Adoption',
                likelihood: 'medium',
                earlyWarnings: ['Low signup rates', 'High churn'],
                mitigations: ['User research', 'MVP testing']
            },
            {
                mode: 'Competitive Pressure',
                likelihood: 'medium',
                earlyWarnings: ['New entrants', 'Price wars'],
                mitigations: ['Differentiation', 'Focus on niche']
            },
            {
                mode: 'Funding Risk',
                likelihood: 'medium',
                earlyWarnings: ['Extended runway burn', 'Missed milestones'],
                mitigations: ['Revenue focus', 'Cost control']
            }
        ],
        criticalRisks: ['Requires detailed AI analysis'],
        riskScore: 5,
        _notice: 'AI analysis unavailable. Please check API Key configuration.'
    };
}

function generateFallbackBusinessFeasibility(startupData) {
    return {
        costStructure: { assessment: 'Requires analysis', majorCosts: [], concerns: [] },
        scalability: { assessment: 'unknown', challenges: [] },
        operationalBottlenecks: ['Unable to identify without AI analysis'],
        monetizationViability: { viable: true, concerns: [], opportunities: [] },
        timeToBreakeven: { estimate: 'Unknown', assumptions: [] },
        capitalRequired: { estimate: 'Unknown', breakdown: [] },
        keyResources: ['Team', 'Technology', 'Capital'],
        economicallyViable: true,
        viabilityExplanation: 'Detailed analysis requires AI',
        feasibilityScore: 5,
        _notice: 'AI analysis unavailable. Please check API Key configuration.'
    };
}

function generateFallbackVerdict(startupData, allResults) {
    // Calculate average score from available results
    let totalScore = 0;
    let scoreCount = 0;

    Object.values(allResults).forEach(result => {
        const score = result?.ideaClarityScore || result?.marketScore ||
            result?.competitorScore || result?.feasibilityScore;
        if (score) {
            totalScore += score;
            scoreCount++;
        }
    });

    const avgScore = scoreCount > 0 ? Math.round(totalScore / scoreCount) : 5;

    return {
        overallScore: avgScore,
        recommendation: avgScore >= 7 ? 'GO' : avgScore >= 4 ? 'PIVOT' : 'KILL',
        recommendationRationale: 'Based on limited analysis due to unavailable AI.',
        investabilityRequirements: [
            'Validated customer demand',
            'Clear competitive advantage',
            'Proven unit economics'
        ],
        requiredEvidence: [
            'Customer discovery interviews (min 30)',
            'MVP with measurable traction',
            'Letter of intent from potential customers'
        ],
        keyStrengths: ['Unable to identify without full analysis'],
        criticalWeaknesses: ['Unable to identify without full analysis'],
        pivotSuggestions: null,
        nextSteps: [
            'Configure GEMINI_API_KEY for full AI analysis',
            'Conduct customer discovery interviews',
            'Build MVP for market validation'
        ],
        finalStatement: 'This is a preliminary assessment. For comprehensive analysis, please configure the Gemini API key.',
        _notice: 'AI analysis unavailable. Please check API Key configuration.'
    };
}

// Helper function for delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Run full validation pipeline
export async function runFullValidation(sessionId, startupData) {
    const results = {};
    const TASK_DELAY = 3000; // 3 seconds between tasks to respect rate limits

    console.log('🚀 Starting validation pipeline...');

    // Task 1: Idea Clarity
    console.log('📋 Task 1: Idea Clarity');
    results.ideaClarity = await analyzeIdeaClarity(sessionId, startupData);
    await delay(TASK_DELAY);

    // Task 2: Market Analysis
    console.log('📋 Task 2: Market Analysis');
    results.marketAnalysis = await analyzeMarket(sessionId, startupData);
    await delay(TASK_DELAY);

    // Task 3: Competitor Analysis
    console.log('📋 Task 3: Competitor Analysis');
    results.competitorAnalysis = await analyzeCompetitors(sessionId, startupData);
    await delay(TASK_DELAY);

    // Task 4: Success Probability (depends on previous results)
    console.log('📋 Task 4: Success Probability');
    results.successProbability = await analyzeSuccessProbability(
        sessionId,
        startupData,
        { ideaClarity: results.ideaClarity, marketAnalysis: results.marketAnalysis }
    );
    await delay(TASK_DELAY);

    // Task 5: Risk Analysis
    console.log('📋 Task 5: Risk Analysis');
    results.riskAnalysis = await analyzeRisks(sessionId, startupData, results);
    await delay(TASK_DELAY);

    // Task 6: Business Feasibility
    console.log('📋 Task 6: Business Feasibility');
    results.businessFeasibility = await analyzeBusinessFeasibility(sessionId, startupData, results);
    await delay(TASK_DELAY);

    // Task 7: Final Verdict (depends on all previous results)
    console.log('📋 Task 7: Final Verdict');
    results.finalVerdict = await generateFinalVerdict(sessionId, startupData, results);

    console.log('✅ Validation pipeline complete!');
    return results;
}

export default {
    analyzeIdeaClarity,
    analyzeMarket,
    analyzeCompetitors,
    analyzeSuccessProbability,
    analyzeRisks,
    analyzeBusinessFeasibility,
    generateFinalVerdict,
    runFullValidation
};
