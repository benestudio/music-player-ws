import { useEffect, useState } from 'react';
import { DEFAULT_TEMPO } from '../constants';

import * as PianoPlayer from '../modules/PianoPlayer';

const usePlayer = () => {
  const [currentBeat, setCurrentBeat] = useState<number | null>(null);
  const [isPlaying, setPlaying] = useState(false);

  useEffect(() => {
    PianoPlayer.addOnNoteChangeListener(setCurrentBeat);
    return () => PianoPlayer.removeOnNoteChangeListener(setCurrentBeat);
  }, []);

  const play = async (notes: number[][], tempo = DEFAULT_TEMPO) => {
    setPlaying(true);
    await PianoPlayer.play(notes, tempo);
    setPlaying(false);
    setCurrentBeat(null);
  };

  const stop = () => {
    PianoPlayer.stop();
    setPlaying(false);
    setCurrentBeat(null);
  };

  const playPitch = (pitchIndex: number) => PianoPlayer.play([[pitchIndex]]);

  return { currentBeat, isPlaying, playPitch, play, stop };
};

export default usePlayer;
