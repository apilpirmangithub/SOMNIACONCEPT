/**
 * 🤝 SOMNIA COLLABORATIVE REASONING FORUM (V2 - REAL LLM READY)
 */

import { SomniaLLMProvider, LLMResponse } from '../providers/llm';

export class CollaborativeForum {
    private llm = new SomniaLLMProvider();
    private sharedContext: { agent: string, opinion: string, bias: number }[] = [];
    private weights: { [key: string]: number } = { 
        AGEN1: 0.30, // Technical
        AGEN2: 0.30, // On-Chain
        AGEN3: 0.20, // Social
        CUSTOM: 0.20 // User Agent
    };

    async participate(agentName: string, rawData: any, currentCoin: string, context: string = "") {
        console.log(`\n[${agentName}] 🧠 Menghubungkan ke Inteligensi Somnia...`);

        const personalities: { [key: string]: string } = {
            "AGEN1": "Technical Analyst yang fokus pada indikator RSI, EMA, dan Volume.",
            "AGEN2": "On-Chain Detective yang melacak pergerakan Whale dan Mempool Somnia.",
            "AGEN3": "Social Sentinel yang menganalisis sentimen komunitas dan keamanan protokol.",
            "AGEN4": "The Judge yang mengambil keputusan final berdasarkan konsensus agen lain.",
            "CUSTOM": rawData.customPrompt || "Agen kustom yang fleksibel."
        };

        try {
            // Build debate context: Let the current agent see what others said
            const debateHistory = this.sharedContext
                .map(c => `[${c.agent} said: ${c.opinion}]`)
                .join("\n");
            
            const fullContext = `MISSION_GOAL: ${context}\nDEBATE_HISTORY:\n${debateHistory}`;

            const insight: LLMResponse = await this.llm.generateInsight(
                agentName, 
                personalities[agentName], 
                { ...rawData, coin: currentCoin, context: fullContext }
            );

            this.sharedContext.push({ 
                agent: agentName, 
                opinion: insight.opinion, 
                bias: insight.bias 
            });

            return insight;
        } catch (error) {
            const fallback = `[${agentName}] Koneksi LLM terputus. Menggunakan mode darurat data-driven.`;
            this.sharedContext.push({ agent: agentName, opinion: fallback, bias: 0 });
            return {
                opinion: fallback,
                bias: 0,
                confidence: 50,
                reasoning: "FALLBACK"
            };
        }
    }

    resolveConsensus(userProfile: string, currentCoin: string) {
        let weightedScore = 0;
        let totalWeight = 0;

        this.sharedContext.forEach(entry => {
            const weight = this.weights[entry.agent] || 0.1;
            weightedScore += (entry.bias * weight);
            totalWeight += weight;
        });

        const finalScore = totalWeight > 0 ? (weightedScore / totalWeight) : 0;
        // TINGKATKAN STANDAR: Threshold dibuat lebih tinggi agar tidak mudah "berpendapat"
        const threshold = userProfile === "AGGRESSIVE" ? 0.45 : (userProfile === "SAFETY" ? 0.75 : 0.60);

        let decision = "REJECT";
        const isDefiProposed = this.sharedContext.some(entry => entry.opinion.includes("[DEFI]"));

        if (Math.abs(finalScore) >= threshold) {
            // Kalkulasi Leverage berdasarkan Confidence Score
            const baseLev = userProfile === "AGGRESSIVE" ? 20 : (userProfile === "SAFETY" ? 2 : 5);
            const dynamicLeverage = Math.floor(baseLev * (Math.abs(finalScore) * 2));
            const decisionType = finalScore > 0 ? "LONG" : "SHORT";

            return {
                decision: decisionType,
                score: finalScore,
                leverage: dynamicLeverage,
                type: "TRADING",
                reasoning: `[KONSENSUS TERCAPAI] Skor Keyakinan: ${finalScore.toFixed(2)}. AGEN4 mengeksekusi ${decisionType} ${currentCoin} dengan LEVERAGE ${dynamicLeverage}X.`
            };
        } else if (isDefiProposed) {
            return {
                decision: "EXECUTE_DEFI",
                score: 0.5,
                leverage: 1,
                type: "DEFI",
                reasoning: `[KONSENSUS DEFI] Divergensi trading tinggi. AGEN4 memutuskan memindahkan modal ${currentCoin} ke Somnex Yield Vault (Risk: Low).`
            };
        }

        return {
            decision: "REJECT",
            score: finalScore,
            leverage: 0,
            type: "NONE",
            reasoning: `[MISI DIBATALKAN] Skor @${finalScore.toFixed(2)} tidak memenuhi standar ${userProfile}. Terlalu berisiko untuk mengeksekusi ${currentCoin}.`
        };
    }

    getLatestOpinion(): string {
        return this.sharedContext.length > 0 ? this.sharedContext[this.sharedContext.length - 1].opinion : "";
    }

    clear() {
        this.sharedContext = [];
    }
}
