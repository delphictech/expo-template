export function to<T, U = Error>(
    /*
        Function will handles catching errors with async promises
    */
    promise: Promise<T>,
    errorExt?: any,
  ): Promise<[U, undefined] | [null, T]> {
    return promise
      .then<[null, T]>((data: T) => [null, data])
      .catch<[U, undefined]>((err: U) => {
        if (errorExt) {
          Object.assign(err, errorExt);
        }
  
        return [err, undefined];
      });
  }
  