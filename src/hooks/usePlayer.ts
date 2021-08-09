import { useEffect, useState } from 'react';
import { DEFAULT_TEMPO } from '../constants';

import * as PianoPlayer from '../modules/PianoPlayer';

const usePlayer = () => {
  const [currentBeat, setCurrentBeat] = useState<number | null>(null);
  // TODO 2A: create isPlaying state
  const isPlaying = false;

  useEffect(() => {
    PianoPlayer.addOnNoteChangeListener(setCurrentBeat);
    return () => PianoPlayer.removeOnNoteChangeListener(setCurrentBeat);
  }, []);

  const play = async (notes: number[][], tempo = DEFAULT_TEMPO) => {
    // TODO 2B: start the PianoPlayer (use await)
    setCurrentBeat(null);
  };

  const stop = () => {
    // TODO 2C: stop the PianoPlayer
    setCurrentBeat(null);
  };

  const playPitch = (pitchIndex: number) => PianoPlayer.play([[pitchIndex]]);

  return { currentBeat, isPlaying, playPitch, play, stop };
};

export default usePlayer;
