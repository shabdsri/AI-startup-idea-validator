import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import API_URL from '../config/api'

const STEPS = [
    { id: 1, label: 'Idea' },
    { id: 2, label: 'Market' },
    { id: 3, label: 'Model' },
    { id: 4, label: 'Submit' }
]

function Validate() {
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [formData, setFormData] = useState({
        description: '',
        geography: '',
        customerType: '',
        revenueModel: '',
        stage: '',
        competitors: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const nextStep = () => {
        if (currentStep < STEPS.length) {
            setCurrentStep(prev => prev + 1)
        }
    }

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const response = await axios.post(`${API_URL}/api/validate`, formData)
            navigate(`/results/${response.data.sessionId}`)
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to start validation. Is the server running?')
            setLoading(false)
        }
    }

    const isStepValid = () => {
        switch (currentStep) {
            case 1:
                return formData.description.length >= 50
            case 2:
                return formData.geography && formData.customerType
            case 3:
                return formData.revenueModel && formData.stage
            case 4:
                return true
            default:
                return false
        }
    }

    return (
        <div className="container" style={{ paddingTop: 'var(--spacing-2xl)', paddingBottom: 'var(--spacing-3xl)' }}>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                <h1 className="text-center mb-md">Validate Your Startup Idea</h1>
                <p className="text-center mb-xl" style={{ color: 'var(--text-muted)' }}>
                    Fill in the details below for a comprehensive AI-powered analysis.
                </p>

                {/* Progress Steps */}
                <div className="wizard-steps mb-xl">
                    {STEPS.map((step, index) => (
                        <div key={step.id} style={{ display: 'flex', alignItems: 'center' }}>
                            <div className={`wizard-step ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}>
                                <div className="wizard-step-number">
                                    {currentStep > step.id ? '✓' : step.id}
                                </div>
                                <span className="wizard-step-label">{step.label}</span>
                            </div>
                            {index < STEPS.length - 1 && (
                                <div className={`wizard-connector ${currentStep > step.id ? 'completed' : ''}`} />
                            )}
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="card">
                        {/* Step 1: Idea Description */}
                        {currentStep === 1 && (
                            <div>
                                <h3 className="mb-md">📝 Describe Your Startup Idea</h3>
                                <div className="form-group">
                                    <label className="form-label">
                                        Startup Idea Description *
                                    </label>
                                    <textarea
                                        name="description"
                                        className="form-textarea"
                                        placeholder="Describe the problem you're solving, your solution, and your target users. Be as specific as possible (minimum 50 characters)..."
                                        value={formData.description}
                                        onChange={handleChange}
                                        style={{ minHeight: '180px' }}
                                        required
                                    />
                                    <small style={{ color: 'var(--text-muted)', display: 'block', marginTop: '0.5rem' }}>
                                        {formData.description.length}/50 characters minimum
                                    </small>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Market Info */}
                        {currentStep === 2 && (
                            <div>
                                <h3 className="mb-md">🌍 Target Market</h3>
                                <div className="form-group">
                                    <label className="form-label">Target Geography *</label>
                                    <input
                                        type="text"
                                        name="geography"
                                        className="form-input"
                                        placeholder="e.g., United States, India, Europe, Global..."
                                        value={formData.geography}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Customer Type *</label>
                                    <select
                                        name="customerType"
                                        className="form-select"
                                        value={formData.customerType}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select customer type...</option>
                                        <option value="B2B">B2B (Business to Business)</option>
                                        <option value="B2C">B2C (Business to Consumer)</option>
                                        <option value="B2B2C">B2B2C (Business to Business to Consumer)</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Business Model */}
                        {currentStep === 3 && (
                            <div>
                                <h3 className="mb-md">💼 Business Model</h3>
                                <div className="form-group">
                                    <label className="form-label">Revenue Model *</label>
                                    <input
                                        type="text"
                                        name="revenueModel"
                                        className="form-input"
                                        placeholder="e.g., SaaS subscription, marketplace commission, ads, freemium..."
                                        value={formData.revenueModel}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Current Stage *</label>
                                    <select
                                        name="stage"
                                        className="form-select"
                                        value={formData.stage}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select stage...</option>
                                        <option value="idea">💡 Idea Stage (no product yet)</option>
                                        <option value="mvp">🛠️ MVP (product built, testing)</option>
                                        <option value="early_traction">📈 Early Traction (paying customers)</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Known Competitors (optional)</label>
                                    <input
                                        type="text"
                                        name="competitors"
                                        className="form-input"
                                        placeholder="List competitors separated by commas..."
                                        value={formData.competitors}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 4: Review & Submit */}
                        {currentStep === 4 && (
                            <div>
                                <h3 className="mb-md">✅ Review & Submit</h3>
                                <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)' }}>
                                    <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                        <strong>Idea:</strong>
                                        <p style={{ marginTop: 'var(--spacing-xs)', color: 'var(--text-secondary)' }}>
                                            {formData.description}
                                        </p>
                                    </div>
                                    <div className="grid-2">
                                        <div>
                                            <strong>Geography:</strong>
                                            <p style={{ color: 'var(--text-secondary)' }}>{formData.geography}</p>
                                        </div>
                                        <div>
                                            <strong>Customer Type:</strong>
                                            <p style={{ color: 'var(--text-secondary)' }}>{formData.customerType}</p>
                                        </div>
                                        <div>
                                            <strong>Revenue Model:</strong>
                                            <p style={{ color: 'var(--text-secondary)' }}>{formData.revenueModel}</p>
                                        </div>
                                        <div>
                                            <strong>Stage:</strong>
                                            <p style={{ color: 'var(--text-secondary)' }}>{formData.stage}</p>
                                        </div>
                                    </div>
                                    {formData.competitors && (
                                        <div style={{ marginTop: 'var(--spacing-md)' }}>
                                            <strong>Competitors:</strong>
                                            <p style={{ color: 'var(--text-secondary)' }}>{formData.competitors}</p>
                                        </div>
                                    )}
                                </div>

                                {error && (
                                    <div style={{
                                        background: 'var(--error-bg)',
                                        color: 'var(--error)',
                                        padding: 'var(--spacing-md)',
                                        borderRadius: 'var(--radius-md)',
                                        marginBottom: 'var(--spacing-lg)'
                                    }}>
                                        ⚠️ {error}
                                    </div>
                                )}

                                <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)' }}>
                                    By submitting, your idea will be analyzed across 7 dimensions using AI.
                                    This typically takes 1-2 minutes.
                                </p>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--spacing-xl)' }}>
                            {currentStep > 1 ? (
                                <button type="button" className="btn btn-secondary" onClick={prevStep}>
                                    ← Back
                                </button>
                            ) : (
                                <div />
                            )}

                            {currentStep < STEPS.length ? (
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={nextStep}
                                    disabled={!isStepValid()}
                                >
                                    Next →
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="loading-spinner" />
                                            Analyzing...
                                        </>
                                    ) : (
                                        '🚀 Start Validation'
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Validate
