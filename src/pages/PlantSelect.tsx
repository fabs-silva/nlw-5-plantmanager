import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { PlantProps } from '../libs/storage';

import { Header } from '../components/Header';
import { EnvironmentButton } from '../components/EnvironmentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';

import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentProps {
  key: string;
  title: string
}

export function PlantSelect() {
  const [loading, setLoading] = useState(true);

  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState('all');

  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);

  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);

  const navigation = useNavigation();

  async function fetchPlants() {
    const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=6`);

    if (!data) {
      return setLoading(true)
    }

    if (page > 1) {
      setPlants(oldValue => [...oldValue, ...data]);
      setFilteredPlants(oldValue => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setLoading(false);
    setLoadMore(false);
  }

  function handleEnvironmentSelected(environment: string) {
    setEnvironmentSelected(environment);

    if (environment === 'all')
      return setFilteredPlants(plants);

    const filtered = plants.filter(plant =>
      plant.environments.includes(environment)
    );

    setFilteredPlants(filtered);
  }

  function handleFetchMore(distance: number) {
    if (distance < 1) {
      return;
    }

    setLoadMore(true);
    setPage(oldValue => oldValue + 1);
    fetchPlants();
  }

  function handlePlantSelected(plant: PlantProps) {
    navigation.navigate('SelectedPlant', { plant });
  }

  useEffect(() => {
    async function fetchEnvironments() {
      const { data } = await api
        .get('plants_environments?_sort=title&_order=asc');
      setEnvironments([{
        key: 'all',
        title: 'Todos'
      }, ...data])
    }
    fetchEnvironments();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);

  if (loading)
    return <Load />

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.title}>
        <Text style={styles.titleFirstLine}>
          Em qual ambiente
        </Text>
        <Text style={styles.titleSecondLine}>
          você quer colocar sua planta?
        </Text>
      </View>
      <View style={styles.environmentList}>
        <FlatList
          data={environments}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (
            <EnvironmentButton
              title={item.title}
              active={item.key == environmentSelected}
              onPress={() => handleEnvironmentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.plantList}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({ item }) => (
            <PlantCardPrimary
              name={item.name}
              photo={item.photo}
              onPress={() => handlePlantSelected(item)}
            />
          )}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
          ListFooterComponent={
            loadMore
              ? <ActivityIndicator color={colors.green} />
              : <></>
          }
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  title: {
    marginTop: 15,
    paddingHorizontal: 30
  },

  titleFirstLine: {
    fontSize: 17,
    lineHeight: 22,
    color: colors.heading,
    fontFamily: fonts.heading,
  },

  titleSecondLine: {
    fontSize: 17,
    lineHeight: 22,
    color: colors.heading,
    fontFamily: fonts.text,
  },

  environmentList: {
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 30,
    marginVertical: 30
  },

  plantList: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
})