import { create } from "zustand";
import { apiKey, apiUrl } from "./url";
import axios from "axios";
const videosStore = create((set) => ({
    videoMovie: null,
    videoTv: null,
    fetchVideos: async (type, id) => {
        try {
            const url = `${apiUrl}${type}/${id}/videos?language=ru-RU&api_key=${apiKey}`
            const response = await axios.get(url)
            set({videoMovie: null, videoTv: null})
            if (type === 'movie') set({ videoMovie: response.data.results[0].key })
            else set({ videoTv: response.data.results[0].key })
        } catch (error) {
            console.error('Произошла ошибка в Videos', error);
        }
    }
}))
export const selectVideoMovie = (state) => state.videoMovie
export const selectVideoTv    = (state) => state.videoTv
export default videosStore