# 🗂 Firebase Functions and Unit Testing
Contains the server side firebase functions, as well as how to unit test these functions with the firebase emulators and jest.

## ✏️ Notes
Server side functions are an amazing tool for adding more backend functionality to your firebase app. As we move forward as a company we will be implementing more of these functions, so this template is a good starting point for anyone looking to learn how to write and unit test these functions.
*** To Include**
Have the `npm run serve` instead of firebase emulators.
Set the FirebaseConfig and GCloud_Project env variables. 
Include the service-acount.json locally.


### 🟥 Concerns or Unknown Functionality
1. Significantly increasing the number of reads and writes due to server side functions being invoked whenever a client read or write is invoked as well. This is a common problem with firebase functions so it is imoprtant to keep that in mind moving forward.


## :newspaper: Resources
Engineering can be tricky, so we compiled a list of great resources and videos that we believe will make setting up this project much easier.

### :video_camera: Videos:

* Unit Testing security rules with Firebase Emulator by [Firebase](https://www.youtube.com/watch?v=VDulvfBpzZE&t=806s)
* Setting up unit testing [online](https://www.youtube.com/watch?v=UDMDpdu5-rE&t=183s)
* Setting up unit testing [offline](https://www.youtube.com/watch?v=8IoCPZJ-zwA)



### :gear: Documentation and articles:
* Unit testing Cloud Functions offical [docs](https://firebase.google.com/docs/functions/unit-testing)
* Emulator offical [docs](https://firebase.google.com/docs/functions/local-emulator)
* Jest offical [docs](https://jestjs.io/docs/getting-started)
* A few google articles for examples, [here](https://javascript.plainenglish.io/unit-testing-firebase-firestore-cloud-functions-7192c2c4649e), [here](https://fireship.io/lessons/testing-cloud-functions-in-firebase/), and [here](https://timo-santi.medium.com/jest-testing-firebase-functions-with-emulator-suite-409907f31f39)


## :microscope: Unit Testing
### :fire: FireStore: 
1. Install firebase-tools with either yarn or npm. Once that is finished login to firebase with the command down below. Choose the google account associated with the project you want to work on. You should see a confirmation message in the terminal once that is finished.
```bash
npm install -g firebase-tools or yarn add global add firebase-tools

firebase login
```
2. Run firebase init and set up your project. If you are setting up the project in offline mode select functions and firestore and continue. For online just select functions. Choose or create your project, and click yes on all the questions they ask you. The only settings to change are using Typescript and not installing the packages with npm if you are using yarn.
 ```
firebase init

yarn install **only use this if you did not install your packages**
```
3. You will see a couple of files added to your directory, and a new folder called functions. (Offline Only) If you are setting this up in offline mode you will also see a file called firestore.rules and here you can edit your local firestore rules. We recommend installing the [firestore extension](https://marketplace.visualstudio.com/items?itemName=toba.vsfire) in VScode to get highlighting for this file.
4. cd into your new functions folder(from this point we will stay in this folder) and start initializing the emulator. Select functions and firestore and click yes on the rest of the settings. We also recommend copying and pasting our tsconfig.json and tsconfig.dev.json code into your functions folder as well. This may help prevent errors in testing.
 ```bash
firebase init emulators
```
5. Write your firebase function. This should be like any other firebase function you made in the past(Look at our /functions/src/index.ts file for an example). **(Online only)** Once that is finished, if you are doing this online, you must deploy your function to your live firebase project(command down below. Also fix any TS or esLint errors while running that command). Once that is deployed you should be able to see the function by going to your projects overview and clicking functions.
  ```
firebase deploy --only functions **Only run this if you are testing online**
```
6. Install Jest and firebase-function-test. Please make sure firebase-functions-test installed a recent version (3.0+), if not you can get module errors. Once jest is fully installed in your package.json "scripts" object add **"test": "jest --watchAll"**.
 ```bash
npm install --save-dev firebase-functions-test or yarn add --dev firebase-functions-test@latest
jest:
npm i -D jest typescript or yarn add --dev jest typescript
npm i -D ts-jest @types/jest or yarn add --dev ts-jest @types/jest
npx ts-jest config:init or yarn ts-jest config:init
```
7. If you are testing offline or using more than just the functions emulator, please download the java SDK. These emulators were built with java and need this installed to run. [Here](https://www.oracle.com/java/technologies/downloads/#jdk19-windows) is the link and just download and install the Java SE Development Kit onto your machine. Use the exe file for a quick and easy install. Once that is done you may want to test your emulator by starting it with the command in section 10.
8. Set up your test (offline only, see 9 for online). Make a new folder under your functions folder called test. In this make your test file(index.offline.test.ts or js). Copy and paste the code down below into your new file. Make sure to edit the fields below to match your projects.
```typescript
import 'jest';
import * as admin from 'firebase-admin';

const projectId = 'your-project-name'; //you can find this in your .firebaseerc in the root of your project
process.env.GCLOUD_PROJECT = projectId;
process.env.FIRESTORE_EMULATOR_HOST = local-host-of-the-firestore-emulator; //You can find this by starting your emulator(next step)
admin.initializeApp({ projectId: projectId });
const db = admin.firestore();
```
9. Set up your test (online only, see 8 for offline). Make a new folder under your functions folder called test. In this make your test file(index.offline.test.ts or js). Copy and paste the code down below into your new file. Make sure to edit the fields below to match your projects. Also for online mode, you need to generate the Firebase admin SDK keys. To do this on your project overview click "Project Settings" and go to "Service accounts". Here you can download your keys as json and we recommend renaming the file to "serviceAccountKey.json". Before you do anything to this file make sure to add it to your gitignore file since you don't want to be pushing these keys anywhere public. Once that is finished place this file in your functions folder.

```typescript
import * as functions from 'firebase-functions-test';
import 'jest';
import * as admin from 'firebase-admin';

const projectId = 'your-project-name';

admin.initializeApp({ projectId });

const db = admin.firestore();

functions(
    {
        projectId: projectId,
    },
    './serviceAccountKey.json',
);
```
10. Run the emulators, make a jest test and run it! We are not going to go over how to make a jest test, but we do have a lot of resources and good examples in our resources section. If you are running this code offline, you should be able to see these functions in action on the emulator UI in the browser. If you are running it online, you should be able to see these take place on your actual firebase project. Down below is the command to start the emulator and start the test.

```
firebase emulators:start
npm test or yarn test
```




