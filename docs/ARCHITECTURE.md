# 🏗️ SOMGEN PREDATOR Architecture

Sistem SOMGEN PREDATOR dibangun di atas arsitektur **Multi-Agent Intelligence** yang sangat modular dan skalabel. Setiap komponen bekerja secara sinkron untuk mengubah data mentah dari jaringan Somnia menjadi keputusan trading yang memiliki konviktifitas tinggi.

## 📊 System Overview Infographic

![SOMGEN Architecture Infographic](somgen_infographic.png)

---

## 🏛️ Komponen Utama

### 1. Intelligence Layer (The Council)
Ini adalah otak dari SOMGEN, terdiri dari 4 agen spesialis:
*   **AGEN1 (Technical Sniper)**: Menganalisa RSI, Moving Averages, dan pola candlestick.
*   **AGEN2 (On-Chain Sleuth)**: Melacak aliran dana Whale dan aktivitas mempool di Somnia.
*   **AGEN3 (Social Sentinel)**: Melakukan scraping sentimen komunitas dan berita terkini.
*   **AGEN4 (Executive Judge)**: Memberikan vonis final berdasarkan skor konsensus dari ketiga agen lainnya.

### 2. Data Providers
Penyedia data real-time yang mensuplai informasi ke Intelligence Layer:
*   **Somnia RPC Provider**: Menarik data on-chain langsung dari jaringan.
*   **Social Scraper (Playwright)**: Mengambil bukti visual (Evidence) dari web.
*   **Native AI Engine**: Melakukan proses *Deep Reasoning* secara deterministik.

### 3. Consensus & Execution Loop
Proses pengambilan keputusan yang mengikuti alur:
1.  **Request**: User memulai misi melalui UI.
2.  **Debate**: Agen saling memberikan opini dan membantah satu sama lain.
3.  **Threshold Check**: Skor harus melewati ambang batas (60%+) untuk eksekusi.
4.  **Audit**: Pengecekan saldo dan delegasi akses (jika diaktifkan).
5.  **Final Order**: Eksekusi posisi LONG/SHORT atau REJECT.

---

## 🚀 Filosofi Desain
SOMGEN dirancang dengan prinsip **"Trust but Verify"**. Tidak ada agen yang memiliki otoritas tunggal; setiap keputusan adalah hasil dari perdebatan sengit yang bisa diaudit melalui Live Terminal Log.

**SOMGEN: The Predator of Somnia Network.** 🌌🛡️⚖️
