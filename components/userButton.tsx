import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  GestureResponderEvent,
  Image,
  TouchableOpacityProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, fontScale, typography } from '../utils/utils';
import MasterSVG from '@assets/master.svg';
export interface UserBtnProps extends TouchableOpacityProps {
  username: string;
  imageURI?: string;
  text?: string;
  icon?: string;
  onPress?: (e: GestureResponderEvent) => void;
}

const UserButton = ({ style, ...props }: UserBtnProps) => {
  return (
    <TouchableOpacity
      style={[styles.userButton, style]}
      onPress={props.onPress}>
      <View style={styles.btnContent}>
        {!props.imageURI ? (
          <View style={styles.userIcon}>
            <Text style={styles.userIconText}>
              {props.username.slice(0, 2)}
            </Text>
          </View>
        ) : (
          <Image source={{ uri: props.imageURI }} style={styles.imageStyles} />
        )}
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <Text style={typography.heading3}>{props.username}</Text>
            {/* <Icon name={'star'} size={fontScale * 20} /> */}
            <MasterSVG width={20} />
          </View>
          {props.text && (
            <Text style={{ ...typography.subheading2, color: colors.body }}>
              {props.text}
            </Text>
          )}
        </View>
      </View>
      {props.icon && (
        <Icon name={props.icon ?? 'chevron-right'} size={fontScale * 24} />
      )}
    </TouchableOpacity>
  );
};
export default UserButton;

const styles = StyleSheet.create({
  userButton: {
    backgroundColor: colors.mainBg,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 17,
  },
  btnContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userIcon: {
    height: 32,
    width: 32,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightPink,
  },
  userIconText: {
    ...typography.subheading2,
    color: colors.label,
  },
  imageStyles: {
    width: 56,
    height: 56,
    borderRadius: 125,
    borderWidth: 1,
    borderColor: colors.borderGrey,
    resizeMode: 'cover',
  },
});
