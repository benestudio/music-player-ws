import {
  NativeModules,
  NativeEventEmitter,
  EmitterSubscription,
} from 'react-native';

type OnNoteChangeListener = (num: number) => void;

const { PianoPlayerModule } = NativeModules;
const eventEmitter = new NativeEventEmitter(PianoPlayerModule);

let listeners: OnNoteChangeListener[] = [];
let eventSubscription: EmitterSubscription;

const onNoteChangeListenerInternal = ({ num }: { num: number }) => {
  listeners.forEach(listener => listener(num));
};

export const play = (notes: number[][], tempo = 120): Promise<null> =>
  PianoPlayerModule.play(notes, tempo);

export const stop = () => PianoPlayerModule.stop();

export const addOnNoteChangeListener = (listener: OnNoteChangeListener) => {
  if (!listeners.length) {
    // TODO 4B: add event listener to the emitter, set it to eventSubscription
    // eventType: noteChange
    // check the methods above to find the callback function
  }
  listeners.push(listener);
};

export const removeOnNoteChangeListener = (listener: OnNoteChangeListener) => {
  listeners = listeners.filter(l => l !== listener);
  if (!listeners.length) {
    // TODO 4C: remove eventSubscription
  }
};
