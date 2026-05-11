# 🌌 SOMGEN PREDATOR: Autonomous Multi-Agent Intelligence
**The Elite Trading Council for Somnia Network**

SOMGEN PREDATOR adalah engine trading multi-agen otonom yang dirancang untuk jaringan Somnia L1. Sistem ini menggunakan **Adversarial Consensus Loop** di mana empat agen spesialis (Teknikal, On-Chain, Fundamental, dan Hakim) saling berdebat secara mendalam sebelum mengambil keputusan eksekusi aset (SOMI, WETH, WBTC).

---

## 🚀 Fitur Utama (V3 Professional)

*   **🧠 Adversarial Debate Engine**: Agen tidak sekadar setuju; mereka saling membantah dan memverifikasi data satu sama lain (Cross-Agent Verification).
*   **🕰️ Deep Reasoning Mode**: Setiap opini agen dihasilkan melalui proses "berpikir" 3-6 detik untuk menjamin validitas analisa data pasar.
*   **📟 Live Terminal Logging**: Transparansi total dengan streaming "Langkah Analisa Internal" langsung ke terminal dashboard.
*   **🎨 Premium Comic UI**: Dashboard estetik bertema predator dengan animasi gelembung bicara dinamis.
*   **🔄 Session-Based Reset**: Sistem otomatis mereset orkestrasi setiap kali browser di-refresh untuk menjaga keamanan sesi.

---

## 🛠️ Struktur Proyek (Modular)

```text
SOMGEN/
├── src/
│   ├── core/           # Otak sistem (Orchestrator, Server, Consensus)
│   ├── providers/      # Integrasi data (Somnia RPC, Real LLM, Social Scraper)
│   ├── agents/         # Logika spesifik masing-masing agen
│   └── ui/             # Dashboard (Modular CSS, JS, HTML)
├── artifacts/          # Bukti eksekusi (Screenshots/Evidence)
└── README.md
```

---

## 📦 Cara Instalasi

1. **Clone Repository:**
   ```bash
   git clone https://github.com/apilpirmangithub/SOMNIACONCEPT.git
   cd SOMNIACONCEPT
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Setup Environment (Opsional):**
   Tambahkan `SOMNIA_AI_KEY` di file `.env` untuk mengaktifkan Production LLM. Jika tidak ada, sistem akan otomatis masuk ke mode **Advanced Local Reasoning**.

---

## 🌐 Cara Mencoba di Web (Step-by-Step)

Ikuti langkah-langkah berikut untuk mengaktifkan Dashboard Predator:

1. **Jalankan Server:**
   Buka terminal di folder root dan ketik:
   ```bash
   npx ts-node src/core/server.ts
   ```

2. **Buka Dashboard:**
   Buka browser (Chrome/Edge) dan akses alamat berikut:
   👉 **[http://localhost:8080/](http://localhost:8080/)**

3. **Pilih Mode Misi:**
   *   **Opsi A (Vanguard-X):** Tulis instruksi kustom di kotak teks "FORGE CUSTOM AGENT" lalu klik tombol biru.
   *   **Opsi B (Standar):** Ketik salah satu mode (`AGGRESSIVE`, `NORMAL`, atau `SAFETY`) di kotak input bawah dan tekan **Enter**.

4. **Pantau Debat Real-Time:**
   *   Lihat panel komik saat agen mulai bicara satu per satu.
   *   Perhatikan **Terminal Log** di bagian bawah untuk melihat proses "Deep Reasoning" (Langkah 1, Langkah 2, dll).
   *   Tunggu hingga **AGEN4 (The Judge)** memberikan vonis final beserta angkanya (Leverage/Target).

5. **Reset Sesi:**
   Cukup tekan **F5 (Refresh)** di browser Anda untuk menghentikan seluruh proses di server dan memulai dari nol kembali.

---

## 🛡️ Keamanan & Integritas
Sistem ini dilengkapi dengan **Wallet Auditor** (simulasi) dan **Consensus Threshold** yang tinggi. Keputusan `REJECT` akan muncul jika tingkat keyakinan agen di bawah 60%, memastikan modal Anda hanya digunakan untuk peluang dengan konviktifitas tinggi.

**SOMGEN: Hunt Smart. Trade Hard.** 🌌⚖️🚀
