import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ColorValue,
  ViewStyle,
  Alert,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import {
  baseStyles,
  colors,
  screenHeight,
  typography,
} from '../../../utils/utils';
import Icon from 'react-native-vector-icons/Feather';
import UserButton from '@components/userButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { WalletStackParamList } from '.';
import { images } from '@assets/images';
import { OptionTab } from '@components/optionTab';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'App';
import Clipboard from '@react-native-clipboard/clipboard';
import { RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '@components/loader';
import api from '@utils/api';
import { setWalletAddress } from '../../../redux/slices/authSlice';
import { setBalance } from '../../../redux/slices/walletSlice';

import { PrimaryButton } from '@components/button';
import { MMT_TOKEN_ID } from '@utils/const';

interface DividerProps extends ViewStyle {
  color: ColorValue;
}

const Divider = (props: DividerProps) => {
  const { color, ...viewStyleProps } = props;
  return (
    <View
      style={{
        borderColor: props.color,
        borderBottomWidth: StyleSheet.hairlineWidth,
        ...viewStyleProps,
      }}
    />
  );
};

const WalletInfo = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<WalletStackParamList & RootStackParamList>
    >();
  const dispatch = useDispatch();
  const { walletAddress, username } = useSelector(
    (state: RootState) => state.auth
  );
  const { balance } = useSelector((state: RootState) => state.wallet);
  // const [balance, setBalance] = useState<number | undefined>(undefined);

  const { profilePicture } = useSelector((state: RootState) => state.auth);
  const getBalance = async () => {
    console.log('wallet address: ', walletAddress);

    //get walletaddr
    // await api.user
    //   .get('/info')
    //   .then((res) => {
    //     dispatch(setWalletAddress(res.walletAddr));
    //   })
    //   .catch((err) => console.log(err));

    //get balance
    return await fetch(
      `https://veldidina-vsys.herokuapp.com/contract/balance/${walletAddress}/${MMT_TOKEN_ID}`
    )
      .then(async (res) => {
        await res
          .json()
          .then((walletRes) => {
            dispatch(setBalance(walletRes.balance));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log('veldidina error: ', err));
  };

  useFocusEffect(
    useCallback(() => {
      getBalance();
    }, [])
  );

  const rows = [
    // {
    //   icon: 'image',
    //   title: 'My Stamps',
    //   onPress: () => navigation.navigate('Stamps'),
    // },
    {
      icon: 'grid',
      title: 'My POAPs',
      onPress: () => navigation.navigate('Poaps'),
    },
    {
      icon: 'menu',
      title: 'Transactions',
      onPress: () => navigation.navigate('Transactions'),
    },
  ] as const;

  const arrowButtons = [
    {
      icon: 'arrow-up',
      text: 'Send',
      onPress: () => navigation.navigate('Send'),
    },
    {
      icon: 'arrow-down',
      text: 'Receive',
      onPress: () => navigation.navigate('Receive'),
    },
  ] as const;

  return (
    <View style={styles.mainContainer}>
      <UserButton
        username={username!}
        icon="copy"
        imageURI={profilePicture}
        text={`${walletAddress?.slice(0, 5)}...${walletAddress?.slice(
          walletAddress.length - 5,
          walletAddress.length
        )}`}
        onPress={() => {
          Clipboard.setString(walletAddress!);
          Alert.alert('wallet addr copied');
        }}
      />

      {/* pass in empty event object */}
      <PrimaryButton
        title={'scan POAP QR'}
        onPress={() =>
          navigation.navigate('Poap_Details', {
            event: '644b78d318d4ddb60564dbc8',
          })
        }
      />

      <Divider color={colors.mainDark} marginBottom="10%" />
      <View style={styles.topContainer}>
        {balance || balance == 0 ? (
          <Text style={{ ...typography.heading1, color: colors.mainPink }}>
            {balance}
          </Text>
        ) : (
          <Loader />
        )}
        <Text style={{ ...typography.subheading1, color: colors.lightGrey }}>
          CREDIT BALANCE
        </Text>
        <View style={styles.arrowContainer}>
          {arrowButtons.map(({ icon, text, onPress }) => (
            <TouchableOpacity
              key={text}
              style={{ alignItems: 'center' }}
              onPress={onPress}>
              <Icon name={icon} size={28} color={colors.purple} />
              <Text style={{ color: colors.purple }}>{text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Divider color={colors.borderGrey} marginVertical="10%" />
      {rows.map((row) => (
        <React.Fragment key={row.title}>
          <OptionTab {...row} />
          <Divider color={colors.borderGrey} />
        </React.Fragment>
      ))}
    </View>
  );
};

export default WalletInfo;

const styles = StyleSheet.create({
  mainContainer: {
    color: 'red',
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.mainBg,
  },
  topContainer: { alignItems: 'center', gap: 12 },
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
    marginTop: 20,
  },
});
