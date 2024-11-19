import { create } from "zustand";
import { apiKey, apiUrl } from "./url";
import axios from "axios";

const upcomingStore = create((set) => ({
    upcoming: null,
    fetchUpcoming: async () => {
        try {
            const url = `${apiUrl}movie/upcoming?language=ru-RU&api_key=${apiKey}`
            const response = await axios.get(url)
            set({ upcoming: response.data.results })
        } catch (error) {
            console.error('Произошла ошибка в Upcoming', error);
        }
    }
}))
export const selectUpcoming = (state) => state.upcoming
export default upcomingStore