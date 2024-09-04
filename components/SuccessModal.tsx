import { baseStyles, screenWidth, typography } from '@utils/utils';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { PrimaryButton } from './button';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabBarParamList } from 'screens/tabs';
import { EventStackParamList } from 'screens/tabs/events';

const SuccessModal = () => {
  //how to go to a screen in another navigation stack?
  const navigation =
    useNavigation<NativeStackNavigationProp<EventStackParamList>>();
  return (
    <SafeAreaView style={[baseStyles.container]}>
      <View
        style={{
          marginVertical: 30,
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <Text style={[typography.heading3, { textAlign: 'center' }]}>
          You are attending the event
        </Text>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('@assets/celebration.png')} />
          <Text
            style={[
              typography.body,
              { marginVertical: 20, fontWeight: '700', textAlign: 'center' },
            ]}>
            Find it in my events!
          </Text>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <PrimaryButton
            title={'Check My Events'}
            onPress={() => {
              navigation.navigate('My Events');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SuccessModal;
