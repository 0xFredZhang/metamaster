import { View, Text, StyleSheet, Button } from 'react-native';
import React, { useState } from 'react';
import InputBox, { useInputReducer } from '@components/inputBox';
import { SafeAreaView } from 'react-native-safe-area-context';
import { baseStyles, colors, typography } from '../../utils/utils';
import { PrimaryButton } from '@components/button';
import { ScrollView } from 'react-native-gesture-handler';

const BecomeMaster = () => {
  const [firstname, setFirstname] = useInputReducer('');
  const [lastname, setLastname] = useInputReducer('');
  const [email, setEmail] = useInputReducer('');
  const [password, setPassword] = useInputReducer('');

  return (
    <View style={[styles.container, baseStyles.container]}>
      <ScrollView>
        <Text style={[typography.subheading1, styles.inputLabel]}>
          Firstname
        </Text>
        <InputBox reducer={[firstname, setFirstname]}></InputBox>
        <Text style={[typography.subheading1, styles.inputLabel]}>
          Lastname
        </Text>
        <InputBox reducer={[lastname, setLastname]}></InputBox>
        <Text style={[typography.subheading1, styles.inputLabel]}>Email</Text>
        <InputBox reducer={[email, setEmail]}></InputBox>
        <Text style={[typography.subheading1, styles.inputLabel]}>
          Password
        </Text>
        <InputBox reducer={[password, setPassword]} secureTextEntry></InputBox>
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
        <InputBox reducer={[password, setPassword]} secureTextEntry />
      </ScrollView>
      <View>
        <PrimaryButton title="Send Application" onPress={() => {}} />
      </View>
    </View>
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
export default BecomeMaster;
