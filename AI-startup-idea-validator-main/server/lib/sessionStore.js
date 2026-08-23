import { v4 as uuidv4 } from 'uuid';

// In-memory session store
const sessions = new Map();

export function createSession(startupData) {
    const id = uuidv4();
    const session = {
        id,
        startupData,
        ideaDescription: startupData.description,
        status: 'pending',
        createdAt: new Date().toISOString(),
        tasks: {
            ideaClarity: { name: 'Idea Clarity & Assumption Extraction', status: 'pending', result: null },
            marketAnalysis: { name: 'Market Analysis', status: 'pending', result: null },
            competitorAnalysis: { name: 'Competitor Analysis', status: 'pending', result: null },
            successProbability: { name: 'ML-Based Success Probability', status: 'pending', result: null },
            riskAnalysis: { name: 'Risk & Failure Mode Analysis', status: 'pending', result: null },
            businessFeasibility: { name: 'Business Feasibility', status: 'pending', result: null },
            finalVerdict: { name: 'Final Verdict', status: 'pending', result: null }
        },
        results: {},
        completedTasks: 0,
        totalTasks: 7
    };

    sessions.set(id, session);
    return session;
}

export function getSession(id) {
    return sessions.get(id) || null;
}

export function updateTaskStatus(sessionId, taskKey, status, result = null) {
    const session = sessions.get(sessionId);
    if (!session) return null;

    if (session.tasks[taskKey]) {
        session.tasks[taskKey].status = status;
        if (result) {
            session.tasks[taskKey].result = result;
            session.results[taskKey] = result;
        }
    }

    if (status === 'complete') {
        session.completedTasks++;
    }

    // Check if all tasks completed
    if (session.completedTasks === session.totalTasks) {
        session.status = 'complete';
    } else if (session.completedTasks > 0) {
        session.status = 'in_progress';
    }

    return session;
}

export function getAllSessions() {
    return Array.from(sessions.values());
}

export default { createSession, getSession, updateTaskStatus, getAllSessions };
