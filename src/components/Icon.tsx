import React from 'react';
import { Image } from 'react-native';
import { images, Images } from '../assets/Images';
import styles from './styles';

const Icon = ({ name }: { name: Images }) => {
  return <Image style={styles.icon} source={images[name]} />;
};
export default Icon;
