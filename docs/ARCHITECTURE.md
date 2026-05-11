# 🏗️ SOMGEN PREDATOR Technical Architecture

Sistem SOMGEN PREDATOR dirancang sebagai mesin otonom berbasis **Multi-Agent Council**. Alur logika teknisnya memastikan setiap keputusan trading melalui proses briefing, debat, audit, hingga eksekusi final.

## 🧬 Technical Logic Flow

```mermaid
graph TD
    User([USER]) -- "Starts Mission (Aggressive/Normal/Safety)" --> A0[AGEN0: Lead Strategist]
    
    A0 -- "Sets Mission Goal & Briefing" --> Council
    
    subgraph Data [Data Pipeline]
        D1[Somnia RPC Provider]
        D2[DIA Oracle Feed]
        D3[Social Scraper]
    end

    subgraph Council [Intelligence Council]
        A1[AGEN1: Technical Sniper]
        A2[AGEN2: On-Chain Sleuth]
        A3[AGEN3: Social Sentinel]
        A4{AGEN4: Executive Judge}
    end

    D1 --> A1 & A2
    D2 --> A1
    D3 --> A3

    A1 -- "Opinion & Bias" --> A4
    A2 -- "Opinion & Bias" --> A4
    A3 -- "Opinion & Bias" --> A4

    A4 -- "Skor > 60% & Valid Audit" --> Exec[EXECUTE TRADE]
    A4 -- "Skor < 60% / High Risk" --> Prot[REJECT & PROTECT]

    style A0 fill:#f1c40f,stroke:#000,stroke-width:2px,color:#000
    style A4 fill:#9b59b6,stroke:#000,stroke-width:2px,color:#fff
    style Exec fill:#2ecc71,stroke:#000,stroke-width:2px,color:#fff
    style Prot fill:#e74c3c,stroke:#000,stroke-width:2px,color:#fff
```

---

## 🏛️ Komponen Logika

### 1. Commander Layer (AGEN0)
*   Menerima instruksi dari User.
*   Melakukan kalkulasi target awal berdasarkan profil risiko.
*   Memberikan *briefing* awal kepada dewan agen untuk membatasi ruang lingkup pencarian.

### 2. Analysis Layer (AGEN1, AGEN2, AGEN3)
*   **AGEN1**: Fokus pada indikator teknis (RSI, Trendline) dari DIA Oracle.
*   **AGEN2**: Menganalisa pergerakan Whale dan likuiditas dari Somnia RPC.
*   **AGEN3**: Melakukan audit sentimen komunitas dan berita web melalui scraper.

### 3. Judgment Layer (AGEN4)
*   Menerima opini dari seluruh Analysis Layer.
*   Melakukan pembobotan konsensus.
*   Menghitung **Leverage** secara dinamis berdasarkan *Confidence Score*.
*   Memberikan vonis final (LONG/SHORT/REJECT).

---

## 🚀 Deep Reasoning Protocol
Setiap langkah dalam diagram di atas mengikuti protokol **Deep Reasoning** di mana agen melakukan sinkronisasi data selama 3-6 detik untuk menjamin determinisme sebelum mengeluarkan output.

**SOMGEN: Built for Precision. Optimized for Somnia.** 🌌🛡️⚖️
