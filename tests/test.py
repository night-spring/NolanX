import pickle
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent))
import pandas as pd
from backend.movies import MovieRecommender

def test_load_movies():
    movies_recommender = MovieRecommender()
    movies = movies_recommender.top_50_movies()
    print(movies)  

if __name__ == "__main__":
    test_load_movies()