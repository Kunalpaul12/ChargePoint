import styled from 'styled-components/native';
import colors from '../colors/colors';
import {scale} from 'react-native-size-matters';
import {FONTS_TYPE} from '../constants/fonts';
import {Dimensions} from 'react-native';

const {width} = Dimensions?.get('window');

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors?.background};
`;

export const _Text = styled.Text`
  font-family: ${(props: any) => props?.fontFamily || FONTS_TYPE?.regular};
  font-size: ${(props: any) => scale(props?.fontSize) || scale(15)}px;
  color: ${(props: any) => props?.color || colors?.text};
  padding-top: ${(props: any) => props?.paddingTop || '0'}px;
  text-align: ${(props: any) => props?.textAlign || 'center'};
  padding-left: ${(props: any) => props?.paddingLeft || '0'}px;
  padding-bottom: ${(props: any) => props?.paddingBottom || '0'}px;
  padding-top: ${(props: any) => props?.paddingTop || '0'}px;
`;

export const InnerContainer = styled.View`
  flex: 1;
  width: ${width / 1.1}px;
  align-self: center;
`;

export const ComponentsContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
