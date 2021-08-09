import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images, Images } from '../assets/Images';
import { MAX_TEMPO, MIN_TEMPO, TEMPO_STEP } from '../constants';
import Icon from './Icon';
import styles from './styles';

interface IControllersProps {
  togglePlayback: () => void;
  isPlaying: boolean;
  setTempo: (tempo: number) => void;
  tempo: number;
}

const Controllers = ({
  togglePlayback,
  isPlaying,
  tempo,
  setTempo,
}: IControllersProps) => {
  const insets = useSafeAreaInsets();
  const decreaseTempo = () => {
    setTempo(Math.max(tempo - TEMPO_STEP, MIN_TEMPO));
  };
  const increaseTempo = () => {
    setTempo(Math.min(tempo + TEMPO_STEP, MAX_TEMPO));
  };
  return (
    <View
      style={[
        styles.controllerSafeArea,
        {
          paddingLeft: insets.left || 12,
          paddingRight: insets.right || 12,
        },
      ]}>
      <View style={[styles.controller]}>
        <View style={styles.sides}>
          <TouchableOpacity style={styles.button} onPress={togglePlayback}>
            <Icon name={isPlaying ? Images.Stop : Images.Play} />
          </TouchableOpacity>
        </View>
        <Image style={styles.title} source={images[Images.Title]} />
        <View style={[styles.sides, styles.sideRight]}>
          <TouchableOpacity
            disabled={isPlaying}
            style={styles.button}
            onPress={decreaseTempo}>
            <Icon name={Images.Minus} />
          </TouchableOpacity>
          <View style={styles.tempo}>
            <View style={styles.tempoBox}>
              <Text style={styles.tempoText}>{tempo}</Text>
            </View>
          </View>
          <TouchableOpacity
            disabled={isPlaying}
            style={styles.button}
            onPress={increaseTempo}>
            <Icon name={Images.Plus} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Controllers;
