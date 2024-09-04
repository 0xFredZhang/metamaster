import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { OptionTab } from '../../components/optionTab';
import { baseStyles, colors, typography } from '../../utils/utils';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Screen, stackHeader } from '../tabs';
import BecomeMaster from './becomeMaster';
import { AccountDetails } from './accountDetails';
import Icon from 'react-native-vector-icons/Feather';
import { PrimaryButton } from '@components/button';
import { cognitoSignout } from '@utils/auth';
import { useDispatch } from 'react-redux';
import { resetWallet } from '../../redux/slices/walletSlice';
import { resetAuth } from '../../redux/slices/authSlice';
import { useNavigation } from '@react-navigation/native';

export type SettingStackParamList = {
  Settings: undefined;
  Account: undefined;
  DeviceSetting: undefined;
  BecomeMaster: undefined;
  AccountDetails: undefined;
  Language: undefined;
  Security: undefined;
  Metrics: undefined;
  Currency: undefined;
};

const settingStack = createNativeStackNavigator<SettingStackParamList>();

const styles = StyleSheet.create({
  settingsContainer: {
    ...baseStyles.container,
    padding: 30,
  },
});
export const Account = (
  props: NativeStackScreenProps<SettingStackParamList, 'Account'>
) => {
  const { navigate } = props.navigation;
  const account = [
    {
      name: 'BecomeMaster',
      title: 'Become a master',
      subLabel: 'Fill in application to apply as Master',
      icon: 'user-check',
      onPress: () => navigate('BecomeMaster'),
    },
    {
      name: 'AccountDetails',
      title: 'Account Details',
      subLabel: 'Check and edit your personal ',
      icon: 'info',
      onPress: () => navigate('AccountDetails'),
    },
  ];
  return (
    <View style={styles.settingsContainer}>
      {account.map((tab) => (
        <OptionTab style={{ paddingHorizontal: 10 }} key={tab.name} {...tab} />
      ))}
    </View>
  );
};

export const DeviceSetting = (
  props: NativeStackScreenProps<SettingStackParamList, 'DeviceSetting'>
) => {
  const { navigate } = props.navigation;
  const deviceSetting = [
    {
      title: 'Language',
      subLabel: 'Select Your Language',
      icon: 'message-circle',
      onPress: () => navigate('Language'),
    },
    {
      title: 'Metrics',
      subLabel: 'Select what units you want to use',
      icon: 'edit-3',
      onPress: () => navigate('Metrics'),
    },
    {
      title: 'Currency',
      subLabel: 'Select what currency you want to use',
      icon: 'credit-card',
      onPress: () => navigate('Currency'),
    },
    {
      title: 'Security',
      subLabel: 'Change and edit your security settings',
      icon: 'info',
      onPress: () => navigate('Security'),
    },
  ];
  return (
    <SafeAreaView style={styles.settingsContainer}>
      {deviceSetting.map((tab) => (
        <OptionTab style={{ paddingHorizontal: 10 }} key={tab.title} {...tab} />
      ))}
    </SafeAreaView>
  );
};

export const Language = () => {
  const language = [
    {
      title: 'English',
      subLabel: 'American English',
    },
    {
      title: 'Chinese',
      subLabel: 'Traditional',
    },
  ];
  return (
    <SafeAreaView style={styles.settingsContainer}>
      {language.map((tab) => (
        <OptionTab
          style={{ paddingHorizontal: 10 }}
          key={tab.title}
          isToggle
          icon={''}
          {...tab}
        />
      ))}
    </SafeAreaView>
  );
};

export const Security = () => {
  const security = [
    {
      title: 'Session time out',
      subLabel: 'Lorem ipsum',
      icon: 'clock',
    },
    {
      title: 'Security lock',
      subLabel: 'Lorem ipsum',
      icon: 'lock',
    },
  ];
  return (
    <SafeAreaView style={styles.settingsContainer}>
      {security.map((tab) => (
        <OptionTab style={{ paddingHorizontal: 10 }} key={tab.title} {...tab} />
      ))}
    </SafeAreaView>
  );
};

export const Metric = () => {
  const metric = [
    { title: 'KM', subLabel: 'Europe' },
    { title: 'Miles', subLabel: 'USA' },
  ];
  return (
    <SafeAreaView style={styles.settingsContainer}>
      {metric.map((tab) => (
        <OptionTab
          style={{ paddingHorizontal: 10 }}
          key={tab.title}
          isToggle
          {...tab}
        />
      ))}
    </SafeAreaView>
  );
};

export const Currency = () => {
  const currency = [
    { title: 'Euro', subLabel: 'Europe' },
    { title: 'Yuan', subLabel: 'China' },
    { title: 'Dollar', subLabel: 'USA' },
  ];
  return (
    <SafeAreaView style={styles.settingsContainer}>
      {currency.map((tab) => (
        <OptionTab
          style={{ paddingHorizontal: 10 }}
          key={tab.title}
          isToggle
          icon={''}
          {...tab}
        />
      ))}
    </SafeAreaView>
  );
};

export const Settings = (
  props: NativeStackScreenProps<SettingStackParamList, 'Settings'>
) => {
  const { navigate } = props.navigation;
  const navigation =
    useNavigation<NativeStackNavigationProp<SettingStackParamList>>();
  const dispatch = useDispatch();
  const settings = [
    {
      name: 'Account',
      title: 'Your Account',
      subLabel: 'Change and edit account',
      icon: 'user',
      onPress: () => navigate('Account'),
    },
    {
      name: 'DeviceSettings',
      title: 'Device',
      subLabel: 'Change the language, auto-lock and more',
      icon: 'smartphone',
      onPress: () => navigate('DeviceSetting'),
    },
  ];
  return (
    <View
      style={{
        ...styles.settingsContainer,
        justifyContent: 'space-between',
      }}>
      <View>
        {settings.map((tab) => (
          <OptionTab
            style={{ paddingHorizontal: 10 }}
            key={tab.name}
            {...tab}
          />
        ))}
        <Text
          style={{
            ...typography.bodySmall,
            color: colors.label,
            marginTop: 30,
          }}>
          MetaMaster version 0.0.0
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Icon name={'info'} size={20} color={colors.purple} />
          <Text style={{ ...typography.button, color: colors.purple }}>
            About MetaMaster
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            cognitoSignout().then(() => {
              dispatch(resetWallet());
              dispatch(resetAuth());
              navigation.getParent()?.navigate('Splash1');
            });
          }}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 15,
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            backgroundColor: colors.redError,
            borderRadius: 10,
          }}>
          <Icon name="log-out" size={15} color="#FFF" />
          <Text style={{ color: '#FFF' }}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const settingScreens: Screen<SettingStackParamList>[] = [
  {
    stackScreenProps: { name: 'Settings', component: Settings },
    headerProps: {},
  },
  {
    stackScreenProps: { name: 'Account', component: Account },
    headerProps: {},
  },
  {
    stackScreenProps: { name: 'DeviceSetting', component: DeviceSetting },
    headerProps: { alternateTitle: 'Device Settings' },
  },
  {
    stackScreenProps: { name: 'BecomeMaster', component: BecomeMaster },
    headerProps: { alternateTitle: 'Become a Master' },
  },
  {
    stackScreenProps: { name: 'AccountDetails', component: AccountDetails },
    headerProps: { alternateTitle: 'Account Details' },
  },
  {
    stackScreenProps: { name: 'Language', component: Language },
    headerProps: {},
  },
  {
    stackScreenProps: { name: 'Security', component: Security },
    headerProps: {},
  },
  {
    stackScreenProps: { name: 'Metrics', component: Metric },
    headerProps: {},
  },
  {
    stackScreenProps: { name: 'Currency', component: Currency },
    headerProps: {},
  },
];

export const SettingsStack = () => {
  return (
    <settingStack.Navigator>
      {settingScreens.map(({ stackScreenProps, headerProps }) => (
        <settingStack.Screen
          key={stackScreenProps.name}
          {...stackScreenProps}
          options={(args) => stackHeader(args, headerProps)}
        />
      ))}
    </settingStack.Navigator>
    // <CameraScreen />
  );
};
