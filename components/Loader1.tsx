import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Loader1 = () => {
  return (
    <View>
      <Text>Loader1</Text>
    </View>
  );
};

export default Loader1;

const styles = StyleSheet.create({
  svg: {
    position: 'absolute',
  },
  ball: {
    width: '48px',
    height: '48px',
    borderRadius: 50,
    background: 'linear-gradient(225deg, #2DC7ED 0%, #538BF0 100%)',
  },

  ball:nth-child(1){
    animation: balls .7s ease-in-out infinite alternate;
  }
  
  ball:nth-child(2){
    animation: balls .7s ease-in-out infinite alternate-reverse;
  }
  
  @keyframes balls {
    from{
      transform: translate3d(-48px,0,0);
    }
    to{
      transform: translate3d(48px,0,0);
    }
  }
  
});
