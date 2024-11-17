import { create } from "zustand";
import { apiKey, apiUrl } from "./url";
import axios from "axios";
const actorsStore = create((set) => ({
    movieActors: null,
    tvActors: null,
    fetchActors: async (type, id, count) => {
        try {
            const url = `${apiUrl}${type}/${id}/credits?language=ru-RU&api_key=${apiKey}`
            const response = await axios.get(url)
            const actors = response.data.cast.slice(0, count)
            if (type === 'movie') set({ movieActors: actors })
            else set({ tvActors: actors })
        } catch (error) {
            console.error('Произошла ошибка в Actors', error);
        }
    }
}))
export const selectMovieActors = (state) => state.movieActors
export const selectTvActors = (state) => state.tvActors
export default actorsStore