/**
 * 📸 SOMGEN REAL-TIME EVIDENCE SCRAPER
 * Captures real visual proof from the web for the Agent Monitors.
 */

import { chromium } from 'playwright'; 
import path from 'path';

export class EvidenceScraper {
    private folderMap: { [key: string]: string } = {
        "AGEN0": "commander",
        "AGEN1": "technical",
        "AGEN2": "onchain",
        "AGEN3": "social",
        "AGEN4": "judge",
        "CUSTOM": "commander" // Fallback for custom agent
    };

    /**
     * Captures a real-world screenshot for an agent and saves it to its modular folder.
     */
    async captureProof(agentName: string, targetUrl: string) {
        console.log(`[${agentName}] 📸 INITIATING REAL-TIME SCRAPING: ${targetUrl}`);

        const browser = await chromium.launch();
        const page = await browser.newPage();

        try {
            await page.setViewportSize({ width: 800, height: 600 });
            await page.goto(targetUrl, { waitUntil: 'networkidle' });

            await page.waitForTimeout(5000);

            const folder = this.folderMap[agentName] || "judge";
            const outputPath = path.join(process.cwd(), 'src', 'agents', folder, 'evidence', 'evidence.png');

            await page.screenshot({ path: outputPath });
            console.log(`[${agentName}] ✅ MODULAR EVIDENCE CAPTURED: ${outputPath}`);

        } catch (error) {
            console.error(`[${agentName}] ❌ SCRAPING FAILED:`, error);
        } finally {
            await browser.close();
        }
    }
}
