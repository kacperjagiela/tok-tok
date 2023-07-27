import { useContext } from "react";

import { ActionTypes } from "../providers/reducers/UserProviderReducer";
import { UserContext } from "../providers/UserProvider";
import { Nullable } from "../types/Nullable";
import { User } from "../types/User";

interface UseUser {
  access_token: Nullable<string>;
  setAccessToken: (accessToken: string) => void;
  user: Nullable<User>;
  setUser: (user: User) => void;
}

export const useUser = (): UseUser => {
  const ctx = useContext(UserContext);

  if (!ctx) {
    throw new Error("Beyond UserProvider!");
  }

  const { state, dispatch } = ctx;

  const setAccessToken = (accessToken: string) => {
    dispatch({
      type: ActionTypes.SetAccessToken,
      payload: {
        accessToken,
      },
    });
  };

  const setUser = (user: User) => {
    dispatch({
      type: ActionTypes.SetUser,
      payload: {
        user,
      },
    });
  };

  return {
    access_token: state.access_token,
    setAccessToken,
    user: state.user,
    setUser,
  };
};
