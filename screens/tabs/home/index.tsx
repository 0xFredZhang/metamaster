import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventDetails from '../../eventDetails';
import Events from './events';
import React from 'react';
import { Screen, stackHeader } from '..';
import MasterDetails from '../../masterDetails';
import { UserBtnProps } from '@components/userButton';
import QrScanner from '../QrScanner';
import { EventPayment } from './eventPayment';
import Attendance from './attendence';
import QrConfirm, { QrProps } from '../QrConfirm';
import { createStackNavigator } from '@react-navigation/stack';
import { MMEventDetails, Master } from '@utils/types';
import SuccessModal from '@components/SuccessModal';

export type HomeStackParamList = {
  Events: undefined;
  Event_Details: MMEventDetails;
  Master_Details: Master;
  QrScanner: undefined;
  QrConfirm: QrProps;
  Event_Payment: MMEventDetails;
  Success_Modal: undefined;
  Confirm_Payment: undefined;
  Attendence: {
    event: {
      _id: string;
      title: string;
      startDate: number;
    };
    maxAttendee: number;
    host: {
      _id: string;
      username: string;
      profilePic: string;
      updatedAt: string;
    };
  };
};

const Stack = createStackNavigator<HomeStackParamList>();

const screens: Screen<HomeStackParamList>[] = [
  {
    stackScreenProps: { name: 'Events', component: Events },
    headerProps: { withSearch: false },
  },
  {
    stackScreenProps: { name: 'Event_Details', component: EventDetails },
    headerProps: {
      rightItems: [
        {
          icon: 'share-2',
          iconSet: 'Feather',
        },
      ],
    },
  },
];

const HomeStack = () => (
  <Stack.Navigator>
    {screens.map(({ stackScreenProps, headerProps }) => (
      <Stack.Screen
        key={stackScreenProps.name}
        {...stackScreenProps}
        options={(args) => stackHeader(args, headerProps)}
      />
    ))}

    <Stack.Screen
      name="Master_Details"
      component={MasterDetails}
      options={(args) => stackHeader(args, {})}
    />
    <Stack.Screen
      name="Success_Modal"
      component={SuccessModal}
      options={(args) => stackHeader(args, { alternateTitle: ' ' })}
    />
    <Stack.Screen
      name="Attendence"
      component={Attendance}
      options={(args) =>
        stackHeader(args, { alternateTitle: 'Attendance list' })
      }
    />
    <Stack.Screen
      name="Event_Payment"
      component={EventPayment}
      options={(args) => stackHeader(args, { alternateTitle: 'Entry Cost' })}
    />

    <Stack.Screen
      name="QrScanner"
      component={QrScanner}
      options={(args) => stackHeader(args, {})}
    />
    <Stack.Screen
      name="QrConfirm"
      component={QrConfirm}
      options={(args) => stackHeader(args, {})}
    />
  </Stack.Navigator>
);

export default HomeStack;
