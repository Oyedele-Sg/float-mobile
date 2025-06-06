export const pickFields = <
    T extends object,
    K extends keyof T,
>(obj: T, keys: K[]): Pick<T, K> => keys.reduce((result, key) => {
    if (key in obj) {
      return { ...result, [key]: obj[key] };
    }
    return result;
  }, {} as Pick<T, K>);
