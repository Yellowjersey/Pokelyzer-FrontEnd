# 📈 Pokélyzer Frontend

> **Pokélyzer** — Interactive web dashboard for Pokémon TCG price prediction & analysis.

This React app connects to the [Pokélyzer FastAPI backend](https://github.com/Yellowjersey/Pokelyzer.git) to show:
- ✅ Current market prices for any card
- ✅ Historical price trends
- ✅ 6-month price forecasts using Prophet
- ✅ Buy/Sell recommendations with optimal timing

---

## 🚀 Features

- **Card Search** — Input or select card sets, names, and numbers.
- **Dropdown sets** — No need to type slugs; set names auto-generate valid slugs and set numbers.
- **Current Market Prices** — Displays real-time scraped data for Ungraded & graded conditions.
- **Trend Analysis** — Historical vs. predicted trends plotted clearly.
- **Trading Recommendations** — Shows forecasted % change, suggested action, and disclaimers.

---

## ⚙️ Tech Stack

- **React 18** + **TypeScript**
- **Chart.js** / **Recharts** for graphs
- **Tailwind CSS** (or your styling framework)
- **Axios / Fetch** for calling the FastAPI `/predict` endpoint
- **Lucide React** for icons

---

## 📦 Setup & Run

```bash
# Install dependencies
npm install
```

### ⚙️ Update your API endpoint

By default, this frontend is connected to **Gavin's hosted API**.  
To connect to your own backend:

- Open `src/api/api.ts`
- Change the `API_BASE_URL` value to your own FastAPI deployment URL.

Example:
```ts
export const API_BASE_URL = "https://your-backend-url.up.railway.app";
```

You can also use an `.env`:
```env
VITE_API_URL=https://your-backend-url.up.railway.app
```

### ✅ Start the app

```bash
npm run dev
```

Visit `http://localhost:5173` (or the Vite dev URL) and test your predictions.

---

## 🔗 How It Connects

1️⃣ **User searches for a card**  
2️⃣ React sends a GET request to `/predict` on your FastAPI backend  
3️⃣ Backend returns JSON with:
   - Fresh scrape check
   - Current + historical prices
   - Prophet predictions
   - Image URL

4️⃣ Frontend displays:
   - Card image & ID
   - Freshness status
   - Current prices
   - Historical & forecast charts
   - Buy/Sell outlook

---

## 📷 Screenshots

Set drop down picker

<img width="583" height="651" alt="image" src="https://github.com/user-attachments/assets/3afba6fa-309a-47d8-850b-f0d8213cc0a7" />

Card detail card with returned information
<img width="951" height="587" alt="image" src="https://github.com/user-attachments/assets/dd7129a6-9325-4a77-8f02-9315a4dd95d6" />


---

## 📝 Note

**API Required:**  
This frontend requires your [Pokélyzer FastAPI backend](https://github.com/Yellowjersey/Pokelyzer.git).  
Clone and deploy both repos for full functionality.

---

## 🤝 Author

Built by **Gavin Bradford**  
📫 bradfordgavin@gmail.com | [LinkedIn](https://www.linkedin.com/in/gavin-bradford-ab2566123/) | [GitHub](https://github.com/Yellowjersey)

---

## ⚡️ Quick Start

✅ Clone ➜ `npm install` ➜ update `api.ts` ➜ `npm run dev`  
✅ Search for a card ➜ See real-time predictions ➜ Make smarter trades!

---

## ⭐️ Pro Tip

If you like this, please ⭐️ **Star the repo!**  
Your feedback helps improve it for everyone.

