import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import QRCode from 'react-qr-code';
import {
  baseStyles,
  colors,
  screenWidth,
  typography,
} from '../../../utils/utils';
import UserButton from '@components/userButton';
import { images } from '@assets/images';
import Clipboard from '@react-native-clipboard/clipboard';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';

const Receive = () => {
  const { walletAddress, username } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <View
      style={{
        ...baseStyles.container,
        backgroundColor: colors.line,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <QRCode
        value={JSON.stringify({ type: 'address', id: { walletAddress } })}
      />
      {/* <View
        style={{
          padding: 10,
          backgroundColor: colors.line,
          borderRadius: 8,
        }}>
        <Text>address was copied to clipboard</Text>
      </View> */}
      <View style={{ padding: 20 }}>
        <UserButton
          style={{
            width: screenWidth,
            padding: 20,
            backgroundColor: colors.line,
          }}
          username={username!}
          icon="copy"
          imageURI={images.user}
          text={`${walletAddress?.slice(0, 5)}...${walletAddress?.slice(
            walletAddress.length - 5,
            walletAddress.length
          )}`}
          onPress={() => {
            Clipboard.setString(walletAddress!);
          }}
        />
        <View
          style={{
            marginHorizontal: 10,
            borderBottomWidth: 1,
            borderBottomColor: colors.label,
          }}
        />
        <Text
          style={{
            ...typography.extraSmall,
            padding: 10,
            paddingHorizontal: 20,
          }}>
          Scan QR code or copy address to receive payment.
        </Text>
      </View>
    </View>
  );
};

export default Receive;
