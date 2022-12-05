# :closed_book: Storybook
Contains storybook component testing.

## ✏️ Notes
Storybook a great tool for testing components outside of an application. It allows you to make components seperate from the app and configure the props/functions to emulate the app.
This can save time on setup and makes being able to work on frontend components much easier to implement into the main app. Down below are a few images showing off storybook and its UI.
<div>

<img src='https://user-images.githubusercontent.com/95386742/205463718-cada1a35-84c1-45ae-8eeb-108648c98628.jpg' width="200" height="400" />

<img  src='https://user-images.githubusercontent.com/95386742/205463798-17740ed7-5095-47bb-8941-84e06e002750.png' width="400" height="400" />
</div>

## 🔧 Usage
1. Clone Repo 
2. run "yarn"
3. after doing this run "yarn storybook" and it should be running on your desktops browser. 
4. run "yarn start" and run it using expo on your mobile phone.
5. If you are getting an error saying "can not find variable HTMLElement" please make sure you '@storybook/react' is at the latest version
6. We also found some errors with the mobile UI with addons. If you are getting some of these errors remove the addons from you main.js file and it should fix the issue.

## :newspaper: Resources
Engineering can be tricky, so we compiled a list of great resources and videos that we believe will make setting up this project much easier.

### :video_camera: Videos:

* A short video on learning storybook v6 storybook [here](https://www.youtube.com/watch?v=FUKpWgRyPlU&t=332s)

### :gear: Documentation and articles:
* Storybook react native [beta](https://github.com/storybookjs/react-native), here you have many different resources, and can find the latest information about setting up storybook on your react native app.
Storybook is always getting updates on how it should get configured so here is your best bet on figuring that out.
* The Storybook offical [docs](https://storybook.js.org/docs/react/get-started/introduction) have a lot of great information, however if you go under react native, some
of there information can be outdated since we are using the beta(v6) version of react native instead of the old v5 version.
* how to fix ["can not find variable HTMLElement"](https://github.com/storybookjs/react-native/discussions/394#discussioncomment-4151528) bug if you can not fix it.
