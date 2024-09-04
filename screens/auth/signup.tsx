import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import InputBox, { useInputReducer } from '@components/inputBox';
import { colors, typography } from '../../utils/utils';
import { PrimaryButton } from '@components/button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'App';
import RadioButton from '@components/radioButton';
import { cognitoRegister } from '../../utils/auth';
import { useDispatch } from 'react-redux';
import { setEmail, setUsername } from '../../redux/slices/authSlice';

const SignUp = () => {
  const usernameReducer = useInputReducer('');
  const emailReducer = useInputReducer('');
  const passwordReducer = useInputReducer('');
  const confirmPasswordReducer = useInputReducer('');

  const dispatch = useDispatch();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleRegister = async () => {
    const [username, email, password] = [
      usernameReducer[0],
      emailReducer[0],
      passwordReducer[0],
    ].map((value) => value.value);

    const res = await cognitoRegister({ username, email, password }).then(
      () => {
        dispatch(setEmail(email));
        dispatch(setUsername(username));
        navigation.navigate('Verification');
      }
    );
  };

  return (
    <SafeAreaView>
      <ScrollView style={{ marginHorizontal: 20 }}>
        <Text
          style={[typography.heading2, { textAlign: 'center', margin: 20 }]}>
          Create your Account
        </Text>
        <Text style={[typography.subheading1, styles.inputLabel]}>
          Username
        </Text>
        <InputBox reducer={usernameReducer} placeholder="Insert username" />
        <Text style={[typography.subheading1, styles.inputLabel]}>Email</Text>
        <InputBox reducer={emailReducer} placeholder="Insert email"></InputBox>
        <Text style={[typography.subheading1, styles.inputLabel]}>
          Password
        </Text>
        <InputBox
          reducer={passwordReducer}
          placeholder="Insert Password"
          secureTextEntry></InputBox>
        <View style={styles.passwordChecker}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>1 uppercase character</Text>
            <Text>1 lowercase character</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>1 number</Text>
            <Text>8 character minimum</Text>
          </View>
        </View>
        <Text style={[typography.subheading1, styles.inputLabel]}>
          Confirm Password
        </Text>
        <InputBox
          reducer={confirmPasswordReducer}
          placeholder="Confirm Password"
          secureTextEntry
        />
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <RadioButton onPress={() => {}} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>I agree to the </Text>
            <TouchableOpacity>
              <Text
                style={{ textDecorationLine: 'underline', fontWeight: '700' }}>
                Terms of Service
              </Text>
            </TouchableOpacity>
            <Text> and </Text>
            <TouchableOpacity>
              <Text
                style={{ textDecorationLine: 'underline', fontWeight: '700' }}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <PrimaryButton
            title="Sign Up"
            onPress={() => {
              handleRegister();
            }}
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
              Already a member?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LogIn');
              }}>
              <Text
                style={{
                  color: colors.purple,
                  textDecorationLine: 'underline',
                }}>
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
export default SignUp;
