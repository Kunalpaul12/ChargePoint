import React from 'react';
import {Image} from 'react-native';
import styles, {TryAgainTouchable} from './styles';
import {_Text, ComponentsContainer} from '../../styles/styles';
import StaticImage from '../../assets/icons';
import Language from '../../language/en.json';
import colors from '../../colors/colors';

type Props = {
  errorText: string;
  imageUrl?: any;
  imageStyle?: any;
  isTryAgain?: boolean;
  tryAgainCallback?: () => void;
};

const Error: React.FC<Props> = ({
  errorText,
  imageUrl,
  imageStyle,
  isTryAgain,
  tryAgainCallback,
}) => {
  return (
    <ComponentsContainer>
      <Image
        style={imageStyle || styles?.errorImage}
        source={imageUrl || StaticImage?.Error}
      />
      <_Text paddingTop={15}>{errorText}</_Text>
      {isTryAgain && (
        <TryAgainTouchable
          onPress={() => {
            tryAgainCallback();
          }}>
          <_Text color={colors?.blue}>{Language?.tryAgain}</_Text>
        </TryAgainTouchable>
      )}
    </ComponentsContainer>
  );
};

export default Error;
