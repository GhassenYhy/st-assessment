import { useBooksStore } from "@/store/books";
import { createPinia, setActivePinia } from "pinia";
import booksData from "@/data/books";

describe("Books Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("Set booksData in the store", () => {
    const booksStore = useBooksStore();
    expect(booksStore.state.books).toStrictEqual([]);
    booksStore.setBooksList(booksData);
    expect(booksStore.state.books.length).toStrictEqual(booksData.length);
  });

  it("Autocomplete with matching data", () => {
    const booksStore = useBooksStore();
    const element = booksData[0].title.slice(0, 3);
    expect(booksStore.state.books).toStrictEqual([]);
    booksStore.setBooksList(booksData);
    booksStore.fetchBooksAutocompleteList(element);
    expect(booksStore.state.booksAutocomplete.length).toBeGreaterThan(0);
  });

  it("Autocomplete with non matching data", () => {
    const booksStore = useBooksStore();
    expect(booksStore.state.books).toStrictEqual([]);
    booksStore.setBooksList(booksData);
    booksStore.fetchBooksAutocompleteList("test");
    expect(booksStore.state.booksAutocomplete.length).toStrictEqual(0);
  });
});
