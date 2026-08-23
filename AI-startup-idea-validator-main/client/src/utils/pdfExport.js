import jsPDF from 'jspdf';

export async function generatePDF(results, ideaDescription) {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let y = 20;

    // Helper functions
    const addTitle = (text, size = 16) => {
        pdf.setFontSize(size);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(99, 102, 241);
        pdf.text(text, margin, y);
        y += size * 0.5;
    };

    const addSubtitle = (text) => {
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(50, 50, 50);
        pdf.text(text, margin, y);
        y += 6;
    };

    const addText = (text, indent = 0) => {
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(80, 80, 80);
        const lines = pdf.splitTextToSize(text, pageWidth - margin * 2 - indent);
        lines.forEach(line => {
            if (y > 270) {
                pdf.addPage();
                y = 20;
            }
            pdf.text(line, margin + indent, y);
            y += 5;
        });
    };

    const addScore = (label, score) => {
        pdf.setFontSize(10);
        const color = score >= 7 ? [34, 197, 94] : score >= 4 ? [234, 179, 8] : [239, 68, 68];
        pdf.setTextColor(...color);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${label}: ${score}/10`, margin, y);
        y += 6;
    };

    const addSpacer = (height = 8) => {
        y += height;
        if (y > 270) {
            pdf.addPage();
            y = 20;
        }
    };

    // Header
    addTitle('Startup Idea Validation Report', 20);
    addSpacer(4);
    pdf.setFontSize(9);
    pdf.setTextColor(120, 120, 120);
    pdf.text(`Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, margin, y);
    y += 10;

    // Idea Description
    addSubtitle('📝 Startup Idea');
    addText(ideaDescription || 'No description provided');
    addSpacer();

    // Final Verdict
    if (results.finalVerdict) {
        const verdict = results.finalVerdict;
        addTitle('📊 Final Verdict', 14);
        addSpacer(2);

        const recColor = verdict.recommendation === 'GO' ? [34, 197, 94] :
            verdict.recommendation === 'PIVOT' ? [234, 179, 8] : [239, 68, 68];
        pdf.setFontSize(24);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(...recColor);
        pdf.text(verdict.recommendation || 'N/A', margin, y);

        pdf.setFontSize(14);
        pdf.text(`${verdict.overallScore || 0}/10`, margin + 40, y);
        y += 10;

        if (verdict.recommendationRationale) {
            addText(verdict.recommendationRationale);
        }
        addSpacer();
    }

    // Success Probability
    if (results.successProbability) {
        addSubtitle('🎯 Success Probability');
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        const prob = results.successProbability.probability || 0;
        const probColor = prob >= 70 ? [34, 197, 94] : prob >= 40 ? [234, 179, 8] : [239, 68, 68];
        pdf.setTextColor(...probColor);
        pdf.text(`${prob}%`, margin, y);
        y += 8;
        if (results.successProbability.confidenceInterval) {
            addText(`Confidence: ${results.successProbability.confidenceInterval}`);
        }
        addSpacer();
    }

    // Scores Summary
    addSubtitle('📈 Scores Summary');
    if (results.ideaClarity?.ideaClarityScore) addScore('Idea Clarity', results.ideaClarity.ideaClarityScore);
    if (results.marketAnalysis?.marketScore) addScore('Market Analysis', results.marketAnalysis.marketScore);
    if (results.competitorAnalysis?.competitorScore) addScore('Competitor Analysis', results.competitorAnalysis.competitorScore);
    if (results.businessFeasibility?.feasibilityScore) addScore('Business Feasibility', results.businessFeasibility.feasibilityScore);
    addSpacer();

    // Key Findings
    if (results.finalVerdict?.keyStrengths?.length > 0) {
        addSubtitle('✅ Key Strengths');
        results.finalVerdict.keyStrengths.forEach(strength => {
            addText(`• ${strength}`, 5);
        });
        addSpacer();
    }

    if (results.finalVerdict?.criticalWeaknesses?.length > 0) {
        addSubtitle('⚠️ Critical Weaknesses');
        results.finalVerdict.criticalWeaknesses.forEach(weakness => {
            addText(`• ${weakness}`, 5);
        });
        addSpacer();
    }

    // Risks
    if (results.riskAnalysis?.criticalRisks?.length > 0) {
        addSubtitle('🚨 Critical Risks');
        results.riskAnalysis.criticalRisks.forEach(risk => {
            addText(`• ${risk}`, 5);
        });
        addSpacer();
    }

    // Next Steps
    if (results.finalVerdict?.nextSteps?.length > 0) {
        addSubtitle('📋 Recommended Next Steps');
        results.finalVerdict.nextSteps.forEach((step, i) => {
            addText(`${i + 1}. ${step}`, 5);
        });
        addSpacer();
    }

    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text('Powered by AI Startup Validator', margin, 285);

    // Save
    const fileName = `startup-validation-${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
    return fileName;
}
