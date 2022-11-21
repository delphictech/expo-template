# 🗂 Components
Directory contains reusable components that are imported throughout the frontend.

## ✏️ Notes
To keep code as modular as possible, if we are commonly copying and pasting code, it would be better to define a re-usable component in this file, where we can create it and reuse it whenver we need to in the future.

### ✅ Benefits
Creating a modular and reusable component library.

### 🟥 Concerns or Unknown Functionality
1. **Modularity Payoffs**: Sometimes, a component may become increasingly complex if you are attempting to make it universally applicable in all circumstances. It may be more beneficial to create two separate components that can be used in different circumstances. We ran into this trouble when trying to create the same queue component for both hosts and players, realizing that this one queue component become too complicated of a lego piece to use.


## ↔️ Closely Related Directories
- `src/screens`: Most of the components are imported in the screens.

## 🔗 Resources

## 💡 Potential Future Changes
