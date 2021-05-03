import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentButtonProps extends RectButtonProps {
  title: string;
  active?: boolean
}

export function EnvironmentButton({ title, active = false, ...rest }: EnvironmentButtonProps) {
  return (
    <RectButton style={[styles.button, active && styles.buttonActive]} {...rest}>
      <Text style={[styles.buttonText, active && styles.buttonTextActive]}>{title}</Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.shape,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    paddingHorizontal: 15
  },

  buttonText: {
    color: colors.heading,
    fontSize: 16,
    fontFamily: fonts.text
  },

  buttonActive: {
    backgroundColor: colors.green_light,
  },

  buttonTextActive: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
  }
})