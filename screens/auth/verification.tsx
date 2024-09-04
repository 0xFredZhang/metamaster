import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { baseStyles, colors, typography } from '../../utils/utils';
import { PrimaryButton } from '@components/button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'App';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { cognitoConfirmSignup, getAuthUser } from '../../utils/auth';
import { setJWT } from '../../redux/slices/authSlice';
import api from '@utils/api';
import { InitializeApp, initialize } from '@components/InitializeApp';

const Verified = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const getJWT = async () => {
    const token = await getAuthUser().then((res) => {
      return res.signInUserSession.idToken.jwtToken;
    });
    console.log('jwt received:', token);
    dispatch(setJWT(token));
  };

  useFocusEffect(
    useCallback(() => {
      getJWT();
      //initialize the app like login
      initialize();
    }, [])
  );

  return (
    <SafeAreaView
      style={[baseStyles.container, { justifyContent: 'space-between' }]}>
      <InitializeApp />
      <View
        style={{ flex: 2.5, justifyContent: 'center', paddingHorizontal: 50 }}>
        <Text
          style={{
            color: colors.purple,
            textAlign: 'center',
            fontSize: 32,
          }}>
          Your Account has been verified!
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          flexDirection: 'column-reverse',
        }}>
        <PrimaryButton
          title={'Start'}
          onPress={() => {
            navigation.navigate('TabBar');
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const Verification = () => {
  const email = useSelector((state: RootState) => state.auth.email);
  const username = useSelector((state: RootState) => state.auth.username);
  const [verificationNumber, setVerificationNumber] = useState('');
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleVerification = async () => {
    if (!email || !verificationNumber) {
      console.log('email or verification is null');
      return;
    }

    await cognitoConfirmSignup(email, verificationNumber).then((res) => {
      //create account on mongo
      api.user
        .post('/create/user', {
          email,
          username,
        })
        .then((res) => {
          console.log('user succesfully created');
          navigation.navigate('Verified');
        })
        .catch((err) => {
          console.log('error when creating account', err);
        });
      return res;
    });
  };

  return (
    <SafeAreaView
      style={[baseStyles.container, { justifyContent: 'space-between' }]}>
      <View>
        <Text
          style={[
            typography.heading2,
            { textAlign: 'center', marginVertical: 20 },
          ]}>
          Account Verification
        </Text>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}>
          <Text>We sent verification code to your email:</Text>
          <Text>{email}</Text>
          <Text>
            {`\n\n`}
            If you did not receive it,{' '}
            <TouchableOpacity>
              {/* <Text style={{ textDecorationLine: 'underline' }}> */}
              <Text>click here</Text>
            </TouchableOpacity>
          </Text>
          <Text>to resend the confirmation code.</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <TextInput
          style={styles.verificationNumber}
          keyboardType="numeric"
          value={verificationNumber}
          onChangeText={(e) => {
            setVerificationNumber(e);
          }}
        />
      </View>
      <View style={{ paddingHorizontal: 20, gap: 20 }}>
        <PrimaryButton
          title={'Confirm'}
          onPress={() => {
            handleVerification();
          }}
        />
        <TouchableOpacity
          style={{
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: colors.purple,
              borderBottomWidth: 1,
              borderBottomColor: colors.purple,
            }}>
            Send the code again
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  verificationNumber: {
    borderBottomWidth: 1,
    fontSize: 100,
  },
});
export { Verification, Verified };
