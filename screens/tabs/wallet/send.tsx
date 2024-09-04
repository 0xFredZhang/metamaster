import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { baseStyles, colors, typography } from '../../../utils/utils';
import InputBox, { InputActions, useInputReducer } from '@components/inputBox';
import { PrimaryButton } from '@components/button';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'App';
import { WalletStackParamList } from '.';
import VirtualKeyboard from 'react-native-virtual-keyboard';
import { RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import api from '@utils/api';

const Send = () => {
  const { balance } = useSelector((state: RootState) => state.wallet);
  const addressReducer = useInputReducer();
  const amountReducer = useInputReducer();

  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList & WalletStackParamList>
    >();
  return (
    <View style={[baseStyles.container]}>
      {/* token balance */}
      <View style={{ flexDirection: 'row', paddingVertical: 20, gap: 20 }}>
        <Image
          style={{
            width: 40,
            height: 40,
            resizeMode: 'contain',
          }}
          source={require('@assets/logo_mini.png')}
        />
        <View style={{ justifyContent: 'center' }}>
          <Text style={typography.heading1}>MeMa Token</Text>
          <Text>{`${balance} MMT`}</Text>
        </View>
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: colors.line }} />

      {/* form */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <View>
            <InputBox
              reducer={addressReducer}
              label="Recipient Address"
              placeholder="Insert Address or scan QR">
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('QrScanner');
                }}>
                <IconAnt name="scan1" size={25} />
              </TouchableOpacity>
            </InputBox>
            <InputBox
              onBlur={() => Keyboard.dismiss}
              reducer={amountReducer}
              label="Amount"
              placeholder="Insert amount you want to send">
              <TouchableOpacity onPress={() => {}}>
                <Text style={{ color: colors.mainPink, fontWeight: '700' }}>
                  MAX
                </Text>
              </TouchableOpacity>
            </InputBox>
          </View>
          <PrimaryButton
            title="Send"
            onPress={() => {
              const [recipient, amount] = [
                addressReducer[0],
                amountReducer[0],
              ].map((value) => value.value);

              navigation.navigate('SendConfirmation', {
                recipient,
                amount,
              });
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

// const EnterAmount = () => {
//   const { balance } = useSelector((state: RootState) => state.wallet);
//   const [amount, setAmount] = useState(0);
//   const navigation =
//     useNavigation<NativeStackNavigationProp<WalletStackParamList>>();

//   return (
//     <View
//       style={{
//         ...baseStyles.container,
//         justifyContent: 'space-between',
//       }}>
//       <View
//         style={{
//           flex: 1,
//           alignItems: 'center',
//           justifyContent: 'space-between',
//         }}>
//         <View
//           style={{
//             paddingTop: 25,
//             alignItems: 'center',
//             gap: 10,
//           }}>
//           <Text style={{ ...typography.heading1 }}>{amount}</Text>
//           <Text
//             style={{
//               ...typography.heading1,
//               fontWeight: '600',
//               color: colors.label,
//             }}>
//             MMT
//           </Text>
//           <Text style={{ ...typography.subheading1, color: colors.label }}>
//             Available: {balance} MMT
//           </Text>
//         </View>
//         <View style={{ height: '60%', width: '100%' }}>
//           <VirtualKeyboard
//             color="black"
//             cellStyle={{
//               flex: 1,
//               borderWidth: 1,
//               margin: 1,
//               borderRadius: 5,
//               borderColor: colors.line,
//               padding: 10,
//             }}
//             decimal
//             pressMode="string"
//             style={{ color: colors.greenSuccess }}
//             onPress={(e: number) => {
//               setAmount(e);
//             }}
//           />
//         </View>
//       </View>
//       <PrimaryButton title="Next" onPress={() => navigation.goBack()} />
//     </View>
//   );
// };
export { Send };
