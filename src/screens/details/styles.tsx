import styled from 'styled-components/native';

export const InfoContainer = styled.View``;

export const PosterAndBookInfoContainer = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

export const PosterContainer = styled.View`
  width: 40%;
  height:200px
  align-items: flex-start;
`;

export const BookInfoContainer = styled.View`
  width: 55%;
  margin-left: 5%;
`;

export const ContributorContainer = styled.View`
  margin-top: 40px;
  padding-bottom: 20px;
`;

export default {
  poster: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  AirbnbRating: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    paddingTop: 10,
  },
};
