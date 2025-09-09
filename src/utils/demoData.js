export const apexDemoData = {
    _id: "demo12345",
    ticker: "DEMO.NS",
    companyName: "Demonstration Corp",
    display_timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short'}),
    scrybeScore: 78,
    signal: "BUY",
    confidence: "High",
    predicted_gain_pct: 5.5,
    gain_prediction_rationale: "Based on recent volatility and key resistance, a 5.5% move is a realistic target.",
    keyInsight: "Strong sector momentum and a technical breakout indicate high probability of trend continuation.",
    analystVerdict: "The stock shows strong confluence. The bullish market and outperforming sector provide a supportive macro backdrop.",
    keyRisks_and_Mitigants: {
        risk_1: "A sharp reversal in the broader market could negate the setup.",
        risk_2: "Upcoming earnings data could be a negative catalyst if they disappoint.",
        mitigant: "A defined stop-loss based on ATR provides a clear exit point to manage downside."
    },
    thesisInvalidationPoint: "A daily close below the recent breakout level would invalidate the bullish structure.",
    keyObservations: {
        confluencePoints: ["Bullish market regime aligns with BUY signal.", "Sector is outperforming.", "Technical indicators confirm bullish momentum."],
        contradictionPoints: ["Valuation is slightly higher than the industry average."]
    }
};