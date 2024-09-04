import { StyleSheet, View } from 'react-native';
import { colors } from '../utils/utils';

const Divider = () => {
  return <View style={styles.divider}></View>;
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    borderColor: colors.mainDark,
    borderWidth: 0.5,
  },
});
