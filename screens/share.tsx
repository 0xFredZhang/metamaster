import { View, Text, StyleSheet, Alert } from 'react-native';
import React from 'react';
import InputBox, { useInputReducer } from '@components/inputBox';
import { baseStyles, colors, typography } from '../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faDiscord,
  faFacebook,
  faInstagram,
  faLinkedinIn,
  faTwitch,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const icons = [
  faInstagram,
  faLinkedinIn,
  faFacebook,
  faTwitter,
  faTwitch,
  faDiscord,
];
const Share = () => {
  const [comment, setComment] = useInputReducer('');
  return (
    <View
      style={{
        ...baseStyles.container,

        backgroundColor: colors.line,
        paddingTop: 10,
        paddingHorizontal: 20,
      }}>
      <Text style={{ ...typography.subheading2, fontWeight: '700' }}>
        Say something about this
      </Text>
      <InputBox reducer={[comment, setComment]} />
      <View
        style={{
          paddingTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {icons.map((icon, id) => (
          <TouchableOpacity
            key={`${icon}${id}`}
            style={{
              padding: 10,
              backgroundColor: '#FFF',
              borderRadius: 30,
              zIndex: -2,
            }}
            onPress={() => Alert.alert('share')}>
            <FontAwesomeIcon
              style={{ ...styles.icons }}
              size={25}
              icon={icon}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icons: {
    color: colors.mainPink,
  },
});
export default Share;
