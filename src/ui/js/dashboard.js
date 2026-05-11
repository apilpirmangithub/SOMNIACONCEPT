const input = document.getElementById('chat-input');
const landing = document.getElementById('landing');
const mainContainer = document.getElementById('main-container');
const modal = document.getElementById('final-modal');
const actionWord = document.getElementById('action-word');
const finalText = document.getElementById('final-text');
const terminal = document.getElementById('terminal-log');

const socket = io(); // Connect to real backend

/**
 * 📟 LIVE TERMINAL LOGGING
 */
function logToTerminal(agent, message) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    
    const time = new Date().toLocaleTimeString();
    line.innerHTML = `<span class="terminal-time">[${time}]</span> <span class="terminal-agent">${agent}:</span> ${message}`;
    
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
}

socket.on('agent-thought', async (data) => {
    console.log(`[REAL-LLM] ${data.agent}: ${data.opinion}`);
    logToTerminal(data.agent, data.opinion);

    if (data.agent === 'AGEN0') {
        const descEl = document.getElementById('md1');
        descEl.innerHTML = `<span style="color:var(--yellow)">[BRIEFING]:</span> ${data.opinion}`;
        return;
    }

    const panelId = data.agent.toLowerCase().replace('agen', 'p');
    const bubbleId = data.agent.toLowerCase().replace('agen', 'b');
    
    const panel = document.getElementById(panelId) || document.getElementById('p5');
    const bubble = document.getElementById(bubbleId) || document.getElementById('b5');

    if (panel && bubble) {
        panel.style.opacity = "1";
        panel.style.filter = "none";
        
        panel.classList.add('active', 'speaking');
        bubble.innerText = data.opinion;
        bubble.style.display = 'block';
        await sleep(4000);
        panel.classList.remove('speaking');
    }
});

socket.on('system-log', (data) => {
    logToTerminal(data.agent || "SYSTEM", data.message);
});

socket.on('consensus-reached', (data) => {
    logToTerminal("SYSTEM", `Consensus Reached: ${data.decision}`);
    
    modal.style.display = 'block';
    if (data.decision !== "REJECT") {
        finalText.innerText = `${data.decision} EXECUTED!`;
        finalText.style.color = "var(--green)";
    } else {
        finalText.innerText = "MISSION ABORTED (RISK HIGH)";
        finalText.style.color = "var(--red)";
    }

    setTimeout(() => {
        modal.style.display = 'none';
    }, 4000);
});

let isCustomActive = false;
let customPrompt = "";
const sleep = ms => new Promise(r => setTimeout(r, ms));

input.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        const val = input.value.toUpperCase();
        if(val.includes('AGGRESSIVE') || val.includes('NORMAL') || val.includes('SAFETY')) {
            landing.style.opacity = '0';
            document.getElementById('toggle-sidebar').style.display = 'block';
            
            await sleep(500);
            landing.style.display = 'none';
            mainContainer.style.display = 'grid';
            
            socket.emit('start-mission', { mode: val, isCustomActive: false });
            
            startComicStory(val);
            logToTerminal("SYSTEM", `Mission Started in ${val} mode.`);
        } else {
            input.value = "";
            input.placeholder = "TOLONG KETIK AGGRESSIVE / NORMAL / SAFETY";
        }
    }
});

function toggleSidebar() {
    const container = document.getElementById('main-container');
    const btn = document.getElementById('toggle-sidebar');
    container.classList.toggle('sidebar-hidden');
    btn.innerText = container.classList.contains('sidebar-hidden') ? "STATS: OFF" : "STATS: ON";
}

async function forgeAgent() {
    const prompt = document.getElementById('forgePrompt').value;
    if (!prompt) return alert("Tolong masukkan instruksi untuk agen kustom!");
    
    isCustomActive = true;
    customPrompt = prompt;
    
    const btn = document.querySelector('.agent-forge-container button');
    btn.innerText = "✅ AGENT VANGUARD-X DEPLOYED";
    btn.style.background = "var(--green)";
    btn.disabled = true;
    
    document.getElementById('forgePrompt').disabled = true;
    document.getElementById('p5').style.display = 'flex';
    document.getElementById('customName').innerText = "VANGUARD-X";
    
    logToTerminal("FORGE", `Custom Agent Vanguard-X initialized with profile: ${prompt}`);

    await sleep(1000);
    landing.style.opacity = '0';
    document.getElementById('toggle-sidebar').style.display = 'block';
    await sleep(500);
    landing.style.display = 'none';
    mainContainer.style.display = 'grid';

    socket.emit('start-mission', { mode: "CUSTOM", isCustomActive: true });

    startComicStory("CUSTOM_MODE");
}

async function startComicStory(userMode) {
    ['p1', 'p2', 'p3', 'p4', 'p5'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.style.opacity = "0.2";
        el.style.filter = "grayscale(100%) blur(2px)";
        el.classList.remove('active');
    });

    document.getElementById('ms1').innerText = "SYNCING WITH CORE...";
    document.getElementById('m1').classList.add('active');
    logToTerminal("NETWORK", "Synchronizing with DIA Oracle & Somnia Mainnet...");
}
