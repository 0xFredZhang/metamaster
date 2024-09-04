import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import React from 'react';
import { baseStyles } from '../../utils/utils';
import { PrimaryButton } from '@components/button';
import {
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { EventStackParamList } from './events';
import { HomeStackParamList } from './home';

export interface QrProps {
  type: 'poap' | 'stamp' | 'address';
  id: string;
}

const QrConfirm = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<EventStackParamList & HomeStackParamList>
    >();
  const route = useRoute();
  const { type, id } = route.params;

  const label =
    type === 'poap'
      ? 'poap name '
      : type === 'stamp'
      ? 'stamp name '
      : 'Address: ';

  return (
    <View style={[baseStyles.container, styles.container]}>
      <View
        style={{
          alignItems: 'center',
          paddingTop: '40%',
        }}>
        <Image
          style={{ resizeMode: 'contain', width: 200, height: 200 }}
          source={require('@assets/QR.png')}
        />
        <Text style={{ paddingTop: 40 }}>
          {label}
          <Text style={{ fontWeight: '700' }}>{id}</Text>
        </Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 10, paddingVertical: 30 }}>
        <View style={{ width: '50%' }}>
          <PrimaryButton
            type="secondary"
            title="Scan again"
            onPress={() => {
              navigation.navigate('QrScanner');
            }}
          />
        </View>
        <View style={{ width: '50%' }}>
          <PrimaryButton
            title="Continue"
            onPress={() => {
              Alert.alert(
                'Poap Collected!',
                'Find it in your POAPs collection',
                [
                  {
                    text: 'Check Collection',
                    onPress: () => navigation.navigate('Events'),
                    style: 'default',
                  },
                ]
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default QrConfirm;
