import React from 'react';
import {FlatList} from 'react-native';
import {
  API,
  SEARCH_LENGTH_LIMIT,
  BOOK_TITLE_LENGTH,
  BOOK_LIST_COLUMNS,
  SEARCH_LIMIT,
} from '../../configs/appConfig';
import styles, {
  BookContainer,
  BooksSeparator,
  BookDetailsContainer,
} from './styles';
import {_Image as Poster, Error, ListFooterLoader, Rating} from '..';
import {_Text} from '../../styles/styles';
import {FONTS_TYPE} from '../../constants/fonts';
import Language from '../../language/en.json';
import StaticImage from '../../assets/icons';

type Props = {
  searchData: any;
  navigation: any;
  searchPhrase: string;
  setLoadMore: (value: boolean) => void;
  loadMore: boolean;
  fromHome?: boolean;
};

const BookList: React.FC<Props> = ({
  searchData,
  navigation,
  searchPhrase,
  setLoadMore,
  loadMore,
  fromHome,
}) => {
  const _renderBooks = (item: any) => {
    const {title, coverID, year, ratingAverage, author} = item;
    const bookTitle =
      title?.length > BOOK_TITLE_LENGTH
        ? title.substring(0, 20) + ' ...'
        : title;
    return (
      <BookContainer
        onPress={() => {
          const screenName = fromHome ? 'HomeBookDetails' : 'Details';
          navigation.push(screenName, {item});
        }}>
        <Poster
          imageUrl={
            coverID ? `${API.poster}${coverID}-M.jpg?default=false ` : null
          }
          imageStyle={styles.booksImage}
          staticImageData={!coverID ? StaticImage?.notFound : null}
        />
        <BookDetailsContainer>
          <_Text textAlign={'left'} fontFamily={FONTS_TYPE.semiBold}>
            {bookTitle}
          </_Text>
          <_Text textAlign={'left'} fontSize={12} paddingTop={2}>
            Author: {author}
          </_Text>
          <_Text textAlign={'left'} fontSize={12} paddingTop={2}>
            Rating: {ratingAverage}
          </_Text>
          <Rating
            containerStyle={styles?.AirbnbRating}
            rating={ratingAverage}
            size={15}
          />
          <_Text textAlign={'left'} fontSize={12} paddingTop={2}>
            Publish: {year}
          </_Text>
        </BookDetailsContainer>
      </BookContainer>
    );
  };

  const emptyComponents = () => {
    const {notFound, bookSearch} = StaticImage;
    const isSearched: boolean = searchPhrase?.length > SEARCH_LENGTH_LIMIT;
    const errorText: string = isSearched
      ? Language?.noSearchedBooksFound
      : Language?.searchAndEnjoy;
    const imageUrl: any = isSearched ? notFound : bookSearch;
    const imageStyle: any = isSearched ? false : styles?.enjoyBooksImage;

    return (
      <Error
        errorText={errorText}
        imageUrl={imageUrl}
        imageStyle={imageStyle}
      />
    );
  };

  return (
    <FlatList
      data={searchData}
      numColumns={BOOK_LIST_COLUMNS}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      renderItem={({item}) => _renderBooks(item)}
      keyExtractor={item => item?.id}
      extraData={searchData}
      ItemSeparatorComponent={() => <BooksSeparator />}
      ListEmptyComponent={() => emptyComponents()}
      contentContainerStyle={styles?.BookContentContainer}
      onEndReachedThreshold={0.01}
      onEndReached={() => {
        if (searchData?.length > SEARCH_LIMIT - 1) {
          setLoadMore(true);
        }
      }}
      ListFooterComponent={() => (
        <ListFooterLoader size="small" loadMore={loadMore} />
      )}
      ListFooterComponentStyle={styles.footerLoaderContainer}
    />
  );
};

export default BookList;
