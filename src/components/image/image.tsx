import React, {useState} from 'react';
import {Image} from 'react-native';
import styles from './styles';
import StaticImage from '../../assets/icons';

type Props = {
  imageUrl?: string;
  imageStyle?: any;
  staticImageData?: any;
};

const _Image: React.FC<Props> = ({imageUrl, imageStyle, staticImageData}) => {
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <Image
      style={imageStyle || styles?.poster}
      source={
        loading
          ? StaticImage?.downloadingImage
          : staticImageData || {uri: imageUrl}
      }
      onLoadEnd={() => setLoading(false)}
    />
  );
};

export default _Image;
