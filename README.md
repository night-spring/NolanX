# ◆ NolanX
<img width="1919" height="1089" alt="image" src="NolanX.png"/>

> **AI-powered movie discovery.** Browse thousands of films, click one, and get instant content-based recommendations — no accounts, no ratings, no noise.

NolanX is a full-stack movie recommendation app built with React and FastAPI. It uses TF-IDF vectorization and cosine similarity to analyze movie metadata — genres, cast, keywords, and overview — and surfaces the 20 most similar films for any movie you pick. The goal was to build something that feels fast, looks good, and actually works without needing user history or sign-ins.

![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.129-009688?style=flat-square&logo=fastapi)
![scikit-learn](https://img.shields.io/badge/scikit--learn-1.8-f7931e?style=flat-square&logo=scikitlearn)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss)

---

## What it does

1. **Browse** a shuffled catalogue of movies (different order every visit)
2. **Search** by title — results filter live as you type
3. **Click any movie** to see its full details + backdrop
4. **Get 20 AI recommendations** instantly, ranked by content similarity

---

## How the recommendation works

```
Movie tags (title + genres + cast + keywords + overview)
        │
        ▼
  TF-IDF Vectorizer
  (10,000 features, unigrams + bigrams, English stop words removed)
        │
        ▼
  Cosine Similarity matrix  ←─── query movie vector
        │
        ▼
  Top 20 most similar movies (excluding itself)
```

No user data. No collaborative filtering. Pure content — fast and explainable.

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, React Router v7, Tailwind CSS |
| Backend | FastAPI, Uvicorn |
| ML | scikit-learn (TF-IDF + cosine similarity) |
| Data | pandas, NumPy, SciPy |
| Movie images | TMDB Image API |

---

## Project structure

```
NolanX/
├── backend/
│   ├── main.py          # FastAPI app + route definitions
│   ├── movies.py        # MovieRecommender class (TF-IDF model)
│   ├── movies.pkl       # Pre-processed movie dataset
│   └── requirements.txt
│
├── frontend/
│   └── src/
│       ├── config.js              # ← single place to set backend URL
│       ├── App.js
│       └── components/
│           ├── Header.js          # Fixed nav, anime eye logo, search
│           ├── HomePage.js        # Movie grid with hero section
│           ├── MovieCard.js       # Individual card with hover overlay
│           ├── MovieGrid.js       # Responsive grid layout
│           ├── MovieDetailsPage.js # Full detail + recommendations
│           ├── LoadingPage.js     # Skeleton card grid
│           ├── ErrorPage.js       # Error / not found state
│           ├── Pagination.js      # Page navigation
│           ├── search.js          # URL-param driven search
│           └── ScrollToTop.js     # Resets scroll on navigation
│
└── jupyter/
    └── preprocess.ipynb   # Dataset cleaning + tag generation
```

---

## API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/movies/` | All movies (shuffled) |
| `GET` | `/movies/{imdb_id}` | Single movie details |
| `GET` | `/recommend/{imdb_id}` | Top 20 recommendations |

---

## Quick start

### Backend
```bash
cd backend
uv run uvicorn main:app --reload
# running at http://127.0.0.1:8000
```

### Frontend
```bash
cd frontend
npm install
npm start
# running at http://localhost:3000
```

### Deploying?

Update one line in `frontend/src/config.js`:
```js
const API_BASE_URL = 'https://your-deployed-api.com';
```

---

## Data pipeline

Raw TMDB dataset → `jupyter/preprocess.ipynb` → cleaned `movies.pkl`

The notebook handles:
- Merging cast, crew, keywords, genres into a single `tags` field
- Normalising text (lowercase, stemming)
- Serialising the final DataFrame to `movies.pkl`

---

<p align="center">Built with React + FastAPI + scikit-learn</p>
