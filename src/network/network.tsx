import {
  API,
  SEARCH_LIMIT,
  API_FIELDS,
  RANDOM_SEARCH_LIMIT,
  AUTHOR_API_FIELDS,
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
    author:
      booksDetails?.author_name?.length > 0
        ? booksDetails?.author_name[0]
        : null,
    cover_edition_key: booksDetails?.cover_edition_key,
    bookKey: booksDetails?.key,
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

export const searchAuthorBooks = async (books: string, page: number) => {
  const result: ResponseProps = {success: 1, data: []};
  try {
    const res = await fetch(
      `${API?.author}${books}&${AUTHOR_API_FIELDS}&limit=${SEARCH_LIMIT}`,
    );
    const authorsKeys: any = await res.json();
    for (let i = 0; i < authorsKeys?.docs?.length; i++) {
      const key = authorsKeys?.docs[i]?.key;
      const authorRes = await fetch(
        `${API?.authorBook}&offset=${page}&author=${key}}`,
      );
      const authorsBooks: any = await authorRes.json();
      result.data = [...result.data, ...sortBooks(authorsBooks, page)];
    }
  } catch (error) {
    result.success = 0;
    result.data = error;
  } finally {
    return result;
  }
};

export const bookDetails = async (workKey: string) => {
  const result: ResponseProps = {success: 1, data: []};
  try {
    const res = await fetch(`${API?.bookDetail}${workKey}.json`);
    const booksDetailsJson: any = await res.json();
    result.data = {
      description: booksDetailsJson?.description?.value,
      subjects: booksDetailsJson?.subjects,
    };
  } catch (error) {
    result.success = 0;
    result.data = error;
  } finally {
    return result;
  }
};
