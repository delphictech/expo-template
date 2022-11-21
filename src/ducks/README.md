# 🗂 Ducks
Contains our redux state management files.

## ✏️ Notes
To handle our universal state, we decided to use Redux Toolkit, which is a simplified version of redux. We organized these functions using the "ducks" pattern, where we have all the state management defined under one directory instead of having it split into actions and reducers. 

### ✅ Benefits
Redux toolkit is a simplified version of redux, allowing us to have many of the benefits of a large state management library, with less code overhead. 

### 🟥 Concerns or Unknown Functionality
1. Perhaps less customizable than redux since it contains functions with pre-built functionality.


## ↔️ Closely Related Directories
- `src/services`: Contains RTK Query files that some of the state management functions may be dependent upon.

## 🔗 Resources
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [This tutorial](https://blog.gmagnenat.co/user-authentication-and-persistence-firebase-9-react-redux-toolkit) is useful to reference to understand how to combine redux toolkit and firebase 9 for authentication. 

## 💡 Potential Future Changes
1. Handle state updates that are dependent on database calls.
