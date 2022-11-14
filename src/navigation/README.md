# 🗂 Navigation
This directory contains files that help handle the navigation state of the app, using [React Navigation](https://reactnavigation.org/).  

## ✏️ Notes
When working with react navigation, it is useful to think of the components in a tree structure.

### ✅ Benefits
As a widely used library for mobile applications, react navigation is very well-tested and similar issues are commonly raised and fixed. 

### 🟥 Concerns or Unknown Functionality
1. **Complicated Typing**: 
It is often difficult to work with the types for react navigation, especially when you are trying to do navigation changes that are atypical, such as accessing the parent navigator.

## ↔️ Closely Related Directories
- `src/screens`: Most of the components rendered by the navigators are screens defined in this directory.

## 🔗 Resources
- [React Navigation Documentation](https://reactnavigation.org/)
- [Navigation Custom Theming](https://reactnavigation.org/docs/themes)
- [Deep Linking](https://reactnavigation.org/docs/configuring-links): Needs linking and deep linking configured.
- [State Persistance](https://reactnavigation.org/docs/state-persistence/): for saving the navigation state. Using React navigation [Link](https://reactnavigation.org/docs/use-link-props/) instead, with navigation state.


## 💡 Potential Future Changes
1. Deep linking, integrating with [firebase's dynamic links](https://firebase.google.com/docs/dynamic-links/).