import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import validateRoutes from './routes/validate.js';

// Load environment variables from parent directory (only in development)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: join(__dirname, '..', '.env') });
}

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/validate', validateRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error', 
    message: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Startup Validator API running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
});
