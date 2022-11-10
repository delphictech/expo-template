# 🗂 Firebase Functions and Unit Testing
Contains the server side firebase functions, as well as how to unit test these functions with [Jest](https://jestjs.io/).

Under *src*, files should be divided underneath directories for the features that the functions are made for. Underneath these directories, there should be both testing and normal functions files.

## ✏️ Notes
Server side functions are an amazing tool for adding more backend functionality to your firebase app. They can handle much functionality behind the scenes, such as keeping your database consistent and clean. However, it is also important to test that they work correctly, which we exemplify here.

## 🔧 Usage
1. Setup [firebase emulators and jest](https://github.com/maetio/expo-template/wiki/Firebase-Testing-Setup).
2. Download your firebase service account key as a json file. Remember to add this file to your `.gitignore`.
3. Add your firebase project name as environmental variable in your .env file. 
4. Run `yarn test`.

Deploy functions to firebase using the command `yarn deploy`.


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