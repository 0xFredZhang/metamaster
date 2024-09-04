import { View, Text, Alert, StyleSheet } from 'react-native';
import React from 'react';
import { Camera } from 'react-native-camera-kit';
import { colors, screenHeight } from '../../utils/utils';
import ScanSVG from '@assets/scan.svg';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PrimaryButton } from '@components/button';
import { RootStackParamList } from 'App';

const QrScanner = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  return (
    <View style={StyleSheet.absoluteFill}>
      <Camera
        style={{ flex: 1 }}
        scanBarcode
        onReadCode={(event: { nativeEvent: { codeStringValue: string } }) => {
          const barcode = event.nativeEvent.codeStringValue;

          if (
            ['poap', 'stamp', 'address'].includes(JSON.parse(barcode).type) &&
            JSON.parse(barcode).id
          ) {
            navigation.navigate('QrConfirm', {
              type: JSON.parse(barcode).type,
              id: JSON.parse(barcode).id,
            });
          }
        }}
      />
      <View style={styles.scannerContainer}>
        <ScanSVG
          width={screenHeight * 0.3}
          height={screenHeight * 0.3}
          style={{ alignSelf: 'center', marginTop: '40%' }}
        />
      </View>
      <Text style={styles.text}>Scanning...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  scannerContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
  },
  text: {
    width: ScreenWidth,
    textAlign: 'center',
    position: 'absolute',
    padding: 20,
    bottom: 0,
    fontWeight: '700',
    color: colors.mainPink,
  },
});
export default QrScanner;
