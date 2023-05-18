import React, {useState, useRef, useEffect} from 'react';
import {Container, InnerContainer, _Text} from '../../styles/styles';
import {Loader} from '../../components';
import Language from '../../language/en.json';
import {searchRandomBooks} from '../../network/network';
import {BookList, _Image} from '../../components';
import styles, {HeaderContainer} from './styles';
import StaticImage from '../../assets/icons';
import {FONTS_TYPE} from '../../constants/fonts';

type Props = {
  navigation: any;
};

const Home: React.FC<Props> = ({navigation}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<any>([]);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  let pageRef = useRef<number>(1);

  useEffect(() => {
    searchCall();
  }, []);
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
    const res = await searchRandomBooks(pageRef.current);
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
        <HeaderContainer>
          <_Image
            imageStyle={styles?.booksImage}
            staticImageData={StaticImage?.OpenBook}
          />
          <_Text
            textAlign={'left'}
            fontFamily={FONTS_TYPE.semiBold}
            paddingLeft={15}>
            {Language?.OpenLibrary}
          </_Text>
        </HeaderContainer>

        {loading && (
          <Loader size="large" loadingText={Language?.searchingBooks} />
        )}
        {!loading && (
          <BookList
            searchData={searchData}
            navigation={navigation}
            setLoadMore={setLoadMore}
            searchPhrase={''}
            loadMore={loadMore}
          />
        )}
      </InnerContainer>
    </Container>
  );
};

export default Home;
