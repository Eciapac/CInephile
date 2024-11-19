import { create } from "zustand";
import { apiKey, apiUrl } from "./url";
import axios from "axios";
const popularStore = create((set) => ({
    popularMovies: [],
    popularTvs: [],
    fetchPopular: async (type, currentPage) => {
        try {
            const url = `${apiUrl}${type}/popular?adult=false&language=ru-RU&api_key=${apiKey}&page=${currentPage}`
            const response = await axios.get(url)
            if (type === 'movie') set({ popularMovies: response.data.results })
            else set({ popularTvs: response.data.results })
        } catch (error) {
            console.error('Произошла ошибка в Popular', error);
        }
    }
}))
export const selectPopularMovies = (state) => state.popularMovies
export const selectPopularTvs = (state) => state.popularTvs
export default popularStore