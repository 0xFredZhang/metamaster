import React from 'react';
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { typography } from '../../utils/utils';
import { HomeStackParamList } from './home';
import Header from '@components/header';

export interface HeaderProps {
  rightItems?: {
    icon: string;
    iconSet: 'Feather' | 'AntDesign';
    onPress?: (event: GestureResponderEvent) => void;
  }[];
  leftItems?: {
    icon: string;
  };
  withSearch?: boolean;
  alternateTitle?: string;
}

const header = (
  stackScreenProps: NativeStackScreenProps<HomeStackParamList>,
  headerProps: HeaderProps
) => {
  const { route, navigation } = stackScreenProps;
  const { leftItems, rightItems, withSearch } = headerProps;
  if (withSearch !== undefined)
    return { header: () => <Header {...{ withSearch }} /> };
  return {
    headerTitle: () => (
      <Text style={typography.heading2}>
        {headerProps.alternateTitle
          ? headerProps.alternateTitle
          : route.name.split('_').join(' ')}
      </Text>
    ),
    headerLeft: () => (
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => navigation.goBack()}>
        <Icon name={leftItems?.icon ?? 'chevron-left'} size={24} />
      </TouchableOpacity>
    ),
    headerRight: () => {
      return (
        <View style={{ flexDirection: 'row' }}>
          {rightItems?.map(({ icon, iconSet, onPress }) => (
            <View style={{ marginRight: 20 }} key={`${icon}-${iconSet}`}>
              <TouchableOpacity {...{ onPress }}>
                {iconSet === 'Feather' ? (
                  <Icon name={icon} size={24} />
                ) : (
                  <Icon1 name={icon} size={24} />
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      );
    },
  };
};

export default header;
