import pickle
import requests
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os
import json

class MovieRecommender:
    def __init__(self):
        try:
            script_dir = os.path.dirname(os.path.abspath(__file__))
            movies_path = os.path.join(script_dir, 'movies.pkl')
            self.movies = pickle.load(open(movies_path, 'rb'))
            self.movies = pd.DataFrame(self.movies)
            self.tfidf = TfidfVectorizer(
                max_features=10000,
                stop_words='english',
                ngram_range=(1,2)
            )
            self.vectors = self.tfidf.fit_transform(self.movies['tags']).toarray()
        except Exception as e:
            print(f"Error loading movies: {e}")
            self.movies = pd.DataFrame()
            self.vectors = None

    def recommend(self, imdb_id: str):
        idx = self.movies[self.movies['imdb_id'] == imdb_id].index[0]
        sim = cosine_similarity(self.vectors[idx].reshape(1, -1), self.vectors)
        top = sorted(list(enumerate(sim[0])), key=lambda x: x[1], reverse=True)[1:11]
        top_movies = []
        for i in top:
            m = self.movies.iloc[i[0]]
            top_movies.append(m.to_dict())
        return top_movies


    def get_all_movies(self):
        return self.movies.to_dict(orient='records')
