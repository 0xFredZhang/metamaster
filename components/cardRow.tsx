import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { baseStyles, colors, fontScale, typography } from '../utils/utils';
import Icon from 'react-native-vector-icons/Feather';

export interface CardRowProps extends TouchableOpacityProps {
  heading: string;
  subheading: { label: string; data: string };
  highlightedText?: string;
  imageURI?: string;
  additionalText?: string;
}

const CardRow = (props: CardRowProps) => {
  const {
    heading,
    subheading,
    highlightedText,
    imageURI,
    additionalText,
    ...touchableOpacityProps
  } = props;
  return (
    <TouchableOpacity {...touchableOpacityProps}>
      <View style={imageURI ? styles.cardImageRow : styles.cardRow}>
        <View>
          <Text style={styles.subheading1Bold}>{heading}</Text>
          <View style={styles.cardSubheading}>
            <Text style={styles.cardLabel}>{subheading.label}</Text>
            <Text style={styles.subheading1Bold}>{subheading.data}</Text>
          </View>
          {highlightedText && (
            <Text style={styles.highlightedText}>{highlightedText}</Text>
          )}
        </View>
        <View style={styles.subSection}>
          {additionalText && (
            <>
              <Text style={styles.subheading1Bold}>{additionalText}</Text>
              <Icon name="star" size={fontScale * 12} />
            </>
          )}
          {imageURI && (
            <Image source={{ uri: imageURI }} style={styles.rowImage} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardRow;

const styles = StyleSheet.create({
  subheading1Bold: {
    ...typography.subheading1,
    fontWeight: '700',
  },
  cardSubheading: {
    ...baseStyles.flexRow,
    gap: 12,
  },
  cardLabel: {
    ...typography.subheading2,
    color: colors.lightGrey,
  },
  highlightedText: {
    ...typography.subheading2,
    color: colors.mainPink,
  },
  subSection: {
    ...baseStyles.flexRow,
    gap: 7,
  },
  cardRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  cardImageRow: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    gap: 8,
  },
  rowImage: {
    height: 82 * fontScale,
    width: 82 * fontScale,
    borderRadius: 8,
  },
});
