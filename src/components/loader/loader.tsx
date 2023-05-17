import React from 'react';
import {ActivityIndicator} from 'react-native';
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
  return (
    <ComponentsContainer>
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
