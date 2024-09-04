import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { baseStyles, colors, typography } from '../../utils/utils';
import InputBox, { useInputReducer } from '@components/inputBox';
import { PrimaryButton } from '@components/button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'App';
import RadioButton from '@components/radioButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  setEmail,
  setJWT,
  setProfilePicture,
  setUsername,
  setWalletAddress,
} from '../../redux/slices/authSlice';
import { getAuthUser, login } from '../../utils/auth';
import Icon from 'react-native-vector-icons/Feather';
import api from '@utils/api';
import { setAttendingEvents, setBalance } from '../../redux/slices/walletSlice';
import { RootState } from 'redux/store';
import { MMT_TOKEN_ID } from '@utils/const';
import { MMEventDetails } from '@utils/types';
import getUploadedFile from '@utils/storage/getUploadedFile';

const LogIn = () => {
  const dispatch = useDispatch();
  const emailReducer = useInputReducer();
  const passwordReducer = useInputReducer();
  const [pressed, setPressed] = useState(false);
  const { walletAddress } = useSelector((state: RootState) => state.auth);

  const handleLogin = async () => {
    const [email, password] = [emailReducer[0], passwordReducer[0]].map(
      (value) => value.value
    );

    await login(email, password)
      .then(async (token) => {
        dispatch(setJWT(token));
        dispatch(setEmail(email));
        console.log('jwt: ', token);
        if (token) {
          navigation.navigate('TabBar');
        }
        // get username from aws
        await getAuthUser()
          .then((user) => {
            dispatch(setUsername(user.attributes['custom:username']));
          })
          .catch((err) => console.log(err));

        //get wallet, profile picture
        await api.user
          .get('/info')
          .then(async (res) => {
            console.log('userInfo', JSON.stringify(res, null, 2));

            dispatch(setWalletAddress(res.walletAddr));
            const image = await getUploadedFile(res.profilePic);
            dispatch(setProfilePicture(image));
          })
          .catch((err) => {
            console.log("couldn't get walletaddress");
          });

        // get Wallet State (attending events)
        await api.event.get('/attendance/list/user').then(async (events) => {
          const myEventList: MMEventDetails[] = await Promise.all(
            events.map(
              async (event: { _id: number; event: { _id: number } }) => {
                return await api.event
                  .get(`/id/${event.event._id}`)
                  .then(async ({ imageUrl, host, ...event }) => {
                    const hostImage = await getUploadedFile(host.profilePic);
                    const image = await getUploadedFile(imageUrl);
                    return {
                      ...event,
                      host: { ...host, profilePic: hostImage },
                      imageUrl: image,
                    };
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            )
          );
          dispatch(setAttendingEvents(myEventList));
        });

        // get Wallet State (Poaps)

        // get token balance in wallet
        await fetch(
          `https://veldidina-vsys.herokuapp.com/contract/balance/${walletAddress}/${MMT_TOKEN_ID}`
        )
          .then(async (res) => {
            await res
              .json()
              .then((walletRes) => {
                dispatch(setBalance(walletRes.balance));
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log('veldidina error: ', err));
      })
      .catch((err) => console.log(err));
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={[styles.container, baseStyles.container]}>
      <View style={{ paddingHorizontal: 20 }}>
        <Text
          style={[typography.heading2, { textAlign: 'center', margin: 40 }]}>
          Log In
        </Text>

        <Text style={[typography.subheading1, styles.inputLabel]}>Email</Text>
        <InputBox reducer={emailReducer} placeholder={'input email'}></InputBox>
        <Text style={[typography.subheading1, styles.inputLabel]}>
          Password
        </Text>
        <InputBox
          reducer={passwordReducer}
          placeholder={'input password'}
          secureTextEntry></InputBox>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <TouchableOpacity onPress={() => setPressed((prev) => !prev)}>
              <View style={pressed ? styles.selected : styles.unselected}>
                {pressed && (
                  <Icon
                    name="check"
                    size={20}
                    style={{
                      color: '#FFF',
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
            <Text>Remember Me</Text>
          </View>
          <TouchableOpacity>
            <Text style={{ textDecorationLine: 'underline' }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginHorizontal: 20, gap: 10 }}>
        <PrimaryButton
          disabled={!pressed}
          title="Log In"
          onPress={() => handleLogin()}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              padding: 10,
              textAlign: 'center',
              color: colors.purple,
              justifyContent: 'center',
            }}>
            Not a member?
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text
              style={{
                color: colors.purple,
                textDecorationLine: 'underline',
              }}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  unselected: {
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 6,
  },
  selected: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: colors.mainPink,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  valid: {
    color: colors.purple,
  },
  passwordChecker: {
    marginVertical: 10,
  },
  inputLabel: {
    marginTop: 20,
  },
});

export default LogIn;
