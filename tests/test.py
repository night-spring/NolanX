import pickle
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent))
import pandas as pd
from backend.movies import MovieRecommender

def test_load_movies():
    movies_recommender = MovieRecommender()
    movies = movies_recommender.get_all_movies()
    print(movies)  

def test_recommend_movies():
    movies_recommender = MovieRecommender()
    movies = movies_recommender.get_all_movies()
    imdb_id = movies[0]['imdb_id']
    recommendations = movies_recommender.recommend(imdb_id)
    print(recommendations)

if __name__ == "__main__":
    test_recommend_movies()