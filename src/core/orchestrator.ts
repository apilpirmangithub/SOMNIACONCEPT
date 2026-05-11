import { CollaborativeForum } from './consensus';
import { fetchLiveSomniaData } from '../providers/somnia';
import { EvidenceScraper } from '../providers/social';
import { Server } from 'socket.io';

const scraper = new EvidenceScraper();

async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 🔄 ORCHESTRATOR REACTIVE LOOP (V3 - CLEAN VERSION)
 */
export async function startOrchestratorLoop(io: Server) {
    let activeLoops = new Map<string, boolean>();

    io.on('connection', (socket) => {
        console.log(`[ORCHESTRATOR] 🌌 User ${socket.id} connected.`);
        activeLoops.set(socket.id, false);

        socket.on('start-mission', async (data) => {
            if (activeLoops.get(socket.id)) return;
            
            activeLoops.set(socket.id, true);
            const userProfile = data.mode || "AGGRESSIVE";
            const targetCoins = ["SOMI", "WETH", "WBTC"];
            const forum = new CollaborativeForum();

            while (activeLoops.get(socket.id)) {
                try {
                    const currentCoin = targetCoins[Math.floor(Math.random() * targetCoins.length)];
                    const marketData = await fetchLiveSomniaData(currentCoin);

                    forum.clear();
                    const agents = ["AGEN0", "AGEN1", "AGEN2", "AGEN3"];
                    const personalities: any = {
                        "AGEN0": "Lead Strategist",
                        "AGEN1": "Technical Analyst",
                        "AGEN2": "On-Chain Sleuth",
                        "AGEN3": "Social Sentinel",
                        "AGEN4": "Executive Judge",
                        "CUSTOM": "Vanguard-X Custom Agent"
                    };
                    if (data.isCustomActive) agents.push("CUSTOM");

                    for (const agent of agents) {
                        if (!activeLoops.get(socket.id)) break;
                        socket.emit('system-log', { agent, message: `Menganalisa ${currentCoin}...` });
                        const opinion = await forum.participate(agent, marketData, currentCoin);
                        socket.emit('agent-thought', { agent, opinion, coin: currentCoin });
                        await sleep(3000); // Deep reasoning
                    }

                    if (!activeLoops.get(socket.id)) break;

                    const consensus = forum.resolveConsensus(userProfile, currentCoin);
                    
                    socket.emit('agent-thought', { agent: 'AGEN4', opinion: consensus.reasoning, coin: currentCoin });
                    await sleep(2000);
                    socket.emit('consensus-reached', consensus);

                    if (consensus.decision !== "REJECT") {
                        await scraper.captureProof("AGEN4", "https://somnia.network");
                    }

                    console.log(`[ORCHESTRATOR] Round complete for ${socket.id}. Cooling down...`);
                    await sleep(10000);
                } catch (error: any) {
                    console.error("[CRITICAL] Loop error:", error.message);
                    await sleep(5000);
                }
            }
        });

        socket.on('disconnect', () => {
            activeLoops.set(socket.id, false);
            activeLoops.delete(socket.id);
        });
    });
}
