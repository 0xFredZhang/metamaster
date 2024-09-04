import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Stamps from './stamps';
import WalletInfo from './walletInfo';
import { Screen, stackHeader } from '..';
import Poaps from './poaps';
import PoapDetails from '../../poapDetails';
import { Tooltip } from 'react-native-elements';
import Transactions from './transaction';
import TransactionDetails from './transactionDetails';
import StampDetails, { metaProperties } from './stampDetails';
import { CardRowProps } from '@components/cardRow';
import Receive from './receive';
import MasterDetails from '../../masterDetails';
import { screenHeight } from '../../../utils/utils';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { Send } from './send';
import { Poap } from '@utils/types';

interface EventDetails extends CardRowProps {
  description: string;
  metaProperties: metaProperties;
}

export interface TransactionDetails {
  icon: string;
  title: string;
  subLabel: string;
  from_acc: string;
  to_acc: string;
  time: string;
  status: string;
  amount: string;
  fees: string;
  total: string;
  txid: string;
  desc: string;
}

export type WalletStackParamList = {
  WalletInfo: undefined;
  Stamps: undefined;
  Poaps: undefined;
  // Poap_Details: { eventId: string };
  Poap_Details: Poap;
  Transactions: undefined;
  Transaction_Details: TransactionDetails;
  Stamp_Details: EventDetails;
  Send: undefined;
  Receive: undefined;
  MasterDetails: undefined;
  SendConfirmation: { recipient: string; amount: string; description?: string };
};

// const Stack = createNativeStackNavigator<WalletStackParamList>();
const Stack = createStackNavigator<WalletStackParamList>();

const screens: Screen<WalletStackParamList>[] = [
  {
    stackScreenProps: { name: 'WalletInfo', component: WalletInfo },
    headerProps: { withSearch: false },
  },
  {
    stackScreenProps: { name: 'Stamps', component: Stamps },
    headerProps: { rightItems: [{ icon: 'share-2', iconSet: 'Feather' }] },
  },
  {
    stackScreenProps: { name: 'Poaps', component: Poaps },
    headerProps: {
      rightItems: [
        { icon: 'scan1', iconSet: 'AntDesign' },
        { icon: 'help-circle', iconSet: 'Feather' },
      ],
    },
  },
  {
    stackScreenProps: { name: 'Poap_Details', component: PoapDetails },
    headerProps: { rightItems: [{ icon: 'share-2', iconSet: 'Feather' }] },
  },
  {
    stackScreenProps: { name: 'Transactions', component: Transactions },
    headerProps: { rightItems: [{ icon: 'sliders', iconSet: 'Feather' }] },
  },
  {
    stackScreenProps: {
      name: 'Transaction_Details',
      component: TransactionDetails,
    },
    headerProps: {},
  },
  {
    stackScreenProps: { name: 'Stamp_Details', component: StampDetails },
    headerProps: { rightItems: [{ icon: 'share-2', iconSet: 'Feather' }] },
  },
];

const WalletStack = () => (
  <Stack.Navigator>
    {screens.map(({ stackScreenProps, headerProps }) => (
      <Stack.Screen
        key={stackScreenProps.name}
        {...stackScreenProps}
        options={(args) => stackHeader(args, headerProps)}
      />
    ))}
    <Stack.Screen
      name="Send"
      component={Send}
      options={(args) => stackHeader(args, { alternateTitle: 'Send token' })}
    />
    <Stack.Screen
      name="MasterDetails"
      component={MasterDetails}
      options={(args) =>
        stackHeader(args, { alternateTitle: 'Master Details' })
      }
    />
  </Stack.Navigator>
);

export default WalletStack;
