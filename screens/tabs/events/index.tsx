import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenProps, stackHeader } from '..';
import Followings from './Following';
import Bookmarks from './Bookmarks';
import MyEvents from './myEvents';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EventDetails from '../../eventDetails';
import MasterDetails from '../../masterDetails';
import QrScanner from '../QrScanner';
import { colors } from '../../../utils/utils';
import { MMEvent } from '@utils/types';

export type EventStackParamList = {
  'My Events': undefined;
  Following: undefined;
  "I'm interested in": undefined;
  Event_Details: MMEvent;
};

const eventStack = createNativeStackNavigator<EventStackParamList>();

const eventScreens: ScreenProps<EventStackParamList>[] = [
  {
    name: 'My Events',
    component: MyEvents,
  },
  // {
  //   name: "I'm interested in",
  //   component: Bookmarks,
  // },
  {
    name: 'Following',
    component: Followings,
  },
];

export const EventStack = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.purple,
        tabBarInactiveTintColor: '#000',
        tabBarIndicatorStyle: { backgroundColor: colors.purple },
        tabBarLabelStyle: { fontSize: 11 },
      }}>
      {eventScreens.map((screen) => (
        <Tab.Screen key={screen.name} {...screen} />
      ))}
    </Tab.Navigator>
  );
};

export const EventStackWithHeader = () => {
  const TabContainer = createNativeStackNavigator();

  return (
    <TabContainer.Navigator>
      <TabContainer.Screen
        name="eventStack"
        component={EventStack}
        options={(args) => stackHeader(args, { withSearch: false })}
      />
      <TabContainer.Screen
        name="Event_Details"
        component={EventDetails}
        options={(args) => stackHeader(args, {})}
      />
      <TabContainer.Screen
        name="Master_Details"
        component={MasterDetails}
        options={(args) => stackHeader(args, {})}
      />
      <TabContainer.Screen
        name="QrScanner"
        component={QrScanner}
        options={(args) => stackHeader(args, {})}
      />
    </TabContainer.Navigator>
  );
};
