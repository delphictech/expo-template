# React Native School TypeScript Expo Template

**todo: write documentation for absolute imports, compiling and linting
**Development: light mode and dark mode, form validation, firebase integration
## Running locally
Run the following commands to run the app locally
```
git clone
expo prebuild -–npm
expo run:ios -–device
```
Expo prebuild checks to make sure all packages are compatible with expo before running it on your device.

To compile typescript run
```
yarn tsc
```

Linting from home directory
```
yarn run eslint [file or directory]
yarn run eslint [file or directory] --fix
```

## Stack and Dependencies

React Native, TypeScript, Expo, 

Redux, Redux Toolkit, ESlint, Prettier, Storybook, Firebase, React Navigation

* [React Native](https://reactnative.dev/)
* [TypeScript](https://www.typescriptlang.org/): In order to retain organization and annoying relative imports, we have configured our tsconfig.json file and babel.config.js file to make use of absolute imports. It may be useful to reference the typescript documentation on [module resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html), or reference [this medium blog](https://medium.com/geekculture/making-life-easier-with-absolute-imports-react-in-javascript-and-typescript-bbdab8a8a3a1).
* [Firebase V9](https://firebase.google.com/docs/web/modular-upgrade): Firebase V9 is modular and more lightweight, allowing us to import specific functions from firebase instead of initializing the whole app. There are many useful resources to see how to get started with this new version, including this [authentication tutorial](https://firebase.google.com/docs/auth/web/start).
* [Expo](https://expo.dev/): We are using expo to get started as it help us handle some of the underlying native features with its packages and cli.
* [React Navigation](https://reactnavigation.org/docs/getting-started/): For navigating between screens, we are using react navigation.
* [NativeBase](https://nativebase.io/): Well built and responsive component library for ios, android, and web.
* [ESlint](https://eslint.org/) and [Prettier](https://prettier.io/): ESlint and Prettier help us detect errors while keeping our code formatting clean. We have initialized these packages using [Airbnb's style guide](https://github.com/airbnb/javascript/tree/master/react), extending our eslintrc.js to include [airbnb-typescript](https://www.npmjs.com/package/eslint-config-airbnb-typescript).

## Organization and Conventions
* naming files/directories with -, functional components and interfaces with Caps "FuncComp", functions with camelCase getUser,
* writing as modular as possible

A simple Expo template with the following features:

- All TypeScript
- Eslint & Prettier configured
- React Navigation v6
- Testing Configured
- Simple project structure
- Small component library to get started with

It's easy to create a project, strip out the few components included, and still have the architecture in place to quickly start building an app.

## Usage

> Be sure to have the [Expo CLI](https://docs.expo.io/workflow/expo-cli/) installed.

```bash
expo init --template @react-native-school/expo-typescript-template
```

- Run on iOS: `yarn ios` or `npm run ios`
- Run on Android: `yarn android` or `npm run android`
- Run on Web: `yarn web` or `npm run web`
- Compile TypeScript: `yarn tsc`
- Run Tests: `yarn test` or `npm run test`
- Lint Code: `yarn lint` or `npm run lint`
- Format Code: `yarn format` or `npm run format`

## Screenshots

List Screen
![List Screen](./assets/screenshots/list.png)

Text Screen
![Text Screen](./assets/screenshots/text.png)

Form Screen
![Form Screen](./assets/screenshots/form.png)

Button Screen
![Button Screen](./assets/screenshots/button.png)
