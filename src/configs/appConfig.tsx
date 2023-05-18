const apiBase: string = 'https://openlibrary.org';
const apiBaseCover: string = 'https://covers.openlibrary.org';

export const SEARCH_LENGTH_LIMIT = 2;
export const DEBOUNCING_TIME = 1000;
export const BOOK_TITLE_LENGTH = 20;
export const SEARCH_LIMIT = 10;
export const RANDOM_SEARCH_LIMIT = 50;
export const BOOK_LIST_COLUMNS = 2;
export const HEADER_TITLE_LENGTH_LIMIT = 30;
export const AUTHOR_BOOKS_KEY_SEARCH_LIMIT = 2;
export const ANDROID_SWITCH_SCALE = 1.4;
export const IOS_SWITCH_SCALE = 1;
export const API_FIELDS = encodeURI(
  'fields=key,title,cover_i,first_publish_year,edition_count,contributor,ratings_average,title_sort,language,author_name',
);
export const AUTHOR_API_FIELDS = encodeURI('fields=key');

export const API: any = {
  searchByAuthor: apiBase + '/search/authors.json?q=',
  searchByName: apiBase + '/search.json?title=',
  poster: apiBaseCover + '/b/id/',
  random: apiBase + `/search.json?q=has_fulltext:true&${API_FIELDS}`,
  author: apiBase + `/search/authors.json?q=`,
  authorBook:
    apiBase +
    `/search.json?${API_FIELDS}&limit=${AUTHOR_BOOKS_KEY_SEARCH_LIMIT}`,
};
