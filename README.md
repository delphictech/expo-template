# React Native School TypeScript Expo Template

**todo: linting rules to include the absolute imports
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

## Stack and dependencies

React Native, TypeScript, Expo, 

Redux, Redux Toolkit, ESlint, Prettier, Storybook, Firebase, React Navigation

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
