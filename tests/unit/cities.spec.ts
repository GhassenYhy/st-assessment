import { useCitiesStore } from "@/store/cities";
import { createPinia, setActivePinia } from "pinia";
import citiesData from "@/data/cities";

describe("Cities Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("Set citiesData in the store", () => {
    const citiesStore = useCitiesStore();
    expect(citiesStore.state.cities).toStrictEqual([]);
    citiesStore.setCitiesList(citiesData);
    expect(citiesStore.state.cities.length).toStrictEqual(citiesData.length);
  });

  it("Autocomplete with matching data", () => {
    const citiesStore = useCitiesStore();
    const element = citiesData[0].slice(0, 3);
    expect(citiesStore.state.cities).toStrictEqual([]);
    citiesStore.setCitiesList(citiesData);
    citiesStore.fetchCitiesAutocompleteList(element);
    expect(citiesStore.state.citiesAutocomplete.length).toBeGreaterThan(0);
  });

  it("Autocomplete with non matching data", () => {
    const citiesStore = useCitiesStore();
    expect(citiesStore.state.cities).toStrictEqual([]);
    citiesStore.setCitiesList(citiesData);
    citiesStore.fetchCitiesAutocompleteList("test");
    expect(citiesStore.state.citiesAutocomplete.length).toStrictEqual(0);
  });
});
