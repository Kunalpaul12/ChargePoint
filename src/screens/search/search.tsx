import React, {useState, useEffect, useRef} from 'react';
import {FlatList} from 'react-native';
import {Container, InnerContainer, _Text} from '../../styles/styles';
import {SearchBar} from '../../components';
import styles, {
  SearchWrapper,
  BookContainer,
  BooksSeparator,
  BookDetailsContainer,
} from './styles';
import {
  API,
  SEARCH_LENGTH_LIMIT,
  DEBOUNCING_TIME,
  BOOK_TITLE_LENGTH,
  BOOK_LIST_COLUMNS,
  SEARCH_LIMIT,
} from '../../configs/appConfig';
import {
  _Image as Poster,
  Loader,
  Error,
  ListFooterLoader,
} from '../../components';
import Language from '../../language/en.json';
import StaticImage from '../../assets/icons';
import {searchBooks} from '../../network/network';
import {FONTS_TYPE} from '../../constants/fonts';

type Props = {
  navigation: any;
};

const Search: React.FC<Props> = ({navigation}) => {
  const [searchPhrase, setSearchPhrase] = useState<string>('');
  const [clicked, setClicked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<any>([]);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  let pageRef = useRef<number>(1);

  useEffect(() => {
    const shouldSearch = searchPhrase?.length > SEARCH_LENGTH_LIMIT;
    if (shouldSearch) {
      setLoading(true);
    }
    const searchTimer = setTimeout(() => {
      if (shouldSearch) {
        setSearchData([]);
        pageRef.current = 1;
        searchCall();
      }
    }, DEBOUNCING_TIME);
    return () => clearTimeout(searchTimer);
  }, [searchPhrase]);

  useEffect(() => {
    if (loadMore) {
      pageRef.current = pageRef.current + 1;
      searchCall();
    }
  }, [loadMore]);

  const searchCall = async () => {
    if (error) {
      setError(false);
    }
    if (!loading && !loadMore) {
      setLoading(true);
    }
    const res = await searchBooks(searchPhrase, pageRef.current);
    const success: number = res?.success;
    if (success) {
      loadMore
        ? setSearchData(preState => [...preState, ...res?.data])
        : setSearchData(res?.data);
    } else {
      setError(true);
    }
    loadMore ? setLoadMore(false) : setLoading(false);
  };

  const listBooks = () => {
    const _renderBooks = (item: any) => {
      const {title, isbn, year, ratingAverage} = item;
      const bookTitle =
        title?.length > BOOK_TITLE_LENGTH
          ? title.substring(0, 20) + ' ...'
          : title;
      return (
        <BookContainer>
          <Poster
            imageUrl={`${API.poster}${isbn}-M.jpg`}
            imageStyle={styles.booksImage}
          />
          <BookDetailsContainer>
            <_Text textAlign={'left'} fontFamily={FONTS_TYPE.semiBold}>
              {bookTitle}
            </_Text>
            <_Text textAlign={'left'} fontSize={12}>
              Rating:{' '}
              {Number(isNaN(ratingAverage) ? 0 : ratingAverage).toFixed(2)}
            </_Text>
            <_Text textAlign={'left'} fontSize={12}>
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

  return (
    <Container>
      <InnerContainer>
        <SearchWrapper>
          <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
          />
        </SearchWrapper>
        {loading && searchPhrase.length > SEARCH_LENGTH_LIMIT && (
          <Loader size="large" loadingText={Language?.searchingBooks} />
        )}
        {!loading && listBooks()}
      </InnerContainer>
    </Container>
  );
};

export default Search;
