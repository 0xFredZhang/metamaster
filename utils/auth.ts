import { NavigationProp, useNavigation } from '@react-navigation/native';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { RootStackParamList } from 'App';
import { Auth } from 'aws-amplify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { RegisterCredentials } from './types';

export const AuthProtection = (props: { children: JSX.Element }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const jwt = useSelector((state: RootState) => state.auth.jwt);

  useEffect(() => {
    if (!jwt) {
      navigation.reset({ index: 0, routes: [{ name: 'Splash' }] });
      return;
    }
    console.log(jwt);

    navigation.reset({ index: 0, routes: [{ name: 'TabBar' }] });
  }, [jwt]);

  return props.children;
};

export const login = async (email: string, password: string) => {
  try {
    const token = await Auth.signIn(email, password).then((token) => {
      return token.signInUserSession.idToken.jwtToken;
    });

    return token;
  } catch (error) {
    console.log('error signing in', error);
  }
};

export const signUp = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const user = await Auth.signUp({
      username,
      password,
      attributes: { email },
    });
    console.log(user);
  } catch (error) {
    console.log('error signing up', error);
  }
};

export const cognitoRegister = async ({
  email,
  password,
  username,
}: RegisterCredentials) => {
  try {
    const { user } = await Auth.signUp({
      username: email,
      password,
      attributes: {
        'custom:username': username,
      },
    });
    console.log('user created', JSON.stringify(user, null, 2));
    return user;
  } catch (error) {
    console.log('error occured', error);
  }
};

export const cognitoConfirmSignup = async (email: string, code: string) => {
  try {
    await Auth.confirmSignUp(email, code);
  } catch (error) {
    console.log('error confirming sign up', error);
  }
};

export const cognitoSignout = async () => {
  try {
    await Auth.signOut().then((res) => console.log('signed out'));
  } catch (error) {
    console.log('error signing out: ', error);
  }
};

export const getAuthUser = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser().then((res) => {
      return res;
    });

    return user;
  } catch (error) {
    console.log('error signing in', error);
  }
};
