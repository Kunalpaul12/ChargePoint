import React, {useState, useEffect, useRef} from 'react';
import {Modal} from 'react-native';
import {Container, InnerContainer} from '../../styles/styles';
import {SearchBar, BookList} from '../../components';
import {SearchWrapper} from './styles';
import {SEARCH_LENGTH_LIMIT, DEBOUNCING_TIME} from '../../configs/appConfig';
import {Loader} from '../../components';
import Language from '../../language/en.json';
import {searchBooks, searchAuthorBooks} from '../../network/network';
import {FilterModal} from './components';

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
  const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);
  const [searchByName, setSearchByName] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(false);
  let pageRef = useRef<number>(0);

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
  }, [searchPhrase, refresh]);

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
    const res = searchByName
      ? await searchBooks(searchPhrase, pageRef.current)
      : await searchAuthorBooks(searchPhrase, pageRef.current);

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

  return (
    <Container>
      <InnerContainer>
        <Modal
          animationType="slide"
          visible={filterModalVisible}
          transparent={true}>
          <FilterModal
            searchByName={searchByName}
            setSearchByName={setSearchByName}
            setFilterModalVisible={setFilterModalVisible}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        </Modal>
        <SearchWrapper>
          <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
            setFilterModalVisible={setFilterModalVisible}
          />
        </SearchWrapper>
        {loading && searchPhrase.length > SEARCH_LENGTH_LIMIT && (
          <Loader size="large" loadingText={Language?.searchingBooks} />
        )}
        {!loading && (
          <BookList
            searchData={searchData}
            navigation={navigation}
            searchPhrase={searchPhrase}
            setLoadMore={setLoadMore}
            loadMore={loadMore}
          />
        )}
      </InnerContainer>
    </Container>
  );
};

export default Search;
