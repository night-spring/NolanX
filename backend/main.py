from fastapi import FastAPI
from movies import MovieRecommender

app = FastAPI()

movie_recommender = MovieRecommender()
movies = movie_recommender.movies
vectors = movie_recommender.vectors
recommend = movie_recommender.recommend

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.get("/movies/")
async def get_all_movies():
    return {"movies": movies[["imdb_id", "original_title"]].to_dict(orient='records')}

@app.get("/movies/{imdb_id}")
async def get_movies(imdb_id: str):
    movie = movies[movies['imdb_id'] == imdb_id].iloc[0]
    return {"movie_title": movie.original_title}

@app.get("/recommend/{imdb_id}")
async def recommend_movies(imdb_id: str):
    movie_title = movies[movies['imdb_id'] == imdb_id].iloc[0]['original_title']
    top_movies = recommend(movie_title)
    return {"recommended_movies": top_movies}