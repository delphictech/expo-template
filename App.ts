import { App } from './src';
import StorybookUIRoot from './.storybook';

console.log(process.env.STORYBOOK_START);
// export default process.env.STORYBOOK_START === true ? StorybookUIRoot : App;
export default App;
