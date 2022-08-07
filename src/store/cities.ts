import { defineStore } from "pinia";
import citiesData from "../data/cities";
import { reactive } from "vue";
import { ICitiesState } from "@/types/common";

export const useCitiesStore = defineStore("cities", () => {
  const state = reactive<ICitiesState>({
    cities: [],
    citiesAutocomplete: [],
  });

  // Fetches and updates the autocomplete list of cities in the store based on the provided query
  const fetchCitiesAutocompleteList = (query: string) => {
    if (!query) return (state.citiesAutocomplete = []);
    state.citiesAutocomplete = citiesData.filter((city) =>
      city.toLowerCase().startsWith(query.toLowerCase())
    );
  };

  // Fetches and updates the list of cities in the store based on the provided query
  const fetchCitiesList = (query: string) => {
    state.cities = citiesData.filter((city) =>
      city.toLowerCase().startsWith(query.toLowerCase())
    );
  };

  // Sets
  const setCitiesList = (citiesList: string[]) => {
    state.cities = citiesList;
  };

  return { state, fetchCitiesAutocompleteList, fetchCitiesList, setCitiesList };
});
