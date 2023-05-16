import React from 'react';
import {Container, InnerContainer, _Text} from '../../styles/styles';

type Props = {
  navigation: any;
};

const Home: React.FC<Props> = ({navigation}) => {
  return (
    <Container>
      <InnerContainer>
        <_Text>Home</_Text>
      </InnerContainer>
    </Container>
  );
};

export default Home;
