import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { startOrchestratorLoop } from './orchestrator';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 8080;
const rootDir = process.cwd();
const uiPath = path.join(rootDir, 'src', 'ui');

console.log(`[SERVER] Root: ${rootDir}`);
console.log(`[SERVER] UI Path: ${uiPath}`);

// Serve static UI files (index.html is default)
app.use(express.static(uiPath));

io.on('connection', (socket) => {
    console.log('[SERVER] 🌌 User connected to SOMGEN Intelligence Layer');
});

server.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🌌 SOMGEN SERVER RUNNING AT http://localhost:${PORT}`);
    console.log(`==================================================\n`);
    
    startOrchestratorLoop(io);
});
