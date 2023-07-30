export const exclude = <T, K extends keyof T>(obj: T, id: K[]): Omit<T, K> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const newObj = Object.assign({}, obj);

  for (const key of id) {
    delete newObj[key];
  }
  return newObj;
};
