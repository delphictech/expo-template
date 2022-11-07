import React from 'react';
import { storiesOf } from '@storybook/react-native';

import BasicFlatList from '.';
import CenterView from '../CenterView';

storiesOf('FlatListBasic', module).add('basic', () => <BasicFlatList text={'seth'} />);
