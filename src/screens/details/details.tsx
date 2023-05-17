import React from 'react';
import {Container, InnerContainer, _Text} from '../../styles/styles';

type Props = {
  navigation: any;
};

const Details: React.FC<Props> = ({navigation}) => {
  return (
    <Container>
      <InnerContainer>
        <_Text>Details</_Text>
      </InnerContainer>
    </Container>
  );
};

export default Details;
