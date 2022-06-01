import React from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  TextInputProps as RNTextInputProps,
} from 'react-native';

import { Text } from './Text';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  labelText: {
    color: colors.gray,
    fontSize: 18,
    marginBottom: 10,
  },
  textInput: {
    fontSize: 14,
    fontWeight: '500',
    paddingBottom: 10,
  },
  border: {
    height: 1,
    backgroundColor: colors.border,
  },
  borderError: {
    backgroundColor: colors.error,
  },
  errorText: {
    marginTop: 5,
    color: colors.error,
  },
});

interface TextInputProps extends RNTextInputProps {
  label: string;
  errorText?: string;
}

export const TextInput = ({
  label,
  errorText = '',
  ...rest
}: TextInputProps) => {
  const borderStyles: StyleProp<ViewStyle> = [styles.border];

  if (errorText && errorText.length > 0) {
    borderStyles.push(styles.borderError);
  }

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.labelText]}>{label}</Text>
      <RNTextInput style={styles.textInput} {...rest} />
      <View style={borderStyles} />
      <Text style={[styles.errorText]}>{errorText}</Text>
    </View>
  );
};
