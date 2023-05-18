import styled from 'styled-components/native';
import colors from '../../colors/colors';

export const SearchBarContainer = styled.View`
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  width: 100%;
`;

export const SearchView = styled.View`
  flex-direction: row;
  width: 80%;
  background-color: ${colors?.grey};
  border-radius: 15px;
  align-items: center;
  height: 50px;
`;

export const FilterTouchable = styled.TouchableOpacity`
  margin-left: 40px;
`;

export default {
  input: {
    fontSize: 20,
    marginLeft: 20,
    width: '75%',
  },
  iconsSearch: {
    width: 20,
    height: 20,
    left: 10,
  },
  iconsCancel: {
    width: 20,
    height: 20,
  },
};
