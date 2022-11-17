import { getStorybookUI, addDecorator } from '@storybook/react-native';

import { withKnobs } from '@storybook/addon-knobs';

addDecorator(withKnobs);

import './storybook.requires';

const StorybookUIRoot = getStorybookUI({});

export default StorybookUIRoot;
