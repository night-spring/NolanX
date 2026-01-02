import streamlit as st
import pickle
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

def recommend(movie):
    movie_index = movies[movies['title'] == movie].index[0]
    distances = similarity[movie_index]
    sorted_distances = sorted(list(enumerate(distances)), reverse=True, key=lambda x:x[1])
    top_5_idx = [sorted_distances[i][0] for i in range(1,6)]
    top_5 = [movies.iloc[x]['title'] for x in top_5_idx]
    return top_5

movies_dict = pickle.load(open('movies.pkl', 'rb'))
movies = pd.DataFrame(movies_dict)

vectors = movies['vectors']
#similarity = cosine_similarity(vectors)
 
st.title('NolanX - Movie Recommendation System')
selected_movie = st.selectbox('',movies['title'].values)

if st.button('Recommend'):
    #top_5 = recommend(selected_movie)
    for i in range(5):
        #st.write(top_5[i])
        st.write(vectors)
