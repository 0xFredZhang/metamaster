import React from 'react';
import {
  BottomTabNavigationOptions,
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { fontScale } from '../../utils/utils';
import { HeaderProps } from './stackHeader';
import HomeStack from './home';
import WalletStack from './wallet';
import { SettingsStack } from '../settings';
import { EventStackWithHeader } from './events';

export type TabBarParamList = {
  Home: undefined;
  Events: undefined;
  Wallet: undefined;
  SettingStack: undefined;
};

interface StackScreenProps<T extends ParamListBase> {
  name: keyof T;
  component: (
    props: T extends TabBarParamList
      ? BottomTabScreenProps<T, any>
      : NativeStackScreenProps<T, any>
  ) => JSX.Element;
}

interface TabBarScreenProps<T extends TabBarParamList>
  extends StackScreenProps<T> {
  icon: string;
}

export type ScreenProps<T extends ParamListBase> = T extends TabBarParamList
  ? TabBarScreenProps<T>
  : StackScreenProps<T>;

export interface Screen<T extends ParamListBase> {
  stackScreenProps: ScreenProps<T>;
  headerProps: HeaderProps;
}

const tabBarScreenProps: ScreenProps<TabBarParamList>[] = [
  { name: 'Home', component: HomeStack, icon: 'home' },
  { name: 'Events', component: EventStackWithHeader, icon: 'calendar' },
  { name: 'Wallet', component: WalletStack, icon: 'credit-card' },
  { name: 'SettingStack', component: SettingsStack, icon: 'settings' },
];

const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarActiveTintColor: '#1d1d2b',
  tabBarInactiveTintColor: '#70717c',
};

const Tab = createBottomTabNavigator<TabBarParamList>();

const TabBar = () => (
  <Tab.Navigator {...{ screenOptions }}>
    {tabBarScreenProps.map(({ icon, ...screenProps }) => (
      <Tab.Screen
        key={screenProps.name}
        {...screenProps}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              color={focused ? '#1d1d2b' : '#70717c'}
              size={fontScale * 24}
              name={icon}
            />
          ),
        }}
      />
    ))}
  </Tab.Navigator>
);

export { default as stackHeader } from './stackHeader';
export default TabBar;
