import React from 'react';
import { SafeAreaView, Text, Image, View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Feather } from '@expo/vector-icons';

import fonts from '../styles/fonts';
import colors from '../styles/colors';

import watering from '../assets/watering.png';

export function Welcome() {
  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate('UserIdentification');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie {'\n'}
          suas plantas de  {'\n'}
          forma fácil</Text>
        <Image source={watering} style={styles.image} resizeMode="contain" />
        <View style={styles.subtitle}>
          <Text style={styles.subtitleText}>Não esqueça mais de regar suas plantas.</Text>
          <Text style={styles.subtitleText}>Nós cuidamos de lembrar você sempre que precisar!</Text>
        </View>
        <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleStart}>
          <Feather name="chevron-right" style={styles.buttonIcon} />
        </TouchableOpacity>
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
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30
  },

  title: {
    fontSize: 28,
    textAlign: 'center',
    color: colors.heading,
    marginTop: 38,
    fontFamily: fonts.heading,
    lineHeight: 34
  },

  subtitle: {
    paddingHorizontal: 20,
  },

  subtitleText: {
    fontSize: 17,
    textAlign: 'center',
    color: colors.heading,
    lineHeight: 25,
    marginBottom: 5,
    fontFamily: fonts.text,
  },

  image: {
    height: Dimensions.get('window').width * 0.7,
  },

  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    height: 56,
    width: 56,
  },

  buttonIcon: {
    color: colors.white,
    fontSize: 20,
  }
})