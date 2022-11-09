import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { NativeBaseProvider } from 'native-base';
import BasicFlatList from '.';
import { Product } from './Product';
import CenterView from '../CenterView';
import { Provider } from 'react-redux';
import { store } from '../../../src/ducks/store';

const dataExample = [
    {
        name: 'seth',
        img: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 100,
        id: 'dadalk23e3',
        lat:1,
        long:2,
        geohash:'dasasd',
    },
    {
        name: 'seth25',
        img: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 125,
        id: 'dadalk23e3vz',
        lat:1,
        long:2,
        geohash:'dasasd',
    },
];

storiesOf('FlatListBasic', module)
    .addDecorator((getStory) => (
        <Provider store={store}>
            <NativeBaseProvider>{getStory()}</NativeBaseProvider>
        </Provider>
    ))
    .add('basic', () => <BasicFlatList inputToFlatList={dataExample} />);

storiesOf('Product', module)
    .addDecorator((getStory) => (
        <Provider store={store}>
            <NativeBaseProvider>{getStory()}</NativeBaseProvider>
        </Provider>
    ))
    .add('Default', () => <Product productData={dataExample[0]} />);


    const Template = args => <Product {...args} />