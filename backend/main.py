from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from movies import MovieRecommender

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

movie_recommender = MovieRecommender()
movies = movie_recommender.movies
vectors = movie_recommender.vectors
recommend = movie_recommender.recommend

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.get("/movies/")
async def get_all_movies():
    movie_details = movie_recommender.top_50_movies()
    formatted_movies = []
    for imdb_id, details in movie_details.items():
        # Extract IMDb rating and convert to numeric value
        imdb_rating = details.get("imdbRating", "N/A")
        try:
            rating_float = float(imdb_rating)
        except:
            rating_float = 0
        
        formatted_movies.append({
            "imdb_id": imdb_id,
            "original_title": details.get("Title", "Unknown"),
            "poster_path": details.get("Poster", ""),
            "imdbRating": imdb_rating,
            "imdbRatingFloat": rating_float,
            "year": details.get("Year", "N/A"),
            "plot": details.get("Plot", "No plot available"),
            "ratings": details.get("Ratings", [])
        })
    return {"movies": formatted_movies}

@app.get("/movies/{imdb_id}")
async def get_movies(imdb_id: str):
    movie = movies[movies['imdb_id'] == imdb_id].iloc[0]
    return {"movie_title": movie.original_title}

@app.get("/recommend/{imdb_id}")
async def recommend_movies(imdb_id: str):
    movie_title = movies[movies['imdb_id'] == imdb_id].iloc[0]['original_title']
    top_movies = recommend(movie_title)
    return {"recommended_movies": top_movies}