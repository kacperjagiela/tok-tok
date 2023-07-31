export const prismaExclude = <T, K extends keyof T>(
  obj: T,
  id: K
): Omit<T, K> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [id]: _, ...newState } = obj;
  return newState;
};
