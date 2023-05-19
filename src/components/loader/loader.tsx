import React from 'react';
import {ActivityIndicator, Keyboard} from 'react-native';
import {_Text, ComponentsContainer} from '../../styles/styles';

type Props = {
  size: string;
  loadingText?: string;
};

type FooterProps = {
  size: string;
  loadMore: boolean;
};

const Loader: React.FC<Props> = ({size, loadingText}) => {
  const keyboardVisible = Keyboard.isVisible();
  return (
    <ComponentsContainer keyboardVisible={keyboardVisible}>
      <ActivityIndicator size={size || 'large'} />
      <_Text paddingTop={15}>{loadingText}</_Text>
    </ComponentsContainer>
  );
};

export const ListFooterLoader: React.FC<FooterProps> = ({size, loadMore}) => {
  if (!loadMore) {
    return <></>;
  }
  return <ActivityIndicator size={size || 'large'} />;
};

export default Loader;
