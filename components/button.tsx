import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React, { Touch } from 'react';
import { colors, typography } from '../utils/utils';

type ButtonProps = {
  title: string;
  disabled?: boolean;
  type?: 'primary' | 'secondary';
} & TouchableOpacityProps;

const PrimaryButton = (props: ButtonProps) => {
  let variantButton, variantText;
  if (props.type === 'secondary') {
    variantButton = styles.secondaryButton;
    variantText = styles.secondaryText;
  } else if (props.disabled) {
    variantButton = styles.disableButton;
    variantText = styles.disableText;
  } else {
    variantButton = styles.primaryButton;
    variantText = styles.primaryText;
  }

  return (
    <TouchableOpacity
      {...props}
      style={[styles.container, props.style, variantButton]}>
      <Text style={[typography.button, variantText]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: colors.purple,
  },
  primaryText: {
    color: 'white',
    textAlign: 'center',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.purple,
  },
  secondaryText: {
    color: 'purple',
    textAlign: 'center',
  },
  disableButton: {
    backgroundColor: colors.inputBackground,
    borderColor: colors.inputBackground,
  },
  disableText: {
    color: colors.mainBg,
    textAlign: 'center',
  },
});
export { PrimaryButton };
