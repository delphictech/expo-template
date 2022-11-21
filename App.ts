import { App } from './src';
import StorybookUIRoot from './.storybook/storybook';

const STORYBOOK_START = true;

export default STORYBOOK_START ? StorybookUIRoot : App;
