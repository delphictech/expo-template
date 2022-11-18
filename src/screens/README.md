# 🗂 Screens
Directory contains the definition of our main screens.

## ✏️ Notes
We have kept all of our main screens defined here. Primarily, they will import components from the `src/components` library while doing database updates through the hooks defined in the `src/services` directory. Ideally, no firebase functions will be called throughout these files.

## ↔️ Closely Related Directories
- `src/services`: Contains RTK Query hook definitions that will be used for database calls.
- `src/components`: Reusable components used throughout these screens.

## 🔗 Resources

## 💡 Potential Future Changes
1. Integrate listeners for certain database updates. Would the listener need to be in the frontend, or could it be defined in the rtk query hooks?
