import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import colors from '../../../../colors/colors';

const {width, height} = Dimensions.get('window');

export const ModalContainer = styled.View`
  flex: 1;
  background-color: ${colors?.modalBackground};
  justify-content: flex-end;
`;

export const ModalInnerContainer = styled.View`
  background-color: ${colors?.background};
  height: 280px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

export const ModalBottomContainer = styled.View`
  width: ${width / 1.2}px;
  align-self: center;
`;

export const ActionsContainer = styled.View`
  flex-direction: row;
  margin-top: 25px;
  align-items: center;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 25px;
`;

export const ApplyTouchable = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.active ? colors?.blue : colors?.grey)};
  border-radius: 10px;
  height: 50px;
  width: 100px;
  margin-left: ${props => props?.marginLeft || '0px'};
`;

export const CancelTouchable = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border: ${props => `2px solid ${colors?.grey}`};
  border-radius: 10px;
  height: 50px;
  width: 100px;
  margin-left: 20px;
`;
