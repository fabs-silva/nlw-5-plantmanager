import React, { useState } from 'react';
import { ScrollView, Alert, Text, View, Image, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useNavigation, useRoute } from '@react-navigation/core';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';

import { Button } from '../components/Button';

import waterdrop from '../assets/waterdrop.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { PlantProps, savePlant } from '../libs/storage';

interface Params {
  plant: PlantProps;
}

export function SelectedPlant() {
  const [selectedDateTime, setSeletedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  const navigation = useNavigation();
  const route = useRoute();
  const { plant } = route.params as Params;

  function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === 'android') {
      setShowDatePicker(oldState => !oldState);
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSeletedDateTime(new Date());
      return Alert.alert('Escolha uma data no futuro! ⏰')
    }

    if (dateTime) {
      setSeletedDateTime(dateTime);
    }
  }

  function handleOpenDateTimePickerAndroid() {
    setShowDatePicker(oldState => !oldState);
  }

  async function handleSave() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime
      });

      navigation.navigate('Confirmation', {
        title: 'Tudo certo!',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito amor.',
        buttonTitle: 'Muito obrigadx :D',
        icon: 'hug',
        nextScreen: 'MyPlants'
      });

    } catch {
      Alert.alert('Não conseguimos gravar os dados da sua plantinha! 🥀')
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.plantInfo}>
          <SvgFromUri
            uri={plant.photo}
            height={150}
            width={150} />

          <Text style={styles.plantName}>
            {plant.name}
          </Text>
          <Text style={styles.plantAbout}>
            {plant.about}
          </Text>
        </View>
        <View style={styles.controller}>
          <View style={styles.tipContainer}>
            <Image
              source={waterdrop}
              style={styles.tipImage}
            />
            <Text style={styles.tipText}>
              {plant.water_tips}
            </Text>
          </View>
          <Text style={styles.alertLabel}>
            Escolha o melhor horário para ser lembrado:
          </Text>

          {
            showDatePicker && (
              <DateTimePicker value={selectedDateTime} mode="time" display="default" onChange={handleChangeTime} />
            )
          }

          {
            Platform.OS === 'android' && (
              <TouchableOpacity style={styles.dateTimePickerButton} onPress={handleOpenDateTimePickerAndroid}>
                <Text style={styles.dateTimePickerTitle}>
                  Mudar Horário
                </Text>
                <Text style={styles.dateTimePickerSubtitle}>
                  {`Horário salvo: ${format(selectedDateTime, 'HH:mm')}`}
                </Text>
              </TouchableOpacity>
            )
          }

          <Button title="Cadastrar Planta" onPress={handleSave} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: colors.shape,
  },

  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape,
  },

  plantName: {
    textAlign: 'center',
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15
  },

  plantAbout: {
    textAlign: 'center',
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10
  },

  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },

  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 60
  },

  tipImage: {
    width: 56,
    height: 56
  },

  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
  },

  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 14,
    marginBottom: 5
  },

  dateTimePickerButton: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 40
  },

  dateTimePickerTitle: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.heading,
    marginBottom: 7,
  },

  dateTimePickerSubtitle: {
    color: colors.heading,
    fontSize: 16,
    fontFamily: fonts.text,
  }
})
