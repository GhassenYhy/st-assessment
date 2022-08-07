import { defineStore } from "pinia";
import citiesData from "../data/cities";
import { reactive } from "vue";
import { ICitiesState } from "@/types/common";

export const useCitiesStore = defineStore("cities", () => {
  const state = reactive<ICitiesState>({
    cities: [],
    citiesAutocomplete: [],
  });

  const fetchCities = (query: string) => {
    state.citiesAutocomplete = citiesData.filter((city) =>
      city.toLowerCase().startsWith(query.toLowerCase())
    );
  };

  const setCitiesList = (citiesList: string[]) => {
    state.cities = citiesList;
  };

  return { state, fetchCities, setCitiesList };
});
