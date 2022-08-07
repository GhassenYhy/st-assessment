<template>
  <div class="filtering-sections-container">
    <SearchSection
      :list="booksState.books"
      :autocomplete-list="booksState.booksAutocomplete"
      :headerTitle="'Books'"
      :tableHeaders="['Title', 'Author']"
      focused-input
      @updateAutocompleteList="updateBooksAutocompleteList"
      @updateList="updateBooksList"
      @clearSearch="clearSearch"
      @search="search"
    />

    <SearchSection
      :list="citiesState.cities"
      :autocomplete-list="citiesState.citiesAutocomplete"
      :tableHeaders="['City name']"
      :headerTitle="'Cities'"
      @updateAutocompleteList="updateCities"
    />
  </div>
</template>

<script lang="ts" setup>
// Imports
import SearchSection from "../components/base/SearchSection";
import { onMounted } from "vue";
import { useCitiesStore } from "@/store/cities";
import { useBooksStore } from "@/store/books";
import { storeToRefs } from "pinia";
import booksData from "../data/books";
import citiesData from "../data/cities";

const booksStore = useBooksStore();
const citiesStore = useCitiesStore();

const { state: booksState } = storeToRefs(booksStore);
const { fetchBooksAutocompleteList, setBooksList, fetchBooksList } = booksStore;

const { state: citiesState } = storeToRefs(citiesStore);
const { fetchCities, setCitiesList } = citiesStore;

const updateBooksAutocompleteList = (query: string) => {
  fetchBooksAutocompleteList(query);
};

const updateBooksList = (element: string) => {
  fetchBooksList(element);
  fetchBooksAutocompleteList("");
};
const updateCities = (query: string) => {
  fetchCities(query);
};
const clearSearch = () => {
  setBooksList(booksData);
};
const search = (query: string) => {
  fetchBooksList(query);
};

onMounted(() => {
  setBooksList(booksData);
  setCitiesList(citiesData);
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.filtering-sections-container {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-items: center;
  justify-content: center;
  > * {
    margin: 20px;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    > * {
      margin-left: 0;
      margin-right: 0;
      padding: 25px;
      max-width: 100%;
    }
  }
}
</style>
