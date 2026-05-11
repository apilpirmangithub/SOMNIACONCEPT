# 🏗️ SOMGEN PREDATOR Technical Architecture (V4)

Sistem SOMGEN PREDATOR dirancang sebagai mesin otonom berbasis **Multi-Agent Council**. Alur logika teknis terbaru (V4) kini menyertakan fitur **"Commander Choice"** di mana AGEN0 melakukan perbandingan profitabilitas antara pasar Trading dan ekosistem DeFi.

## 🧬 Technical Logic Flow

```mermaid
graph TD
    User([USER]) -- "Pilih Trading / DeFi / Keduanya" --> A0[AGEN0: Lead Strategist]
    
    subgraph Analysis [Dual-Scanning Stage]
        A0 -- "Scan Trading Profit" --> T[Trading Alpha]
        A0 -- "Scan DeFi Yield" --> D[DeFi Opportunities]
    end

    A0 -- "Compare: Mana yang Paling Cepat Profit?" --> Decision{Final Strategy}
    
    Decision -- "Execute Trading Path" --> Council
    Decision -- "Execute DeFi Path" --> Council

    subgraph Council [Intelligence Council]
        A1[AGEN1: Technical Sniper]
        A2[AGEN2: On-Chain Sleuth]
        A3[AGEN3: Social Sentinel]
        A4{AGEN4: Executive Judge}
    end

    Council -- "Consensus Reached" --> Final[Final Execution]

    style A0 fill:#f1c40f,stroke:#000,stroke-width:2px,color:#000
    style Decision fill:#e67e22,stroke:#000,stroke-width:2px,color:#fff
    style Final fill:#2ecc71,stroke:#000,stroke-width:2px,color:#fff
```

---

## 🏛️ Komponen Logika Terkini

### 1. Commander Choice Layer (AGEN0)
*   **Dual-Scanning**: AGEN0 secara simultan mengecek indikator trading (Price Action) dan peluang DeFi (Yield/Arbitrase).
*   **Profit Comparison**: Melakukan komputasi untuk menentukan jalur mana yang memiliki *risk-to-reward* terbaik saat ini.
*   **Mission Briefing**: Memberikan perintah spesifik ke agen lain agar tidak membuang waktu menganalisa jalur yang tidak dipilih.

### 2. Council Deep Reasoning
Setelah AGEN0 menentukan jalur, tim spesialis mulai bekerja:
*   **AGEN1 (Technical)**: Mencari titik entri (jika Trading) atau mencari selisih harga (jika DeFi Arbitrase).
*   **AGEN2 (On-Chain)**: Memantau Whale (jika Trading) atau menghitung APY & Health Factor (jika DeFi Yield).
*   **AGEN3 (Social)**: Memverifikasi keamanan berita atau protokol yang dipilih.

### 3. Executive Judgment (AGEN4)
*   Memastikan keputusan AGEN0 didukung oleh data dari AGEN1, 2, dan 3.
*   Mengeluarkan vonis final: **EXECUTE** (Jalankan) atau **REJECT** (Batalkan jika risiko mendadak tinggi).

---

## 🚀 Filosofi "Efficiency First"
V4 mengutamakan kecepatan eksekusi profit. Dengan melakukan perbandingan di awal (AGEN0), SOMGEN memastikan modal Anda tidak diam di aset yang stagnan jika ada peluang bunga yang lebih tinggi di sektor DeFi.

**SOMGEN: Decision-Driven. Profit-Oriented.** 🌌🛡️⚖️💰🚀
