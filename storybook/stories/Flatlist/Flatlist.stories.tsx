import React from 'react';
import { storiesOf } from '@storybook/react-native';

import BasicFlatList from '.';
import CenterView from '../CenterView';

const dataExample = [
    {
        name: 'seth',
        img: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 100,
        id: 'dadalk23e3',
    },
    {
      name: 'seth25',
      img: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: 125,
      id: 'dadalk23e3vz',
  },
];

storiesOf('FlatListBasic', module).add('basic', () => <BasicFlatList inputToFlatList={dataExample} />);
