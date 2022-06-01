import React from 'react';
import { StyleSheet, Text as RNText, StyleProp, TextStyle } from 'react-native';

import colors from '../constants/colors';

const styles = StyleSheet.create({
  text: {
    color: colors.primary,
    fontSize: 16,
  },
  headerText: {
    fontWeight: '600',
    fontSize: 32,
    marginBottom: 12,
  },
  subHeaderText: {
    color: colors.gray,
    fontSize: 20,
    marginBottom: 12,
    marginTop: -12, // assum this shows up under a headerText
  },
});

type TextProps = {
  type?: 'header' | 'subheader';
  children: string;
  style?: StyleProp<TextStyle>[];
};

export const Text = ({ type, children, style = [] }: TextProps) => {
  let textStyles: StyleProp<TextStyle>[] = [styles.text];

  if (type === 'header') {
    textStyles.push(styles.headerText);
  } else if (type === 'subheader') {
    textStyles.push(styles.subHeaderText);
  }

  textStyles = [...textStyles, ...style];

  return <RNText style={textStyles}>{children}</RNText>;
};
