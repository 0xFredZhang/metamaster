import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import TabBar, { stackHeader } from './screens/tabs';
import LogIn from './screens/auth/login';
import SignUp from './screens/auth/signup';
import { Verification, Verified } from './screens/auth/verification';
import { SplashScreen, SplashScreenLogin } from './screens/splashScreen';
import QrConfirm, { QrProps } from './screens/tabs/QrConfirm';
import QrScanner from './screens/tabs/QrScanner';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { colors, screenHeight } from './utils/utils';
import Receive from './screens/tabs/wallet/receive';
import SendConfirmation from './screens/tabs/wallet/sendConfirmation';
import Share from './screens/share';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';
import { AuthProtection } from './utils/auth';
import { PersistGate } from 'redux-persist/integration/react';
import { Amplify } from 'aws-amplify';
// import awsconfig from './src/aws-exports';

// Amplify.configure(awsconfig);

export type RootStackParamList = {
  TabBar: undefined;
  LogIn: undefined;
  SignUp: undefined;
  Verification: undefined;
  Verified: undefined;
  Splash: undefined;
  Splash1: undefined;
  QrScanner: undefined;
  QrConfirm: QrProps;
  Share: undefined;
  Receive: undefined;
  SendConfirmation: {
    recipient: string;
    amount: string;
    description?: string;
  };
};
const Stack = createStackNavigator<RootStackParamList>();
const screenOptions: StackNavigationOptions = { headerShown: false };

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      {/* <AuthProtection> */}
      <PersistGate persistor={persistor}>
        <Stack.Navigator {...{ screenOptions }}>
          <Stack.Screen name="Splash1" component={SplashScreenLogin} />
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Verification" component={Verification} />
          <Stack.Screen name="Verified" component={Verified} />
          <Stack.Screen name="QrScanner" component={QrScanner} />
          <Stack.Screen name="QrConfirm" component={QrConfirm} />
          <Stack.Group
            screenOptions={{
              cardStyle: {
                marginTop: screenHeight * 0.3,
                borderRadius: 20,
              },
              headerShown: true,
              headerStyle: { backgroundColor: colors.line },
              gestureEnabled: true,
              gestureResponseDistance: screenHeight,
              presentation: 'modal',
              cardStyleInterpolator:
                CardStyleInterpolators.forModalPresentationIOS,
            }}>
            <Stack.Screen
              name="Receive"
              component={Receive}
              options={(args) =>
                stackHeader(args, { alternateTitle: 'Receive' })
              }
            />
            <Stack.Group
              screenOptions={{
                cardStyle: {
                  marginTop: screenHeight * 0.5,
                  borderRadius: 20,
                },
              }}>
              <Stack.Screen
                name="SendConfirmation"
                component={SendConfirmation}
                options={(args) =>
                  stackHeader(args, { alternateTitle: 'Confirmation' })
                }
              />
              <Stack.Screen
                name="Share"
                component={Share}
                options={(args) => stackHeader(args, {})}
              />
            </Stack.Group>
          </Stack.Group>
          <Stack.Screen component={TabBar} name="TabBar" />
        </Stack.Navigator>
      </PersistGate>

      {/* </AuthProtection> */}
    </NavigationContainer>
  </Provider>
);

export default App;
