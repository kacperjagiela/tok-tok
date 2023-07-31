export const exclude = <T, K extends keyof T>(obj: T, id: K[]): Omit<T, K> => {
  const newObj = Object.assign({}, obj);

  for (const key of id) {
    delete newObj[key];
  }
  return newObj;
};
