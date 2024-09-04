import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { useReducer } from 'react';

import {
  fontScale,
  screenHeight,
  screenWidth,
  typography,
} from '../utils/utils';
import Icon from 'react-native-vector-icons/Feather';

export enum InputActions {
  SET_VALUE,
  SET_ERROR,
}

export enum PasswordActions {
  CHANGE_VISIBILITY = 2,
}

type InputState = {
  value: string;
  errorMessage: string;
  visible?: boolean;
};

const inputInitialState = {
  value: '',
  errorMessage: '',
};

const inputReducer = (
  state: InputState,
  action: {
    type: InputActions | PasswordActions;
    payload?: string;
  }
) => {
  switch (action.type) {
    case InputActions.SET_VALUE:
      return {
        ...state,
        value: action.payload!,
        errorMessage: '',
      };
    case InputActions.SET_ERROR:
      return {
        ...state,
        errorMessage: action.payload!,
      };
    case PasswordActions.CHANGE_VISIBILITY:
      return {
        ...state,
        visible: !state.visible,
      };
    default:
      return state;
  }
};

export const useInputReducer = (value?: string) =>
  useReducer(inputReducer, { ...inputInitialState, value: value ?? '' });

type InputBoxProps = {
  reducer: [
    InputState,
    React.Dispatch<{
      type: InputActions | PasswordActions;
      payload?: string;
    }>
  ];
  label?: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
} & TextInputProps;

const InputBox = (props: InputBoxProps) => {
  const { reducer, label, contentContainerStyle, ...textInputProps } = props;
  const [{ value, errorMessage, visible }, dispatch] = reducer;
  return (
    <View style={{ paddingVertical: 10 }}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}

      <View
        style={[
          styles.textInputBox,
          props.contentContainerStyle,
          errorMessage !== '' && { borderColor: '#FF6969' },
        ]}>
        <TextInput
          value={value}
          placeholderTextColor="#989898"
          autoCorrect={false}
          {...{ ...textInputProps, children: undefined }}
          style={[styles.textInput, props.style]}
          secureTextEntry={props.secureTextEntry && !visible}
          onChangeText={(text) =>
            dispatch({ type: InputActions.SET_VALUE, payload: text })
          }
        />
        {props.children}
        {props.secureTextEntry && (
          <TouchableOpacity
            onPress={() =>
              dispatch({ type: PasswordActions.CHANGE_VISIBILITY })
            }>
            {!visible ? (
              <Icon name={'eye'} size={20} />
            ) : (
              <Icon name={'eye-off'} size={20} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {errorMessage !== '' && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  showHideImage: {
    height: (screenHeight * 20) / 670,
    width: (screenHeight * 20) / 670,
    resizeMode: 'contain',
  },
  textInput: {
    color: '#989898',
    height: (screenHeight * 45) / 670,
    fontSize: fontScale * 16,
    flex: 1,
  },
  textInputBox: {
    width: '100%',
    paddingHorizontal: (screenWidth * 10) / 375,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 7,
    alignItems: 'center',
    height: (screenHeight * 50) / 670,
    flexDirection: 'row',
    borderColor: '#646464',
  },
  error: {
    color: '#FF6969',
    fontSize: fontScale * 12,
    marginTop: 5,
    marginLeft: 5,
  },
  inputLabel: {
    ...typography.body,
    fontWeight: '700',
  },
});
