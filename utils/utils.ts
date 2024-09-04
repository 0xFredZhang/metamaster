import { Dimensions, StyleSheet } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';

export const screenHeight = initialWindowMetrics
  ? Dimensions.get('window').height -
    initialWindowMetrics.insets.top -
    initialWindowMetrics.insets.bottom
  : 0;
export const screenWidth = initialWindowMetrics
  ? Dimensions.get('window').width -
    initialWindowMetrics.insets.left -
    initialWindowMetrics.insets.right
  : 0;
export const fontScale = (screenHeight ?? 0) / 850;

export const getDateString = (date: number) => {
  return new Date(date).toISOString().split('T')[0];
};

export const colors = {
  mainDark: '#1D1D2B',
  mainBg: '#FFFFFF',
  mainPink: '#DE1B74',
  lightGrey: '#70717C',
  lightPink: '#DB7FA9',
  borderGrey: '#F3F3F3',
  body: '#393841',
  primaryPink: '#DE1B74',
  darkPink: '#730939',
  secondaryBlue: '#197185',
  darkBlue: '#0D3741',
  lightBlue: '#78A3AC',
  redError: '#C02929',
  darkError: '#5B1313',
  lightError: '#BE7777',
  greenSuccess: '#178C5B',
  darkGreen: '#0B3E28',
  lightGreen: '#8EB8A6',
  label: '#70717C',
  placeholder: '#AEB0C0',
  line: '#F3F3F3',
  inputBackground: '#E6E7EE',
  background: '#D9DBE9',
  purple: '#8A01D3',
};

export const typography = StyleSheet.create({
  heading1: {
    color: colors.mainDark,
    fontSize: fontScale * 24,
    lineHeight: fontScale * 28,
    fontWeight: '600',
  },
  heading2: {
    color: colors.mainDark,
    fontSize: fontScale * 26,
    lineHeight: fontScale * 36,
    fontWeight: '500',
  },
  heading3: {
    color: colors.mainDark,
    fontSize: fontScale * 22,
    lineHeight: fontScale * 30,
    fontWeight: '600',
  },
  heading4: {
    color: colors.mainDark,
    fontSize: fontScale * 20,
    lineHeight: fontScale * 24,
    fontWeight: '400',
  },
  subheading1: {
    color: colors.mainDark,
    fontSize: fontScale * 18,
    lineHeight: fontScale * 26,
    fontWeight: '500',
  },
  subheading2: {
    color: colors.mainDark,
    fontSize: fontScale * 16,
    lineHeight: fontScale * 22,
    fontWeight: '500',
  },
  subheading3: {
    color: colors.mainDark,
    fontSize: fontScale * 14,
    lineHeight: fontScale * 18,
    fontWeight: '500',
  },
  body: {
    color: colors.mainDark,
    fontSize: fontScale * 16,
    lineHeight: fontScale * 22,
    fontWeight: '400',
  },
  bodySmall: {
    color: colors.mainDark,
    fontSize: fontScale * 14,
    lineHeight: fontScale * 16,
    fontWeight: '400',
  },
  extraSmall: {
    color: colors.label,
    fontWeight: '400',
    fontSize: fontScale * 10,
    lineHeight: fontScale * 16,
  },
  button: {
    color: colors.mainDark,
    fontSize: fontScale * 14,
    lineHeight: fontScale * 19,
    fontWeight: '600',
  },
});

export const baseStyles = StyleSheet.create({
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRowBetween: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: colors.mainBg,
  },
});
