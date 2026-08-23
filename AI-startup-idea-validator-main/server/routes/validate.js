import express from 'express';
import { createSession, getSession } from '../lib/sessionStore.js';
import { runFullValidation } from '../services/validationService.js';

const router = express.Router();

// POST /api/validate - Start a new validation
router.post('/', async (req, res) => {
    try {
        const {
            description,
            geography,
            customerType,
            revenueModel,
            stage,
            competitors
        } = req.body;

        // Validate required fields
        if (!description || !geography || !customerType || !revenueModel || !stage) {
            return res.status(400).json({
                error: 'Missing required fields',
                required: ['description', 'geography', 'customerType', 'revenueModel', 'stage']
            });
        }

        // Validate enums
        const validCustomerTypes = ['B2B', 'B2C', 'B2B2C'];
        const validStages = ['idea', 'mvp', 'early_traction'];

        if (!validCustomerTypes.includes(customerType)) {
            return res.status(400).json({
                error: 'Invalid customerType',
                validOptions: validCustomerTypes
            });
        }

        if (!validStages.includes(stage)) {
            return res.status(400).json({
                error: 'Invalid stage',
                validOptions: validStages
            });
        }

        const startupData = {
            description,
            geography,
            customerType,
            revenueModel,
            stage,
            competitors: competitors || ''
        };

        // Create session
        const session = createSession(startupData);

        // Start validation in background (don't await)
        runFullValidation(session.id, startupData).catch(err => {
            console.error('Validation error:', err);
        });

        res.status(202).json({
            message: 'Validation started',
            sessionId: session.id,
            status: session.status,
            pollUrl: `/api/validate/${session.id}`
        });

    } catch (error) {
        console.error('Error starting validation:', error);
        res.status(500).json({ error: 'Failed to start validation' });
    }
});

// GET /api/validate/:id - Get validation status and results
router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const session = getSession(id);

        if (!session) {
            return res.status(404).json({ error: 'Validation session not found' });
        }

        res.json({
            id: session.id,
            status: session.status,
            ideaDescription: session.ideaDescription,
            startupData: session.startupData,
            tasks: session.tasks,
            results: session.results,
            completedTasks: session.completedTasks,
            totalTasks: session.totalTasks,
            createdAt: session.createdAt
        });

    } catch (error) {
        console.error('Error fetching validation:', error);
        res.status(500).json({ error: 'Failed to fetch validation status' });
    }
});

export default router;
