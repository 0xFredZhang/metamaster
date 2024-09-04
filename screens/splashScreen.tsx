import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { baseStyles, colors, screenWidth, typography } from '../utils/utils';
import { PrimaryButton } from '@components/button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'App';
import LogoSVG from '@assets/logo_horizontal.svg';
import { Auth } from 'aws-amplify';
// import config from '../src/aws-exports.json';
import api from '../utils/api';

// Auth.configure(config);
const SplashScreenLogin = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={[baseStyles.container, { alignItems: 'center' }]}>
      <View style={{ flex: 1.5, flexDirection: 'column-reverse' }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LogoSVG />
          <Text
            style={[
              typography.heading2,
              {
                color: colors.purple,
                flexDirection: 'column-reverse',
                textAlign: 'center',
                padding: 30,
                marginTop: 30,
              },
            ]}>
            NFT Platform for wine and cigars collectors
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          width: screenWidth,
          flexDirection: 'column-reverse',
        }}>
        <View style={{ marginHorizontal: 20, gap: 10 }}>
          <PrimaryButton
            title="Log In"
            onPress={() => {
              navigation.navigate('LogIn');
            }}
          />
          <View
            style={{
              gap: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
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
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Image
        style={{
          position: 'absolute',
          width: screenWidth,
          top: 0,
          zIndex: -1,
        }}
        source={require('@assets/background2.png')}
      />
    </SafeAreaView>
  );
};

const SplashScreen = () => {
  return (
    <SafeAreaView style={[baseStyles.container, { alignItems: 'center' }]}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Image source={require('@assets/logo_vertical.png')} />
      </View>
      <View
        style={{
          flex: 1,
          width: screenWidth,
          flexDirection: 'column-reverse',
          alignItems: 'flex-end',
        }}>
        <Text
          style={[
            typography.heading2,
            {
              color: colors.mainBg,
              flexDirection: 'column-reverse',
              padding: 50,
            },
          ]}>
          Enjoy the wine. {'\n'}Collect the moments.
        </Text>
      </View>
      <Image
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: screenWidth,
          zIndex: -1,
        }}
        source={require('@assets/background1.png')}
      />
    </SafeAreaView>
  );
};

export { SplashScreen, SplashScreenLogin };
