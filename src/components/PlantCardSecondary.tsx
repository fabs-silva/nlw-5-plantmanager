import React from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SvgFromUri } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantProps extends RectButtonProps {
  name: string;
  photo: string;
  hour: string;
  handleRemove: () => void;
}

export function PlantCardSecondary({ name, photo, hour, handleRemove, ...rest }: PlantProps) {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton
              style={styles.buttonRemove}
              onPress={handleRemove}
            >
              <Feather name="trash" size={32} color={colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton style={styles.container} {...rest}>
        <SvgFromUri
          uri={photo}
          width={50}
          height={50}
        />
        <Text style={styles.title}>
          {name}
        </Text>
        <View style={styles.details}>
          <Text style={styles.timeLabel}>
            Regar às
          </Text>
          <Text style={styles.time}>
            {hour}
          </Text>
        </View>
      </RectButton>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 25,
    backgroundColor: colors.shape,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },

  title: {
    flex: 1,
    marginLeft: 10,
    color: colors.green_dark,
    fontFamily: fonts.heading,
    fontSize: 17
  },

  details: {
    alignItems: 'flex-end',
    marginRight: 10,
  },

  timeLabel: {
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.body_light,
  },

  time: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.body_dark,
  },

  buttonRemove: {
    backgroundColor: colors.red,
    width: 100,
    height: 90,
    marginTop: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    right: 20,
    paddingLeft: 15,
  }
})