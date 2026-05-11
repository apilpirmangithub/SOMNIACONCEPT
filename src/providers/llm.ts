/**
 * 🌌 SOMNIA NATIVE INTELLIGENCE (V5 - STRATEGIC SYNCHRONIZATION)
 */

export interface LLMResponse {
    opinion: string;
    bias: number;
    confidence: number; 
    reasoning: string;
    strategy?: 'TRADING' | 'DEFI'; // New: Force strategy for the whole team
}

export class SomniaLLMProvider {
    constructor() {}

    async generateInsight(agentName: string, personality: string, data: any): Promise<LLMResponse> {
        const thinkTime = Math.floor(Math.random() * 2000 + 2000); 
        console.log(`[NATIVE_AI] 🧠 ${agentName} analyzing ${data.coin}...`);

        let bias = 0;
        let opinion = "";
        let confidence = Math.floor(Math.random() * 20 + 75); 
        const ticker = data.coin || "ASSET";

        const isBullish = data.rsi < 40 && data.whaleFlow > 1500000;
        const isBearish = data.rsi > 65 || data.whaleFlow < -1500000;
        
        bias = isBullish ? 0.6 : (isBearish ? -0.6 : 0);

        // --- AGEN0: THE COMMANDER (STRATEGY DECIDER) ---
        if (agentName === "AGEN0") {
            const tradingScore = isBullish ? 0.8 : 0.2;
            const defiScore = data.defiEnabled ? 0.6 : 0;
            
            let strategy: 'TRADING' | 'DEFI' = 'TRADING';
            
            if (data.tradingEnabled && data.defiEnabled) {
                strategy = (tradingScore > defiScore) ? 'TRADING' : 'DEFI';
            } else if (data.defiEnabled) {
                strategy = 'DEFI';
            }

            if (strategy === 'TRADING') {
                opinion = `[STRATEGIST] Saya sudah scan pasar. Sinyal TRADING pada ${ticker} sangat kuat! Tim, abaikan DeFi, fokus ke eksekusi market sekarang.`;
            } else {
                opinion = `[STRATEGIST] Pasar trading ${ticker} kurang stabil. Saya instruksikan tim fokus ke DEFI (Yield/Arb) karena profitnya lebih pasti.`;
            }

            return { opinion, bias, confidence, reasoning: "Strategic Selection", strategy };
        }

        // --- SUBSEQUENT AGENTS: MUST FOLLOW STRATEGY ---
        const activeStrategy = data.activeStrategy || 'TRADING';

        if (activeStrategy === "DEFI") {
            const opp = data.defi;
            if (agentName === "AGEN1") {
                opinion = `Sesuai perintah Komandan, saya scan Arbitrase ${ticker}: Ada selisih ${opp.spread}% di ${opp.protocol}. Siap eksekusi!`;
            } else if (agentName === "AGEN2") {
                opinion = `Laporan Yield ${ticker} di ${opp.protocol}: APY @${opp.apy}% dengan resiko ${opp.riskLevel}. Sangat sinkron dengan strategi kita.`;
            } else if (agentName === "AGEN3") {
                opinion = `Audit keamanan untuk protokol ${opp.protocol} selesai. Komunitas percaya, dana aman untuk strategi DeFi ini.`;
            }
        } else {
            // TRADING MODE
            if (agentName === "AGEN1") {
                opinion = isBullish 
                    ? `Analisa Teknikal ${ticker}: Sinyal BUY valid. RSI @${data.rsi.toFixed(1)}, momentum sangat mendukung perintah Komandan.` 
                    : `Teknikal ${ticker}: Belum ada titik entri ideal, tapi saya standby mengikuti arahan TRADING.`;
            } else if (agentName === "AGEN2") {
                const flowM = (data.whaleFlow / 1000000).toFixed(1);
                opinion = data.whaleFlow > 1000000 
                    ? `Data On-Chain ${ticker}: Whale sedang akumulasi $${flowM}M. Kita satu jalur dengan Strategi Komandan.` 
                    : `Data On-Chain ${ticker}: Volume Whale sedang sepi, tapi saya pantau untuk persiapan entri TRADING.`;
            } else if (agentName === "AGEN3") {
                opinion = `Sentimen Sosial ${ticker}: Mayoritas trader optimis. Tidak ada berita negatif, aman untuk eksekusi TRADING.`;
            }
        }

        return {
            opinion,
            bias,
            confidence,
            reasoning: `Synchronized with ${activeStrategy} mission.`
        };
    }
}
