import React, {useState} from 'react';
import {
  ModalContainer,
  ModalInnerContainer,
  ActionsContainer,
  ModalBottomContainer,
  ApplyTouchable,
} from './styles';
import {_Text} from '../../../../styles/styles';
import {FONTS_TYPE} from '../../../../constants/fonts';
import colors from '../../../../colors/colors';
import Language from '../../../../language/en.json';
import {_Switch} from '../../../../components';

type Props = {
  searchByName: boolean;
  setSearchByName: (value: boolean) => void;
  setFilterModalVisible: (value: boolean) => void;
  setRefresh: (value: boolean) => void;
  refresh: boolean;
};

const FilterModal: React.FC<Props> = ({
  searchByName,
  setSearchByName,
  setFilterModalVisible,
  setRefresh,
  refresh,
}) => {
  const [name, setName] = useState<boolean>(searchByName);
  const [author, setAuthor] = useState<boolean>(!searchByName);

  const Apply = () => {
    setFilterModalVisible(false);
    if (searchByName !== name) {
      setRefresh(!refresh);
      setSearchByName(name);
    }
  };

  return (
    <ModalContainer>
      <ModalInnerContainer>
        <ModalBottomContainer>
          <_Text
            textAlign={'left'}
            paddingTop={20}
            fontFamily={FONTS_TYPE?.semiBold}
            fontSize={18}>
            {Language.searchBy}
          </_Text>
          <ActionsContainer>
            <_Text textAlign={'left'} paddingRight={20}>
              {Language?.searchByName}
            </_Text>
            <_Switch
              enable={name}
              action={() => {
                setName(true);
                setAuthor(false);
              }}
            />
          </ActionsContainer>
          <ActionsContainer>
            <_Text textAlign={'left'} paddingRight={20}>
              {Language?.searchByAuthor}
            </_Text>
            <_Switch
              enable={author}
              action={() => {
                setAuthor(true);
                setName(false);
              }}
            />
          </ActionsContainer>

          <ApplyTouchable onPress={() => Apply()}>
            <_Text fontFamily={FONTS_TYPE?.semiBold} color={colors?.textWhite}>
              {Language?.apply}
            </_Text>
          </ApplyTouchable>
        </ModalBottomContainer>
      </ModalInnerContainer>
    </ModalContainer>
  );
};

export default FilterModal;
