import Groq from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
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
        this.groqClient = null;
        this.geminiClient = null;
        this._initializeClient();
    }

    _initializeClient() {
        const groqKey = process.env.GROQ_API_KEY;
        const geminiKey = process.env.GEMINI_API_KEY;

        console.log('🔍 Checking AI API keys...');
        console.log('   Groq key found:', groqKey && !groqKey.includes('your_') ? `Yes (${groqKey.substring(0, 10)}...)` : 'No');
        console.log('   Gemini key found:', geminiKey && !geminiKey.includes('your_') ? `Yes (${geminiKey.substring(0, 10)}...)` : 'No');

        if (groqKey && !groqKey.includes('your_')) {
            try {
                this.groqClient = new Groq({ apiKey: groqKey });
                this.groqModel = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';
                console.log(`✅ Groq client initialized with model: ${this.groqModel}`);
            } catch (error) {
                console.error('❌ Failed to initialize Groq client:', error.message);
            }
        }

        if (geminiKey && !geminiKey.includes('your_')) {
            try {
                this.geminiClient = new GoogleGenerativeAI(geminiKey);
                console.log('✅ Google Gemini client initialized successfully!');
            } catch (error) {
                console.error('❌ Failed to initialize Gemini client:', error.message);
            }
        }

        if (!this.groqClient && !this.geminiClient) {
            console.warn('⚠️  No valid AI API key configured (GROQ_API_KEY or GEMINI_API_KEY).');
        }
    }

    async analyze(prompt, systemContext = '') {
        // Try Google Gemini if configured
        if (this.geminiClient) {
            try {
                console.log('🤖 Calling Google Gemini API (gemini-1.5-flash)...');
                const model = this.geminiClient.getGenerativeModel({ model: 'gemini-1.5-flash' });
                const fullPrompt = systemContext ? `${systemContext}\n\n${prompt}` : prompt;
                const result = await model.generateContent(fullPrompt);
                const text = result.response.text() || '';
                console.log('✅ Gemini API response received');
                return {
                    success: true,
                    content: text
                };
            } catch (error) {
                console.error('❌ Gemini API error:', error.message);
            }
        }

        // Try Groq if configured
        if (this.groqClient) {
            const candidateModels = [
                this.groqModel,
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

                    const response = await this.groqClient.chat.completions.create({
                        model: modelToUse,
                        messages,
                        temperature: 0.7,
                        max_tokens: 4096
                    });

                    const text = response.choices[0]?.message?.content || '';
                    console.log(`✅ Groq API response received using ${modelToUse}`);
                    this.groqModel = modelToUse;

                    return {
                        success: true,
                        content: text
                    };
                } catch (error) {
                    console.error(`❌ Groq API error with ${modelToUse}:`, error.message);
                    lastError = error;
                }
            }
        }

        return {
            success: false,
            error: 'No working AI API key configured. Please provide a valid GROQ_API_KEY or GEMINI_API_KEY in .env',
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
