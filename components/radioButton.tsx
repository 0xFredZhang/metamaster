import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../utils/utils';
import Icon from 'react-native-vector-icons/Feather';
const RadioButton = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <TouchableOpacity onPress={() => setToggle((prev) => !prev)}>
      <View style={toggle ? styles.selected : styles.unselected}>
        {toggle && (
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
});

export default RadioButton;
