interface BookType extends IListType {
  title: string;
  author: string;
}

interface IListType {
  [key: string]: string;
}

interface IBooksState {
  books: BookType[];
  booksAutocomplete: BookType[];
}

interface ICitiesState {
  cities: string[];
  citiesAutocomplete: string[];
}

export { BookType, IBooksState, ICitiesState, IListType };
