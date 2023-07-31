import { useCallback, useContext, useMemo } from "react";

import { ApiClient } from "../clients/ApiClient";
import { ActionTypes } from "../providers/reducers/UserProviderReducer";
import { UserContext } from "../providers/UserProvider";
import { Nullable } from "../types/Nullable";
import { User } from "../types/User";

interface UseUser {
  user: Nullable<User>;
  setUser: (user: User) => void;
  apiClient: ApiClient;
}

export const useUser = (): UseUser => {
  const ctx = useContext(UserContext);

  if (!ctx) {
    throw new Error("Beyond UserProvider!");
  }

  const { state, dispatch } = ctx;

  const setUser = useCallback(
    (user: User) => {
      dispatch({
        type: ActionTypes.SetUser,
        payload: {
          user,
        },
      });
    },
    [dispatch]
  );

  const apiClient = useMemo(() => {
    const client = new ApiClient();
    client.setToken();
    return client;
  }, []);

  return useMemo(
    () => ({
      user: state.user,
      setUser,
      apiClient,
    }),
    [apiClient, setUser, state.user]
  );
};
