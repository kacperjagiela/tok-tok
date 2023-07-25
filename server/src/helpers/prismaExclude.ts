export const prismaExclude = <T, K extends keyof T>(
  obj: T,
  id: K
): Omit<T, K> => {
  const { [id]: _, ...newState } = obj;
  return newState;
};
