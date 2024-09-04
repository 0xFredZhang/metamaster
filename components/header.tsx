import { Image, StyleSheet, View } from 'react-native';
import { colors, fontScale, screenHeight } from '../utils/utils';
import Icon from 'react-native-vector-icons/AntDesign';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LogoSVG from '@assets/logo_small.svg';
interface HeaderProps {
  withSearch?: boolean;
}

const Header = ({ withSearch }: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <View
      style={{
        ...styles.header,
        paddingTop: insets.top + 10,
        height: screenHeight * 0.07 + insets.top + 10,
      }}>
      {/* <Image source={require('@assets/metamasterLogo.png')} /> */}
      <LogoSVG />
      <View style={styles.headerIcons}>
        <Icon
          name="scan1"
          size={fontScale * 25}
          onPress={() => {
            navigation.getParent()?.navigate('QrScanner');
          }}
        />
        {withSearch && <Icon name="search" size={fontScale * 24} />}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.mainBg,
    paddingHorizontal: 16,
  },
  headerIcons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 26,
  },
});
