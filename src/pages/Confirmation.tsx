import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { Button } from '../components/Button';

interface Params {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug';
  nextScreen: string;
}

const emojis = {
  hug: '🤗',
  smile: '😄',
}

export function Confirmation() {
  const navigation = useNavigation();
  const routes = useRoute();

  const { title, subtitle, buttonTitle, icon, nextScreen } = routes.params as Params;

  function handleMoveOn() {
    navigation.navigate(nextScreen);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.emoji}>{emojis[icon]}</Text>
          <Text style={styles.title}>
            {title}
          </Text>
          <Text style={styles.subtitle}>
            {subtitle}
          </Text>
        </View>
        <View style={styles.footer}>
          <Button title={buttonTitle} onPress={handleMoveOn} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    flex: 1,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  header: {
    alignItems: 'center',
  },

  emoji: {
    fontSize: 78,
  },

  title: {
    fontSize: 24,
    lineHeight: 30,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 50,
  },

  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    color: colors.heading,
    lineHeight: 25,
    marginBottom: 5,
    fontFamily: fonts.text,
    marginTop: 20
  },

  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 50,
  }
})