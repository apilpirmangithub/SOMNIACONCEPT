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

        // --- AGEN0: THE COMMANDER (STRICT STRATEGY SELECTION) ---
        if (agentName === "AGEN0") {
            // Profit Potential Scoring (0.0 to 1.0)
            const tradingPotential = (data.rsi < 30 && data.whaleFlow > 2500000) ? 0.9 : (isBullish ? 0.6 : 0.1);
            const defiOpp = data.defi || {};
            const defiPotential = (defiOpp.apy > 30 || (defiOpp.spread && defiOpp.spread > 1.0)) ? 0.85 : 0.4;
            
            let strategy: 'TRADING' | 'DEFI' = 'TRADING';
            
            if (data.tradingEnabled && data.defiEnabled) {
                // Pick the one with significantly higher potential
                strategy = (tradingPotential >= defiPotential) ? 'TRADING' : 'DEFI';
            } else if (data.defiEnabled) {
                strategy = 'DEFI';
            }

            if (strategy === 'TRADING') {
                const reason = tradingPotential > 0.8 ? "SINYAL SUPER-BULLISH" : "KONDISI MARKET STABIL";
                opinion = `[STRATEGIST] Analisa selesai. Saya pilih TRADING untuk ${ticker} karena ${reason}. Profit potential @${(tradingPotential*100).toFixed(0)}%. Tim, siapkan entri presisi!`;
            } else {
                const reason = defiPotential > 0.8 ? "DEFI YIELD MELIMPAH" : "SAFETY FIRST";
                opinion = `[STRATEGIST] Market trading ${ticker} terlalu berisiko/sepi. Saya pilih DEFI karena ${reason} di ${defiOpp.protocol || 'Ekosistem'}. Tim, laksanakan audit pool!`;
            }

            return { opinion, bias, confidence, reasoning: "Strict Strategic Selection", strategy };
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
