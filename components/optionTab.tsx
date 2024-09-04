import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { baseStyles, screenHeight, typography } from '../utils/utils';

export interface OptionTabProps extends TouchableOpacityProps {
  icon?: string;
  title: string;
  subLabel?: string;
  isToggle?: boolean;
}

export const OptionTab = (props: OptionTabProps) => {
  const { icon, title, subLabel, isToggle, ...touchableProps } = props;
  return (
    <TouchableOpacity
      {...touchableProps}
      style={[
        {
          ...baseStyles.flexRowBetween,
          height: screenHeight * 0.07,
        },
        touchableProps.style,
      ]}>
      <View style={{ ...baseStyles.flexRow, gap: 8 }}>
        {icon && <Icon name={icon} size={24} />}
        <View style={{ flexDirection: 'column' }}>
          <Text style={typography.subheading1}>{title}</Text>
          {subLabel && <Text style={typography.bodySmall}>{subLabel}</Text>}
        </View>
      </View>
      <Icon name="chevron-right" size={24} />
    </TouchableOpacity>
  );
};
