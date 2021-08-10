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

// TODO: 3A write the start and stop function which calls the native modules

export const addOnNoteChangeListener = (listener: OnNoteChangeListener) => {
  if (!listeners.length) {
    eventSubscription = eventEmitter.addListener(
      'noteChange',
      onNoteChangeListenerInternal,
    );
  }
  listeners.push(listener);
};

export const removeOnNoteChangeListener = (listener: OnNoteChangeListener) => {
  listeners = listeners.filter(l => l !== listener);
  if (!listeners.length) {
    eventSubscription!.remove();
  }
};
