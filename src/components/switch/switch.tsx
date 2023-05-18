import React from 'react';
import {Switch, Platform} from 'react-native';
import colors from '../../colors/colors';
import {ANDROID_SWITCH_SCALE, IOS_SWITCH_SCALE} from '../../configs/appConfig';

type Props = {
  enable: boolean;
  action: (value: boolean) => void;
};

const _Switch: React.FC<Props> = ({enable, action}) => {
  return (
    <Switch
      trackColor={{
        false: colors?.grey,
        true: colors?.switchActive,
      }}
      thumbColor={enable ? colors?.grey : colors?.switchDisable}
      onValueChange={() => action(!enable)}
      value={enable}
      style={{
        transform: [
          {
            scaleX:
              Platform?.OS === 'ios' ? IOS_SWITCH_SCALE : ANDROID_SWITCH_SCALE,
          },
          {
            scaleY:
              Platform?.OS === 'ios' ? IOS_SWITCH_SCALE : ANDROID_SWITCH_SCALE,
          },
        ],
      }}
    />
  );
};

export default _Switch;
