import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ViewStyle,
  ColorValue,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../../utils/utils';
import { WalletStackParamList } from '.';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OptionTab } from '@components/optionTab';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
//import TransactionCard from '@components/transactionCard';

const transactionDetails = [
  {
    icon: 'image',
    title: 'Received 100 MMT',
    subLabel: 'From ARCMT4...2kF',
    from_acc: '0x951c...A1fF',
    to_acc: '0x951c...A1fF',
    time: Date.now(),
    status: 'COMPLETE',
    amount: '32.25 MMT',
    fees: '0.03 MMT',
    total: '32.28 MMT',
    txid: 'ox5aARCMMk5PMMk5PMMkP899a9',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    icon: 'image',
    title: 'Received 100 MMT',
    subLabel: 'From ARCMT4...2kF',
    from_acc: '0x951c...A1fF',
    to_acc: '0x951c...A1fF',
    time: Date.now(),
    status: 'FAILED',
    amount: '32.25 MMT',
    fees: '0.03 MMT',
    total: '32.28 MMT',
    txid: 'ox5aARCMMk5PMMk5PMMkP899a9',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    icon: 'image',
    title: 'Received 1000 MMT',
    subLabel: 'From ARCMT4...2kF',
    from_acc: '0x951c...A1fF',
    to_acc: '0x951c...A1fF',
    time: Date.now() - 24 * 60 * 60 * 1000,
    status: 'PENDING',
    amount: '32.27 MMT',
    fees: '0.03 MMT',
    total: '32.28 MMT',
    txid: 'ox5aARCMMk5PMMk5PMMkP899a9',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    icon: 'image',
    title: 'Received 100 MMT',
    subLabel: 'From ARCMT4...2kF',
    from_acc: '0x951c...A1fF',
    to_acc: '0x951c...A1fF',
    time: Date.now() - 2 * (24 * 60 * 60 * 1000),
    status: 'COMPLETE',
    amount: '32.25 MMT',
    fees: '0.03 MMT',
    total: '32.28 MMT',
    txid: 'ox5aARCMMk5PMMk5PMMkP899a9',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];

interface DividerProps extends ViewStyle {
  color: ColorValue;
}

const Dividerline = (props: DividerProps) => {
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

const Divider = (props: { date: number }) => {
  const diffInDays = moment().diff(moment(props.date), 'days');
  let label = '';
  if (diffInDays === 0) {
    label = 'Today';
  } else if (diffInDays === 1) {
    label = 'Yesterday';
  } else {
    label = moment(props.date).format('MMMM D, YYYY');
  }

  return (
    <View style={styles.dividerContainer}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>{label}</Text>
      <View style={styles.dividerLine} />
    </View>
  );
};

const Transactions = (
  props: NativeStackScreenProps<WalletStackParamList, 'Transactions'>
) => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      {transactionDetails.map((transactiondetails, index) => (
        <React.Fragment key={transactiondetails.title}>
          {index === 0 ||
          moment(transactiondetails.time).diff(
            moment(transactionDetails[index - 1].time),
            'days'
          ) !== 0 ? (
            <Divider date={transactiondetails.time} />
          ) : null}
          <OptionTab
            {...transactiondetails}
            onPress={() => {
              navigation
                .getParent()
                ?.navigate('Transaction_Details', transactiondetails);
            }}
          />
          <Dividerline color={colors.borderGrey}></Dividerline>
        </React.Fragment>
      ))}
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  divider: {
    textAlign: 'center',
    marginVertical: 10,
    color: 'grey',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.lightGrey,
  },
  dividerText: {
    marginHorizontal: 10,
    color: colors.lightGrey,
  },
});
