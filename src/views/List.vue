<template>
  <div class="filtering-sections-container">
    <n-card class="card">
      <h2>Books</h2>
      <n-divider />
      <n-space justify="space-between">
        <StInput
          :list="booksState.books"
          :autocomplete-list="booksState.booksAutocomplete"
          v-model="booksInputValue"
          focused-input
          @updateAutocompleteList="updateBooksAutocompleteList"
          @updateList="updateBooksList"
        ></StInput>
        <n-space>
          <n-button :disabled="booksInputValue.length < 3" @click="searchBooks"
            >Search</n-button
          >
          <n-button type="warning" @click="clearSearchBooks"> Reset </n-button>
        </n-space>
      </n-space>
      <n-divider />
      <StTable
        :list="booksState.books"
        :tableHeaders="['Title', 'Author']"
      ></StTable>
    </n-card>

    <n-card class="card">
      <h2>Cities</h2>
      <n-divider />
      <n-space justify="space-between">
        <StInput
          :list="citiesState.cities"
          :autocomplete-list="citiesState.citiesAutocomplete"
          v-model="citiesInputValue"
          @updateAutocompleteList="updateCitiesAutocompleteList"
          @updateList="updateCitiesList"
        ></StInput>
        <n-space>
          <n-button
            :disabled="citiesInputValue.length < 3"
            @click="searchCities"
            >Search</n-button
          >
          <n-button type="warning" @click="clearSearchCities"> Reset </n-button>
        </n-space>
      </n-space>
      <n-divider />
      <StTable
        :list="citiesState.cities"
        :tableHeaders="['City name']"
      ></StTable>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
// Imports
import StInput from "../components/st-input";
import StTable from "../components/st-table";
import { onMounted, ref } from "vue";
import { useCitiesStore } from "@/store/cities";
import { useBooksStore } from "@/store/books";
import { storeToRefs } from "pinia";

// Data imports
import booksData from "../data/books";
import citiesData from "../data/cities";

// Books data properties
const booksInputValue = ref<string>("");
const booksStore = useBooksStore();
const { state: booksState } = storeToRefs(booksStore);
const { fetchBooksAutocompleteList, setBooksList, fetchBooksList } = booksStore;

// Books methods
const updateBooksAutocompleteList = (query: string) => {
  fetchBooksAutocompleteList(query);
};
const updateBooksList = (element: string) => {
  fetchBooksList(element);
  fetchBooksAutocompleteList("");
};
const clearSearchBooks = () => {
  booksInputValue.value = "";
  setBooksList(booksData);
};
const searchBooks = () => {
  fetchBooksList(booksInputValue.value);
  fetchBooksAutocompleteList("");
};

// Cities data properties
const citiesInputValue = ref<string>("");
const citiesStore = useCitiesStore();
const { state: citiesState } = storeToRefs(citiesStore);
const { fetchCitiesAutocompleteList, setCitiesList, fetchCitiesList } =
  citiesStore;

// Cities methods
const updateCitiesAutocompleteList = (query: string) => {
  fetchCitiesAutocompleteList(query);
};
const updateCitiesList = (query: string) => {
  fetchCitiesList(query);
  fetchCitiesAutocompleteList("");
};
const clearSearchCities = () => {
  citiesInputValue.value = "";
  setCitiesList(citiesData);
};
const searchCities = () => {
  fetchCitiesList(citiesInputValue.value);
  fetchCitiesAutocompleteList("");
};

// Lifecycle hooks
onMounted(() => {
  setBooksList(booksData);
  setCitiesList(citiesData);
});
</script>

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
.card {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  max-width: 500px;
  height: fit-content;
  @media (max-width: 768px) {
    align-self: center;
  }
}
</style>
