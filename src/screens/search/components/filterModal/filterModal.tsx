import React from 'react';
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
};

const FilterModal: React.FC<Props> = ({
  searchByName,
  setSearchByName,
  setFilterModalVisible,
}) => {
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
              enable={searchByName}
              action={() => {
                setSearchByName(true);
              }}
            />
          </ActionsContainer>
          <ActionsContainer>
            <_Text textAlign={'left'} paddingRight={20}>
              {Language?.searchByAuthor}
            </_Text>
            <_Switch
              enable={!searchByName}
              action={() => {
                setSearchByName(false);
              }}
            />
          </ActionsContainer>

          <ApplyTouchable
            onPress={() => {
              setFilterModalVisible(false);
            }}>
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
