import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Alert } from 'react-native';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { loadPlants, PlantProps, removePlant } from '../libs/storage';

import { Header } from '../components/Header';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';

import waterdrop from '../assets/waterdrop.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatering, setNextWatering] = useState<string>();

  function handleRemove(plant: PlantProps) {
    Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
      {
        text: 'Não 😲',
        style: 'cancel'
      },
      {
        text: 'Sim 😢',
        onPress: async () => {
          try {
            await removePlant(plant.id);
            setMyPlants((oldData) => (
              oldData.filter((item) => item.id !== plant.id)
            ));
          } catch (error) {
            Alert.alert('Não foi possível remover sua plantinha 🤔')
          }
        }
      },
    ])
  }

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlants();

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: ptBR }
      );

      setNextWatering(
        `Não se esqueça de regar a ${plantsStoraged[0].name} daqui a ${nextTime}.`
      )

      setMyPlants(plantsStoraged);
      setLoading(false);
    }

    loadStorageData();
  }, []);

  if (loading)
    return <Load />

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.myPlantsContainer}>
        <View style={styles.spotlight}>
          <Image source={waterdrop} style={styles.spotlightImage} />
          <Text style={styles.spotlightText}>{nextWatering}</Text>
        </View>
        <View style={styles.myPlantsList}>
          <Text style={styles.myPlantsTitle}>Próximas regadas</Text>
          <FlatList
            data={myPlants}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <PlantCardSecondary
                name={item.name}
                photo={item.photo}
                hour={item.hour}
                handleRemove={() => handleRemove(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  myPlantsContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },

  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'left',
  },

  spotlightImage: {
    width: 60,
    height: 60,
  },

  spotlightText: {
    color: colors.blue,
    fontFamily: fonts.text,
    fontSize: 16,
    paddingHorizontal: 15,
    width: '90%',
  },

  myPlantsList: {
    flex: 1,
    paddingTop: 50,
    width: '100%',
  },

  myPlantsTitle: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 24,
    marginBottom: 15
  }
})