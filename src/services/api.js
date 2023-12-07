import axios from 'axios';

const chuckNorrisApi = axios.create({
  baseURL: 'http://localhost:3001/api/chuck-norris',
});

export const getCategories = async () => {
  const response = await chuckNorrisApi.get('/categories');
  return response.data;
};

export const getRandomJoke = async () => {
    const response = await chuckNorrisApi.get(`/jokes`);
    return response.data;
};

export const getJokesByCategory = async (category) => {
  const response = await chuckNorrisApi.get(`/jokes${category ? `?category=${category}` : ''}`);
  return response.data;
};

export const searchJokes = async (query, page = 1) => {
  const response = await chuckNorrisApi.get(`/jokes?query=${query}`);
  return response.data;
};
