import {
  API,
  SEARCH_LIMIT,
  API_FIELDS,
  RANDOM_SEARCH_LIMIT,
} from '../configs/appConfig';

export type ResponseProps = {
  success: number;
  data: any;
};

const sortBooks = (booksList: any, page: number) => {
  return booksList.docs.map((booksDetails: any) => ({
    id: booksDetails?.key + page,
    title: booksDetails?.title_sort,
    coverID: booksDetails?.cover_i,
    year: booksDetails?.first_publish_year,
    ratingAverage: Number(
      isNaN(booksDetails?.ratings_average) ? 0 : booksDetails?.ratings_average,
    ).toFixed(1),
    language:
      booksDetails?.language?.length > 0 ? booksDetails?.language : null,
    contributor:
      booksDetails?.contributor?.length > 0 ? booksDetails?.contributor : null,
  }));
};

export const searchBooks = async (books: string, page: number) => {
  const result: ResponseProps = {success: 1, data: ''};
  try {
    const res = await fetch(
      `${API?.searchByName}${books}&limit=${SEARCH_LIMIT}&page=${page}&${API_FIELDS}`,
    );
    const booksList: any = await res.json();
    result.data = sortBooks(booksList, page);
  } catch (error) {
    result.success = 0;
    result.data = error;
  } finally {
    return result;
  }
};

export const searchRandomBooks = async (page: number) => {
  const result: ResponseProps = {success: 1, data: ''};
  try {
    const res = await fetch(
      `${API?.random}&limit=${RANDOM_SEARCH_LIMIT}&offset=${page}`,
    );
    const booksList: any = await res.json();
    result.data = sortBooks(booksList, page);
  } catch (error) {
    result.success = 0;
    result.data = error;
  } finally {
    return result;
  }
};
