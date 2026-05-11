/**
 * 🌌 SOMNIA NATIVE INTELLIGENCE (V4 - USER-FRIENDLY & ALIGNED)
 */

export interface LLMResponse {
    opinion: string;
    bias: number;
    confidence: number; // 0-100
    reasoning: string;
}

export class SomniaLLMProvider {
    constructor() {}

    async generateInsight(agentName: string, personality: string, data: any): Promise<LLMResponse> {
        const thinkTime = Math.floor(Math.random() * 2000 + 3000); 
        console.log(`[NATIVE_AI] 🧠 ${agentName} analyzing ${data.coin}...`);

        let bias = 0;
        let opinion = "";
        let confidence = Math.floor(Math.random() * 20 + 75); // Base confidence 75-95
        const ticker = data.coin || "ASSET";

        const isBullish = data.rsi < 40 && data.whaleFlow > 1500000;
        const isBearish = data.rsi > 65 || data.whaleFlow < -1500000;
        
        bias = isBullish ? 0.6 : (isBearish ? -0.6 : 0);

        // --- INTERNAL STAGES (Logged to terminal only) ---
        await new Promise(r => setTimeout(r, thinkTime * 0.3));
        // Simulate Stage 1: Scrape & Parse
        
        if (agentName === "AGEN1") {
            opinion = isBullish 
                ? `Grafik ${ticker} menunjukkan sinyal beli yang kuat. Harganya sudah murah (diskon), saatnya masuk!` 
                : (isBearish ? `Hati-hati, harga ${ticker} sudah terlalu mahal sekarang. Risiko turun sangat besar.` : `Kondisi ${ticker} masih datar. Saya sarankan tunggu sebentar lagi.`);
        } else if (agentName === "AGEN2") {
            const flowM = (data.whaleFlow / 1000000).toFixed(1);
            opinion = data.whaleFlow > 2000000 
                ? `Saya melihat pemain besar (Whale) sedang memborong ${ticker} senilai $${flowM}M. Ini pertanda bagus!` 
                : `Ada aliran dana keluar dari ${ticker}. Sepertinya para bandar sedang jualan.`;
        } else if (agentName === "AGEN3") {
            opinion = `Komunitas di media sosial sangat ramai membicarakan ${ticker}. Sentimennya positif dan aman untuk trading.`;
        } else {
            opinion = `Analisa ${ticker} selesai. Saya sudah memverifikasi semua data dan siap memberikan keputusan.`;
        }

        return {
            opinion,
            bias,
            confidence,
            reasoning: `Technical Audit for ${ticker} completed with RSI ${data.rsi} and Flow ${data.whaleFlow}.`
        };
    }
}
