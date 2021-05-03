import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import userImg from '../assets/foto-perfil.jpg';

export function Header() {
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    async function loadStorageUsername() {
      const user = await AsyncStorage.getItem('@plantmanager:user');
      setUserName(user || '');
    }

    loadStorageUsername();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titleGreeting}>Olá,</Text>
        <Text style={styles.titleName}>{userName}</Text>
      </View>
      <Image source={userImg} style={styles.userImage} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    marginTop: getStatusBarHeight(),
  },

  titleGreeting: {
    fontSize: 36,
    lineHeight: 44,
    color: colors.heading,
    fontFamily: fonts.text,
  },

  titleName: {
    fontSize: 36,
    lineHeight: 44,
    color: colors.heading,
    fontFamily: fonts.heading,
  },

  userImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  }
})