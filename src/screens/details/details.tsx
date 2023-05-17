import React from 'react';
import {ScrollView} from 'react-native';
import {Container, InnerContainer, _Text} from '../../styles/styles';
import {_Image as Poster} from '../../components';
import styles, {
  InfoContainer,
  PosterAndBookInfoContainer,
  BookInfoContainer,
  PosterContainer,
  ContributorContainer,
} from './styles';
import colors from '../../colors/colors';
import {HEADER_TITLE_LENGTH_LIMIT, API} from '../../configs/appConfig';
import {FONTS_TYPE} from '../../constants/fonts';
import Language from '../../language/en.json';

type Props = {
  navigation: any;
  route: any;
};

const Details: React.FC<Props> = ({navigation, route}) => {
  const {title, isbn, year, ratingAverage, language, contributor} =
    route.params?.item;

  const headerTitle =
    title?.length > HEADER_TITLE_LENGTH_LIMIT
      ? title.substring(0, HEADER_TITLE_LENGTH_LIMIT) + '...'
      : title;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <_Text>{headerTitle}</_Text>,
    });
  }, [navigation]);

  return (
    <Container>
      <ScrollView>
        <InnerContainer>
          <InfoContainer>
            <PosterAndBookInfoContainer>
              <PosterContainer>
                <Poster
                  imageUrl={`${API.poster}${isbn}-M.jpg?default=false `}
                  imageStyle={styles?.poster}
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
                  {Language.Year} : {year}
                </_Text>
                <_Text textAlign={'left'} color={colors?.text} paddingTop={10}>
                  {Language.Rating} : {ratingAverage}
                </_Text>
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
                  fontFamily={FONTS_TYPE.semiBold}>
                  {Language.Contributor} :{' '}
                  <_Text textAlign={'left'} color={colors?.text}>
                    {contributor.join(', ')}
                  </_Text>
                </_Text>
              )}
            </ContributorContainer>
          </InfoContainer>
        </InnerContainer>
      </ScrollView>
    </Container>
  );
};

export default Details;
