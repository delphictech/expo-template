# 🗂 Firebase
Contains the definition of our custom firebase api, along with functions to handle requests and convert data to types.

## ✏️ Notes
We have divided our firebase api by calls for authentication and specific parts of the database. Additionally, we have defined a `db-converter.ts` file to type the data we expect back from the database, using Required<> and Partial<> [utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html). Finally, we have also defined a handler that will catch errors and convert the error to an expected type we get back from firebase.

### ✅ Benefits
This custom api will keep all the firebase calls and specific functions in one directory, which we can then use in our query functions defined in the `src/services` directory.

### 🟥 Concerns or Unknown Functionality
1. How does caching work with firebase calls?
2. What types of calls should we use database listeners for, instead of firebase calls?
3. Are listeners possible to integrate with query tools?
4. Should we migrate to Firebase Realtime, or MongoDB Atlas to allow us to scale and not be tied down to one cloud service?
> As of now, the plan would be to use firebase as a smaller team, as it requires minimal setup and less code overhead. As we scale with more developers, we would look at transitioning to another database service.


## ↔️ Closely Related Directories
- `src/services`: Contains RTK Query files that import many of these firebase-api calls.

## 🔗 Resources
- [Firebase V9 Documentation](https://firebase.google.com/docs/web/modular-upgrade)

## 💡 Potential Future Changes
1. Integrate listeners for certain database updates.