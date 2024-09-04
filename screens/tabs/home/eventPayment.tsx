import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { baseStyles, colors, typography } from '../../../utils/utils';
import { PrimaryButton } from '@components/button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '.';
import RadioButton from '@components/radioButton';
import { MMEventDetails } from '@utils/types';
import api from '@utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { addAttendingEvents } from '../../../redux/slices/walletSlice';
import Loader from '@components/loader';

const EventPayment = () => {
  const route = useRoute<RouteProp<HomeStackParamList, 'Event_Payment'>>();
  const event: MMEventDetails = route.params;
  const { balance, attendingEvents } = useSelector(
    (state: RootState) => state.wallet
  );
  console.log('event details at event payment', event);

  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const currentBalance = 5000;
  return (
    <SafeAreaView
      style={[baseStyles.container, { justifyContent: 'space-between' }]}>
      {isLoading ? (
        <Loader />
      ) : (
        <View>
          <Text style={{ textAlign: 'center', padding: 20 }}>
            Fee for attendance for {event.title}. After this you will be be
            listed on the list of attendees and you will have access to event on
            the day of the event.
          </Text>
          <View style={{ gap: 15, padding: 20 }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>MMT Balance</Text>
              <Text>{balance} MMT</Text>
            </View>
            <View
              style={[
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                },
              ]}>
              <Text
                style={{
                  color: event.entryCost > currentBalance ? 'red' : undefined,
                }}>
                Entry Cost
              </Text>
              <Text style={{ fontWeight: '700' }}>{event.entryCost} MMT</Text>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: colors.borderGrey,
              }}
            />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>Balance after payment</Text>
              <Text>{balance! - event.entryCost} MMT</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', padding: 10 }}>
            <RadioButton />
            <Text style={{ ...typography.body, paddingHorizontal: 10 }}>
              By clicking “Pay entry cost”, you confirm that you have read,
              understand, and accept our Terms of Use.
            </Text>
          </View>
        </View>
      )}

      <PrimaryButton
        title="Pay entry cost"
        onPress={() => {
          const handlePayment = async () => {
            if (event.entryCost > balance!) throw new Error('not enough MMT');

            await api.event
              .post('/attendance/create', { event: event._id })
              .then((message) => {
                console.log('returned ', message);
                navigation.navigate('Success_Modal');
                dispatch(addAttendingEvents(event));
              })
              .catch((err) => {
                Alert.alert('Error with Attending ', err.toString());

                //show error ui?
              });
          };
          handlePayment();
        }}
      />
    </SafeAreaView>
  );
};

// const ConfirmPayment = (id: number, cost: number) => {
//   const navigation =
//     useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
//   const [password, setPassword] = useInputReducer();
//   return (
//     <SafeAreaView
//       style={[baseStyles.container, { justifyContent: 'space-between' }]}>
//       <View style={{ paddingHorizontal: 20, gap: 20 }}>
//         <Text style={{ textAlign: 'center' }}>
//           To continue, please enter your password
//         </Text>
//         <View>
//           <Text style={{ fontWeight: '700' }}>Enter Password</Text>
//           <InputBox reducer={[password, setPassword]} secureTextEntry />
//         </View>
//       </View>
//       <PrimaryButton
//         title="continue"
//         onPress={() => {
//           navigation.popToTop();
//         }}
//       />
//     </SafeAreaView>
//   );
// };

export { EventPayment };
