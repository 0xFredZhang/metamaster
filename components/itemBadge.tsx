import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacityProps,
  TouchableOpacity,
} from 'react-native';
import { baseStyles, colors, fontScale, typography } from '../utils/utils';
import MasterSVG from '@assets/master.svg';

export interface ItemBadgeProps extends TouchableOpacityProps {
  imageURI: string;
  name: string;
  joined?: string;
  location?: string;
  desc?: string;
  icon?: boolean;
  variant?: 'horizontal' | 'vertical';
}

const ItemBadge = (props: ItemBadgeProps) => {
  const horizontal = props.variant === 'horizontal' || props.joined;
  const imageSize = horizontal && !props.joined ? 32 : 96;
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          ...styles.container,
          flexDirection: horizontal ? 'row' : 'column',
          alignItems: horizontal ? 'center' : 'center',
          gap: props.joined ? 24 : 8,
          paddingHorizontal: 10,
        }}>
        <Image
          source={{ uri: props.imageURI }}
          style={{ ...styles.imageStyles, height: imageSize, width: imageSize }}
        />
        <View style={{ display: 'flex', gap: 8 }}>
          <View style={styles.textContainer}>
            <Text
              style={
                props.joined ? typography.heading2 : typography.subheading2
              }>
              {props.name ? props.name : 'Master'}
            </Text>
            {props.icon && <MasterSVG width={15} />}
          </View>
          {props.joined && (
            <>
              <Text style={typography.subheading1}>
                joined in {props.joined}
              </Text>
              <Text style={{ ...typography.subheading1, fontWeight: '700' }}>
                {props.location}
              </Text>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemBadge;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 8,
    alignSelf: 'flex-start',
  },
  imageStyles: {
    borderRadius: 125,
    borderWidth: 1,
    borderColor: colors.borderGrey,
  },
  textContainer: {
    ...baseStyles.flexRow,
    gap: 8,
  },
});
