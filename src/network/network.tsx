import {API, SEARCH_LIMIT} from '../configs/appConfig';

export type ResponseProps = {
  success: number;
  data: any;
};

export const searchBooks = async (books: string, page: number) => {
  const result: ResponseProps = {success: 1, data: ''};
  try {
    const res = await fetch(
      `${API?.searchByName}${books}&limit=${SEARCH_LIMIT}&page=${page}`,
    );
    const booksList: any = await res.json();
    result.data = booksList.docs.map((booksDetails: any, index: number) => ({
      id: booksDetails?.key,
      title: booksDetails?.title_sort,
      isbn: booksDetails?.isbn?.length > 0 ? booksDetails?.isbn[0] : undefined,
      year: booksDetails?.first_publish_year,
      ratingAverage:
        booksDetails?.ratings_average || booksDetails?.currently_reading_count,
    }));
  } catch (error) {
    result.success = 0;
    result.data = error;
  } finally {
    return result;
  }
};
