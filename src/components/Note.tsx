import React from 'react';
import { Pressable } from 'react-native';

import { BEATS_PER_BAR, noteColors } from '../constants';
import styles from './styles';

interface NoteProps {
  onPress: (barIndex: number, beatIndex: number, pitchIndex: number) => void;
  notes: number[][][];
  isPlaying: boolean;
  currentBeat: number | null;
  barIndex: number;
  beatIndex: number;
  pitchIndex: number;
  colorIndex: number;
}

const Note = ({
  onPress,
  notes,
  isPlaying,
  currentBeat,
  barIndex,
  beatIndex,
  pitchIndex,
  colorIndex,
}: NoteProps) => {
  const isSelected = notes[barIndex][beatIndex].includes(pitchIndex);
  const isCurrentBeat =
    isPlaying && currentBeat === barIndex * BEATS_PER_BAR + beatIndex;
  return (
    <Pressable
      onPress={() => onPress(barIndex, beatIndex, pitchIndex)}
      style={[
        styles.pitch,
        isSelected
          ? {
              backgroundColor: noteColors.selected[colorIndex],
            }
          : null,
        isCurrentBeat ? styles.playingPitch : null,
        isSelected && isCurrentBeat
          ? {
              backgroundColor: noteColors.played[colorIndex],
            }
          : null,
      ]}
    />
  );
};

export default Note;
