# 🗂 Types
Contains the various type definitions that are used in the database schema and frontend.

## ✏️ Notes
There are a number of types here that are used throughout this code base. These are the ones that are used throughout a wide variety of files. Types that are specific to a screen or component can be defined solely in that file. We make use of utility types, including Partial<> and Required<>. In general, it is especially useful to use Partial<> utility types when calling data from the database, as we do not know what we will be getting back.

All the types should be exported in the `index.ts` file so that they can be easily accessed throughout the repo.

### ✅ Benefits
Having the main types in one place will allow for us to re-use them and know where they are.

### 🟥 Concerns or Unknown Functionality
1. When do we make use of utility types, making sure that at some points fields are required and at other points fields are not required? The behavior with the back and forth from the database must be more clearly laid out.

## 🔗 Resources
- [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)