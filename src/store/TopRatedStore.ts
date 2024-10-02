import { create } from "zustand";
import { apiKey, apiUrl } from "./url";
import axios from "axios";

const topRatedStore = create((set) => ({
    top: null,
    fetchTop: async () => {
        try {
            const url = `${apiUrl}movie/top_rated?language=ru-RU&api_key=${apiKey}`
            const response = await axios.get(url)
            let top20 = response.data.results
            let top10 = []
            for (let i = 0; i < 10; i++) {
                top10.push(top20[i])
            }
            set({ top: top10 })
        } catch (error) {
            console.error('Произошла ошибка в TopRated', error);
        }
    }
}))
export const selectTop = (state) => state.top
export default topRatedStore