import React, {useState, useEffect, useCallback} from 'react';
import {ScrollView} from 'react-native';
import {Container, InnerContainer, _Text} from '../../styles/styles';
import {_Image as Poster, Rating} from '../../components';
import styles, {
  InfoContainer,
  PosterAndBookInfoContainer,
  BookInfoContainer,
  PosterContainer,
  ContributorContainer,
} from './styles';
import colors from '../../colors/colors';
import {
  HEADER_TITLE_LENGTH_LIMIT,
  API,
  NO_OF_LINES,
} from '../../configs/appConfig';
import {FONTS_TYPE} from '../../constants/fonts';
import Language from '../../language/en.json';
import StaticImage from '../../assets/icons';
import {bookDetails} from '../../network/network';
import {Loader} from '../../components';

type Props = {
  navigation: any;
  route: any;
};

const Details: React.FC<Props> = ({navigation, route}) => {
  const {
    title,
    coverID,
    year,
    ratingAverage,
    language,
    contributor,
    author,
    bookKey,
  } = route.params?.item;

  const [loading, setLoading] = useState<boolean>(true);
  const [bookDetailData, setBookDetailData] = useState<any>([]);
  const [showMoreContributor, setShowMoreContributor] =
    useState<boolean>(false);
  const [contributionMore, setContributionMore] = useState(false);
  const [showMoreDescription, setShowMoreDescription] =
    useState<boolean>(false);
  const [descriptionMore, setDescriptionMore] = useState(false);
  const [showMoreSubject, setShowMoreSubject] = useState<boolean>(false);
  const [subjectMore, setSubjectMore] = useState(false);

  useEffect(() => {
    getBookDetails();
  }, []);

  const getBookDetails = async () => {
    const bookDetailsResponse = await bookDetails(bookKey);
    if (bookDetailsResponse.success) {
      setBookDetailData(bookDetailsResponse.data);
    }
    setLoading(false);
  };

  const headerTitle =
    title?.length > HEADER_TITLE_LENGTH_LIMIT
      ? title.substring(0, HEADER_TITLE_LENGTH_LIMIT) + '...'
      : title;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <_Text>{headerTitle}</_Text>,
    });
  }, [navigation]);

  const onLayout = useCallback((e, func) => {
    func(e.nativeEvent.lines.length >= NO_OF_LINES);
  }, []);

  return (
    <Container>
      <ScrollView>
        <InnerContainer>
          <InfoContainer>
            <PosterAndBookInfoContainer>
              <PosterContainer>
                <Poster
                  imageUrl={
                    coverID
                      ? `${API.poster}${coverID}-M.jpg?default=false `
                      : null
                  }
                  imageStyle={styles?.poster}
                  staticImageData={!coverID ? StaticImage?.notFound : null}
                />
              </PosterContainer>

              <BookInfoContainer>
                <_Text
                  textAlign={'left'}
                  color={colors?.text}
                  fontFamily={FONTS_TYPE.semiBold}>
                  {title}
                </_Text>
                <_Text textAlign={'left'} color={colors?.text} paddingTop={10}>
                  Author: {author}
                </_Text>
                <_Text textAlign={'left'} color={colors?.text} paddingTop={10}>
                  {Language.Year} : {year}
                </_Text>
                <_Text textAlign={'left'} color={colors?.text} paddingTop={10}>
                  {Language.Rating} : {ratingAverage}
                </_Text>
                <Rating
                  containerStyle={styles?.AirbnbRating}
                  rating={ratingAverage}
                  size={20}
                />
                {language?.length && (
                  <_Text
                    textAlign={'left'}
                    color={colors?.text}
                    paddingTop={10}>
                    {Language.Language} : {language.join(', ')}
                  </_Text>
                )}
              </BookInfoContainer>
            </PosterAndBookInfoContainer>
            <ContributorContainer>
              {contributor?.length && (
                <_Text
                  textAlign={'left'}
                  color={colors?.text}
                  fontFamily={FONTS_TYPE.semiBold}
                  numberOfLines={!contributionMore ? NO_OF_LINES : null}
                  onTextLayout={e => onLayout(e, setShowMoreContributor)}>
                  {Language.Contributor} :{' '}
                  <_Text textAlign={'left'} color={colors?.text}>
                    {contributor.join(', ')}
                  </_Text>
                </_Text>
              )}
              {contributor?.length && showMoreContributor ? (
                <_Text
                  textAlign={'left'}
                  color={colors?.blue}
                  fontFamily={FONTS_TYPE.semiBold}
                  onPress={() => setContributionMore(!contributionMore)}>
                  {contributionMore ? Language.readLess : Language.readMore}
                </_Text>
              ) : null}
            </ContributorContainer>

            {loading && (
              <Loader
                size="large"
                loadingText={Language?.searchingBooksDetail}
              />
            )}
            {bookDetailData?.description && (
              <_Text
                textAlign={'left'}
                color={colors?.text}
                fontFamily={FONTS_TYPE.semiBold}
                numberOfLines={!descriptionMore ? NO_OF_LINES : null}
                onTextLayout={e => onLayout(e, setShowMoreDescription)}>
                {Language.description} :{' '}
                <_Text textAlign={'left'} color={colors?.text}>
                  {bookDetailData?.description}
                </_Text>
              </_Text>
            )}
            {bookDetailData?.description && showMoreDescription ? (
              <_Text
                textAlign={'left'}
                color={colors?.blue}
                fontFamily={FONTS_TYPE.semiBold}
                onPress={() => setDescriptionMore(!descriptionMore)}>
                {descriptionMore ? Language.readLess : Language.readMore}
              </_Text>
            ) : null}
            {bookDetailData?.subjects && (
              <_Text
                textAlign={'left'}
                color={colors?.text}
                paddingTop={20}
                fontFamily={FONTS_TYPE.semiBold}
                numberOfLines={!subjectMore ? NO_OF_LINES : null}
                onTextLayout={e => onLayout(e, setShowMoreSubject)}>
                {Language.subjects} :{' '}
                <_Text textAlign={'left'} color={colors?.text}>
                  {bookDetailData?.subjects?.join(', ')}
                </_Text>
              </_Text>
            )}
            {bookDetailData?.subjects && showMoreSubject ? (
              <_Text
                textAlign={'left'}
                color={colors?.blue}
                fontFamily={FONTS_TYPE.semiBold}
                onPress={() => setSubjectMore(!subjectMore)}>
                {subjectMore ? Language.readLess : Language.readMore}
              </_Text>
            ) : null}
          </InfoContainer>
        </InnerContainer>
      </ScrollView>
    </Container>
  );
};

export default Details;
