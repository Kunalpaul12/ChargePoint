import styled from 'styled-components/native';
import colors from '../../colors/colors';

export const BooksSeparator = styled.View`
  padding: 10px;
`;

export const BookContainer = styled.TouchableOpacity`
  width: 48%;
  border: ${props => `2px solid ${colors?.grey}`};
  align-items: center;
  padding: 10px 0px 10px;
`;

export const BookDetailsContainer = styled.View`
  margin-top: 10px;
  margin-left: 10px;
`;

export default {
  BookContentContainer: {
    flexGrow: 1,
  },
  enjoyBooksImage: {
    width: 100,
    height: 100,
  },
  booksImage: {
    width: 100,
    height: 150,
    resizeMode: 'stretch',
  },
  footerLoaderContainer: {
    height: 50,
    paddingTop: 20,
  },
  AirbnbRating: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    paddingTop: 2,
  },
};
