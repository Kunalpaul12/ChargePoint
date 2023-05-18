import React from 'react';
import {TextInput, TouchableOpacity} from 'react-native';
import styles, {
  SearchBarContainer,
  SearchView,
  FilterTouchable,
} from './styles';
import StaticImage from '../../assets/icons';
import Language from '../../language/en.json';
import {_Image} from '../index';

type Props = {
  clicked: boolean;
  searchPhrase: string;
  setSearchPhrase: (value: string) => void;
  setClicked: (value: boolean) => void;
  setFilterModalVisible: (value: boolean) => void;
};

const SearchBar: React.FC<Props> = ({
  searchPhrase,
  setSearchPhrase,
  setClicked,
  setFilterModalVisible,
}) => {
  const {cancel, searchDisable, filter} = StaticImage;

  return (
    <SearchBarContainer>
      <SearchView>
        <_Image
          imageStyle={styles?.iconsSearch}
          staticImageData={searchDisable}
        />

        <TextInput
          style={styles.input}
          placeholder={Language?.search_placeholder}
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />

        <TouchableOpacity onPress={() => setSearchPhrase('')}>
          <_Image imageStyle={styles?.iconsCancel} staticImageData={cancel} />
        </TouchableOpacity>
      </SearchView>

      <FilterTouchable onPress={() => setFilterModalVisible(true)}>
        <_Image imageStyle={styles?.iconsCancel} staticImageData={filter} />
      </FilterTouchable>
    </SearchBarContainer>
  );
};
export default SearchBar;
