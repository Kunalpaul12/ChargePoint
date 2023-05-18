import React from 'react';
import {AirbnbRating} from 'react-native-ratings';
import {
  RATING_STAR_COUNT,
  RATING_DEFAULT_SIZE,
  SHOW_RATING,
  USER_RATING_DISABLE,
} from '../../configs/appConfig';

type Props = {
  containerStyle: any;
  rating: number;
  size?: number;
};

const Rating: React.FC<Props> = ({containerStyle, rating, size}) => {
  return (
    <AirbnbRating
      count={RATING_STAR_COUNT}
      defaultRating={rating}
      isDisabled={USER_RATING_DISABLE}
      size={size || RATING_DEFAULT_SIZE}
      showRating={SHOW_RATING}
      starContainerStyle={containerStyle}
    />
  );
};

export default Rating;
