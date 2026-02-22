import pickle
import requests
import json
import time
from movies import MovieRecommender


def fetch_movie_details():
    movie_recommender = MovieRecommender()
    movies = movie_recommender.movies["imdb_id"].tolist()[:50]
    top_50_movies = {}

    print(f"Starting to fetch details for {len(movies)} movies...")

    for i, imdb_id in enumerate(movies):
        try:
            url = f"https://www.omdbapi.com/?i={imdb_id}&apikey=58c28e66"
            response = requests.get(url)

            if response.status_code == 200:
                movie_data = response.json()
                if movie_data.get('Response') == 'True':  # OMDB API success response
                    top_50_movies[imdb_id] = movie_data
                    print(f"✓ Fetched details for {imdb_id} ({i+1}/{len(movies)})")
                else:
                    print(f"✗ No data found for {imdb_id}: {movie_data.get('Error', 'Unknown error')}")
            else:
                print(f"✗ HTTP error {response.status_code} for {imdb_id}")

            # Sleep to avoid rate limiting (OMDB free tier allows ~1000 requests/day)
            time.sleep(0.2)  # 200ms delay between requests

        except Exception as e:
            print(f"✗ Error fetching {imdb_id}: {str(e)}")
            continue

    # Save to JSON file
    with open("movie_details.json", "w", encoding='utf-8') as f:
        json.dump(top_50_movies, f, indent=2, ensure_ascii=False)

    print(f"\nCompleted! Saved {len(top_50_movies)} movie details to movie_details.json")

if __name__ == "__main__":
    fetch_movie_details()

