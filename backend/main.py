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
    movies_list = movie_recommender.get_all_movies()
    return {"movies": movies_list}

@app.get("/movies/{imdb_id}")
async def get_movies(imdb_id: str):
    movie = movies[movies['imdb_id'] == imdb_id].to_dict(orient='records')[0]
    return movie

@app.get("/recommend/{imdb_id}")
async def recommend_movies(imdb_id: str):
    top_movies = recommend(imdb_id)
    return {"recommended_movies": top_movies}