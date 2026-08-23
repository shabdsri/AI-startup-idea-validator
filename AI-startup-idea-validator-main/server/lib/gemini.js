import Groq from 'groq-sdk';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables directly in this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Only load from .env in development
if (process.env.NODE_ENV !== 'production') {
  config({ path: join(__dirname, '..', '..', '.env') });
}

class AIClient {
    constructor() {
        this.client = null;
        this._initializeClient();
    }

    _initializeClient() {
        const apiKey = process.env.GROQ_API_KEY;

        console.log('🔍 Checking Groq API key...');
        console.log('   Key found:', apiKey ? `Yes (${apiKey.substring(0, 10)}...)` : 'No');

        if (!apiKey) {
            console.warn('⚠️  GROQ_API_KEY not configured. AI features will be limited.');
            return;
        }

        try {
            console.log('✅ Initializing Groq client...');
            this.client = new Groq({ apiKey });
            this.model = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';
            console.log(`✅ Groq client initialized successfully with model: ${this.model}`);
        } catch (error) {
            console.error('❌ Failed to initialize Groq client:', error.message);
        }
    }

    async analyze(prompt, systemContext = '') {
        if (!this.client) {
            return {
                success: false,
                error: 'Groq API key not configured',
                fallback: true
            };
        }

        const candidateModels = [
            this.model,
            'openai/gpt-oss-20b',
            'openai/gpt-oss-120b',
            'qwen/qwen3.6-27b'
        ].filter((v, i, a) => a.indexOf(v) === i);

        let lastError = null;

        for (const modelToUse of candidateModels) {
            try {
                console.log(`🤖 Calling Groq API (${modelToUse})...`);

                const messages = [];
                if (systemContext) {
                    messages.push({ role: 'system', content: systemContext });
                }
                messages.push({ role: 'user', content: prompt });

                const response = await this.client.chat.completions.create({
                    model: modelToUse,
                    messages,
                    temperature: 0.7,
                    max_tokens: 4096
                });

                const text = response.choices[0]?.message?.content || '';
                console.log(`✅ Groq API response received using ${modelToUse}`);
                this.model = modelToUse; // lock onto working model

                return {
                    success: true,
                    content: text
                };
            } catch (error) {
                console.error(`❌ Groq API error with ${modelToUse}:`, error.message);
                lastError = error;
            }
        }

        return {
            success: false,
            error: lastError?.message || 'Failed to call Groq API',
            fallback: true
        };
    }

    async analyzeWithJSON(prompt, systemContext = '') {
        const jsonPrompt = `${prompt}\n\nIMPORTANT: Return your response as valid JSON only. No markdown, no code blocks, no explanations, just pure JSON.`;

        const result = await this.analyze(jsonPrompt, systemContext);

        if (!result.success) {
            return result;
        }

        try {
            // Clean up potential markdown code blocks and think tags
            let content = result.content;
            content = content.replace(/<think>[\s\S]*?<\/think>/gi, '');
            content = content.replace(/```json\n?/gi, '').replace(/```\n?/gi, '');
            content = content.trim();

            // Try to extract JSON from the response
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                content = jsonMatch[0];
            }

            const parsed = JSON.parse(content);
            return {
                success: true,
                content: parsed
            };
        } catch (parseError) {
            console.warn('⚠️ JSON parse error, returning raw content');
            return {
                success: true,
                content: result.content,
                parseError: true
            };
        }
    }
}

// Export using same names for compatibility with existing code
export const gemini = new AIClient();
export default gemini;
