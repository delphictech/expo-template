// import 'react-native-gesture-handler';

// import { App } from './src';

// export default App;

// App.tsx
const STORYBOOK_START = true;
export default STORYBOOK_START
? require('./storybook').default
: require('./src').default;
