import { PrimaryButton } from '@components/button';
import InputBox, { useInputReducer } from '@components/inputBox';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { baseStyles, typography } from '../../utils/utils';
import { SettingStackParamList } from '.';

export const AccountDetails = (
  props: NativeStackScreenProps<SettingStackParamList, 'DeviceSetting'>
) => {
  const [newUsername, setNewUsername] = useInputReducer();
  const [newEmail, setNewEmail] = useInputReducer();
  const [newPassword, setNewPassword] = useInputReducer();

  return (
    <View
      style={[
        baseStyles.container,
        { flex: 1, justifyContent: 'space-between' },
      ]}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: 20,
          }}>
          <Image
            style={{ borderRadius: 50, width: 100, height: 100 }}
            source={require('../../assets/bottle.png')}
          />
          <TouchableOpacity
            style={{ borderWidth: 1, borderRadius: 10, padding: 10 }}>
            <Text>Upload Image</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={[typography.subheading1, { marginTop: 20 }]}>
            Username
          </Text>
          <InputBox
            reducer={[newUsername, setNewUsername]}
            placeholder={'JohnDoe_123'}
          />
        </View>
        <View>
          <Text style={[typography.subheading1, { marginTop: 20 }]}>Email</Text>
          <InputBox
            reducer={[newEmail, setNewEmail]}
            placeholder={'insert email'}
          />
        </View>
        <View>
          <Text style={[typography.subheading1, { marginTop: 20 }]}>
            Password
          </Text>
          <InputBox reducer={[newPassword, setNewPassword]} secureTextEntry />
        </View>
      </View>
      <PrimaryButton title={'Save Changes'} onPress={() => {}} />
    </View>
  );
};
