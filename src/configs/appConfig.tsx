const apiBase: string = 'https://openlibrary.org';
const apiBaseCover: string = 'https://covers.openlibrary.org';

export const API: any = {
  searchByAuthor: apiBase + '/search/authors.json?q=',
  searchByName: apiBase + '/search.json?title=',
  poster: apiBaseCover + '/b/isbn/',
};

export const SEARCH_LENGTH_LIMIT = 2;
export const DEBOUNCING_TIME = 1000;
export const BOOK_TITLE_LENGTH = 20;
export const SEARCH_LIMIT = 10;
export const BOOK_LIST_COLUMNS = 2;
export const HEADER_TITLE_LENGTH_LIMIT = 30;
