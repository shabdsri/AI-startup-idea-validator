// AI Prompt templates for startup validation tasks
// These prompts are designed to produce conservative, data-driven analysis

export const SYSTEM_CONTEXT = `You are an AI Startup Idea Validation Engine designed for real-world business evaluation.

CRITICAL RULES:
1. Be data-driven and conservative - NO hype or motivational language
2. Never fabricate data or statistics
3. If data is unavailable, clearly state the limitation
4. Be explicit about uncertainty, risks, and assumptions
5. Provide brutally honest but constructive feedback

Your outputs should be grounded in real-world patterns, not hypothetical scenarios.`;

export const prompts = {
  ideaClarity: (startupData) => `
Analyze this startup idea and extract key assumptions:

STARTUP IDEA:
- Description: ${startupData.description}
- Target Geography: ${startupData.geography}
- Customer Type: ${startupData.customerType}
- Revenue Model: ${startupData.revenueModel}
- Stage: ${startupData.stage}
- Known Competitors: ${startupData.competitors || 'None provided'}

TASKS:
1. Rewrite the idea as ONE clear problem-solution statement
2. List core assumptions (things that must be true for this to work)
3. Identify customer pain points this addresses
4. Define the value proposition
5. Flag any vague, risky, or unvalidated assumptions
6. If anything is unclear, list clarifying questions

Return JSON format:
{
  "problemSolutionStatement": "string",
  "coreAssumptions": ["assumption1", "assumption2"],
  "customerPainPoints": ["pain1", "pain2"],
  "valueProposition": "string",
  "flaggedAssumptions": [{"assumption": "string", "risk": "string", "validation": "string"}],
  "clarifyingQuestions": ["question1"],
  "ideaClarityScore": 1-10
}
`,

  marketAnalysis: (startupData) => `
Perform a market analysis for this startup idea:

STARTUP IDEA:
- Description: ${startupData.description}
- Target Geography: ${startupData.geography}
- Customer Type: ${startupData.customerType}
- Revenue Model: ${startupData.revenueModel}

IMPORTANT CONSTRAINTS:
- Do NOT fabricate specific market size numbers unless you have real data
- Provide RANGES when exact numbers are unavailable
- Clearly state data limitations and sources of uncertainty
- Base analysis on publicly known industry patterns

ANALYZE:
1. Market size (TAM/SAM/SOM) - use ranges, state if estimated
2. Market growth trend (growing/stable/declining)
3. Adoption barriers for customers
4. Customer willingness to pay
5. Market timing considerations

Return JSON format:
{
  "tam": {"value": "string with range", "confidence": "low/medium/high", "basis": "explanation"},
  "sam": {"value": "string with range", "confidence": "low/medium/high", "basis": "explanation"},
  "som": {"value": "string with range", "confidence": "low/medium/high", "basis": "explanation"},
  "growthTrend": {"direction": "growing/stable/declining", "rationale": "string"},
  "adoptionBarriers": ["barrier1", "barrier2"],
  "willingnessToPay": {"assessment": "low/medium/high", "factors": ["factor1"]},
  "dataLimitations": ["limitation1"],
  "marketScore": 1-10
}
`,

  competitorAnalysis: (startupData) => `
Analyze the competitive landscape for this startup:

STARTUP IDEA:
- Description: ${startupData.description}
- Target Geography: ${startupData.geography}
- Customer Type: ${startupData.customerType}
- Known Competitors: ${startupData.competitors || 'None provided'}

ANALYZE:
1. Direct competitors (same solution, same market)
2. Indirect competitors (different solution, same problem)
3. Non-digital or manual alternatives customers use today
4. For each competitor: offering, pricing model, strengths, weaknesses
5. Why existing solutions have NOT fully solved the problem
6. Switching costs for users
7. Is the market saturated? Be honest.

Return JSON format:
{
  "directCompetitors": [{"name": "string", "offering": "string", "pricing": "string", "strengths": [], "weaknesses": []}],
  "indirectCompetitors": [{"name": "string", "howTheyCompete": "string"}],
  "manualAlternatives": ["alternative1"],
  "marketGaps": ["gap1"],
  "switchingCosts": {"level": "low/medium/high", "factors": []},
  "marketSaturation": {"isSaturated": true/false, "explanation": "string"},
  "competitiveAdvantage": "string or null if none clear",
  "competitorScore": 1-10
}
`,

  successProbability: (startupData, previousResults) => `
Estimate the success probability for this startup based on historical patterns:

STARTUP DATA:
- Description: ${startupData.description}
- Geography: ${startupData.geography}
- Customer Type: ${startupData.customerType}
- Revenue Model: ${startupData.revenueModel}
- Stage: ${startupData.stage}

PREVIOUS ANALYSIS CONTEXT:
${JSON.stringify(previousResults, null, 2)}

BASE YOUR ESTIMATE ON:
1. Industry startup survival rates (SaaS: ~20-30% reach profitability, B2C: ~10-15%, B2B: ~25-35%)
2. Market opportunity size and timing
3. Revenue model viability
4. Geographic startup ecosystem strength
5. Problem-solution fit clarity

IMPORTANT GUIDELINES:
- Be REALISTIC but not overly pessimistic
- Most viable ideas with clear problem-solution fit score 25-50%
- Excellent ideas with strong market fit score 50-70%
- Give credit for good fundamentals (clear problem, large market, etc.)
- Consider both upside potential and downside risks

Return JSON format:
{
  "probability": 20-70 (be realistic - most startups are between 20-50%),
  "confidenceInterval": "±10-15%",
  "confidence": "low/medium/high",
  "keyFactors": ["factor1", "factor2", "factor3"],
  "positiveFactors": ["factor1", "factor2"],
  "negativeFactors": ["factor1", "factor2"],
  "industryBenchmark": "string describing typical rates for similar startups",
  "probabilityBreakdown": {
    "marketOpportunity": 1-10,
    "problemSolutionFit": 1-10,
    "executionFeasibility": 1-10,
    "competitivePosition": 1-10,
    "timing": 1-10
  }
}
`,

  riskAnalysis: (startupData, previousResults) => `
Analyze failure modes and edge cases for this startup:

STARTUP DATA:
- Description: ${startupData.description}
- Geography: ${startupData.geography}
- Customer Type: ${startupData.customerType}
- Revenue Model: ${startupData.revenueModel}
- Stage: ${startupData.stage}

ANALYZE THESE FAILURE SCENARIOS:
1. Low customer adoption
2. Regulatory/legal risk
3. High CAC vs LTV (customer acquisition cost vs lifetime value)
4. Market timing issues (too early/too late)
5. Technical feasibility limits
6. Founder/team dependency risks
7. Funding/runway risks
8. Competitive response

For EACH failure mode provide:
- Likelihood: Low / Medium / High
- Early warning signals
- Possible mitigation strategies

Return JSON format:
{
  "failureModes": [
    {
      "mode": "string",
      "likelihood": "low/medium/high",
      "earlyWarnings": ["signal1"],
      "mitigations": ["strategy1"]
    }
  ],
  "criticalRisks": ["most dangerous risks"],
  "riskScore": 1-10 (10 = very risky)
}
`,

  businessFeasibility: (startupData, previousResults) => `
Evaluate business and execution feasibility:

STARTUP DATA:
- Description: ${startupData.description}
- Geography: ${startupData.geography}
- Customer Type: ${startupData.customerType}
- Revenue Model: ${startupData.revenueModel}
- Stage: ${startupData.stage}

PREVIOUS ANALYSIS:
${JSON.stringify(previousResults, null, 2)}

EVALUATE:
1. Cost structure realism
2. Scalability challenges
3. Operational bottlenecks
4. Monetization viability
5. Time to break-even (rough estimate)
6. Capital requirements
7. Key resources needed

If NOT economically viable, clearly state why.

Return JSON format:
{
  "costStructure": {"assessment": "string", "majorCosts": [], "concerns": []},
  "scalability": {"assessment": "low/medium/high", "challenges": []},
  "operationalBottlenecks": ["bottleneck1"],
  "monetizationViability": {"viable": true/false, "concerns": [], "opportunities": []},
  "timeToBreakeven": {"estimate": "string", "assumptions": []},
  "capitalRequired": {"estimate": "string range", "breakdown": []},
  "keyResources": ["resource1"],
  "economicallyViable": true/false,
  "viabilityExplanation": "string",
  "feasibilityScore": 1-10
}
`,

  finalVerdict: (startupData, allResults) => `
Provide the FINAL VERDICT on this startup idea:

STARTUP DATA:
- Description: ${startupData.description}
- Geography: ${startupData.geography}
- Customer Type: ${startupData.customerType}
- Revenue Model: ${startupData.revenueModel}
- Stage: ${startupData.stage}

ALL PREVIOUS ANALYSIS:
${JSON.stringify(allResults, null, 2)}

PROVIDE:
1. Overall feasibility score (0-10)
2. GO / PIVOT / KILL recommendation
3. What would make this idea investable
4. What evidence is REQUIRED next (MVP metrics, pilots, traction)
5. Key strengths to leverage
6. Critical weaknesses to address

BE BRUTALLY HONEST BUT CONSTRUCTIVE.
No sugarcoating. No "this could be huge" hype.

Return JSON format:
{
  "overallScore": 0-10,
  "recommendation": "GO/PIVOT/KILL",
  "recommendationRationale": "string",
  "investabilityRequirements": ["requirement1"],
  "requiredEvidence": ["evidence1"],
  "keyStrengths": ["strength1"],
  "criticalWeaknesses": ["weakness1"],
  "pivotSuggestions": ["suggestion1"] or null,
  "nextSteps": ["step1", "step2", "step3"],
  "finalStatement": "One paragraph honest summary"
}
`
};

export default prompts;
