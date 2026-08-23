// History service for saving validation results to localStorage

const HISTORY_KEY = 'validation_history';
const MAX_HISTORY_ITEMS = 20;

export const historyService = {
    // Get all saved validations
    getAll() {
        try {
            const data = localStorage.getItem(HISTORY_KEY);
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    },

    // Save a new validation
    save(validation) {
        const history = this.getAll();
        const newItem = {
            id: validation.id,
            ideaDescription: validation.ideaDescription?.substring(0, 100) + '...',
            createdAt: new Date().toISOString(),
            status: validation.status,
            verdict: validation.results?.finalVerdict?.recommendation || 'PENDING',
            score: validation.results?.finalVerdict?.overallScore || null,
            results: validation.results
        };

        // Add to beginning, remove duplicates
        const filtered = history.filter(item => item.id !== validation.id);
        const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);

        localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
        return updated;
    },

    // Get a single validation by ID
    getById(id) {
        const history = this.getAll();
        return history.find(item => item.id === id);
    },

    // Delete a validation
    delete(id) {
        const history = this.getAll();
        const updated = history.filter(item => item.id !== id);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
        return updated;
    },

    // Clear all history
    clearAll() {
        localStorage.removeItem(HISTORY_KEY);
    }
};

export default historyService;
