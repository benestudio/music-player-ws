import { StyleSheet } from 'react-native';

const colors = {
  bottomTab: '#111112',
  border: '#151618',
  background: '#212327',
  tempoColor: '#262626',
  playbackColor: '#35373B',
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  bar: {
    flexDirection: 'row',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: colors.border,
  },
  beat: {
    flexDirection: 'column-reverse',
  },
  pitch: {
    width: 50,
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
  },
  playingPitch: {
    backgroundColor: colors.playbackColor,
  },
  tabBar: {
    height: 50,
  },
  controllerSafeArea: {
    backgroundColor: colors.bottomTab,
  },
  controller: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between"
  },
  icon: {
    width: 40,
    height: 40,
  },
  button: {
    padding: 4,
  },
  sides: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  sideRight: {
    justifyContent: 'flex-end',
  },
  title: {
    width: 100,
    height: 100 / (212 / 55),
  },
  tempo: {
    justifyContent: 'center',
    marginHorizontal: 12,
    width: 50,
  },
  tempoBox: {
    backgroundColor: colors.tempoColor,
    borderRadius: 6,
    padding: 6,
  },
  tempoText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
    textAlign: 'center',
  },
});
