import pickle
import pandas as pd

def test_load_movies():
    movies = pickle.load(open('./jupyter/movies.pkl', 'rb'))
    movies = pd.DataFrame(movies)
    print(movies.head())

if __name__ == "__main__":
    test_load_movies()