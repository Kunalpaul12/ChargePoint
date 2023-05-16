import React from 'react';
import {Container, InnerContainer, _Text} from '../../styles/styles';

type Props = {
  navigation: any;
};

const Search: React.FC<Props> = ({navigation}) => {
  return (
    <Container>
      <InnerContainer>
        <_Text>Search</_Text>
      </InnerContainer>
    </Container>
  );
};

export default Search;
