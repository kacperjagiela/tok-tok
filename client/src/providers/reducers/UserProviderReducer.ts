import { Nullable } from "../../types/Nullable";
import { User } from "../../types/User";

export type State = {
  access_token: Nullable<string>;
  user: Nullable<User>;
};

export enum ActionTypes {
  SetAccessToken = "SET_ACCESS_TOKEN",
  SetUser = "SET_USER",
}

type SetAccessTokenAction = {
  type: ActionTypes.SetAccessToken;
  payload: {
    accessToken: string;
  };
};

type SetUser = {
  type: ActionTypes.SetUser;
  payload: {
    user: User;
  };
};

export type Action = SetAccessTokenAction | SetUser;

export const UserProviderReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionTypes.SetAccessToken:
      return { ...state, accessToken: action.payload.accessToken };
    case ActionTypes.SetUser:
      return { ...state, user: action.payload.user };
    default:
      return state;
  }
};
