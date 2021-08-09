import { useEffect, useState } from 'react';
import { DEFAULT_TEMPO } from '../constants';

import * as PianoPlayer from '../modules/PianoPlayer';

const usePlayer = () => {
  const [currentBeat, setCurrentBeat] = useState<number | null>(null);
  const [isPlaying, setPlaying] = useState(false);

  // TODO 4A: add listener from PianoPlayer which are removed on unmount
  // Those will set the current beat

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
