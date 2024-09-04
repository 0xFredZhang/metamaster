import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';

const Loader = (props: ActivityIndicatorProps) => (
  <View style={styles.container}>
    <ActivityIndicator
      {...props}
      style={[StyleSheet.absoluteFill, styles.loader, props.style]}
    />
  </View>
);

export default Loader;

const styles = StyleSheet.create({
  container: { flex: 1 },
  loader: { justifyContent: 'center', alignItems: 'center' },
});
