import { defineStore } from "pinia";
import booksData from "../data/books";
import { reactive } from "vue";
import { BookType, IBooksState } from "@/types/common";

export const useBooksStore = defineStore("books", () => {
  const state = reactive<IBooksState>({
    books: [],
    booksAutocomplete: [],
  });

  // Fetches and updates the autocomplete list of books in the store based on the provided query
  const fetchBooksAutocompleteList = (query: string) => {
    if (!query) return (state.booksAutocomplete = []);
    state.booksAutocomplete = booksData.filter((book) =>
      book.title.toLowerCase().startsWith(query.toLowerCase())
    );
  };

  // Fetches and updates the list of books in the store based on the provided query
  const fetchBooksList = (query: string) => {
    state.books = booksData.filter((book) =>
      book.title.toLowerCase().startsWith(query.toLowerCase())
    );
  };

  // Sets the books list in the store
  const setBooksList = (booksList: BookType[]) => {
    state.books = booksList;
  };

  return { state, fetchBooksAutocompleteList, setBooksList, fetchBooksList };
});
