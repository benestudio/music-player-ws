export enum Images {
  Play = 'play',
  Stop = 'stop',
  Minus = 'Minus',
  Plus = 'Plus',
  Title = 'Title',
}

export const images = {
  [Images.Play]: require('./play.png'),
  [Images.Stop]: require('./stop.png'),
  [Images.Minus]: require('./minus.png'),
  [Images.Plus]: require('./plus.png'),
  [Images.Title]: require('./title.png'),
};
