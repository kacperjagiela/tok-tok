import { Nullable } from "../../types/Nullable";
import { User } from "../../types/User";

export type State = {
  user: Nullable<User>;
};

export enum ActionTypes {
  SetUser = "SET_USER",
}

type SetUser = {
  type: ActionTypes.SetUser;
  payload: {
    user: User;
  };
};

export type Action = SetUser;

export const UserProviderReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionTypes.SetUser:
      return { ...state, user: action.payload.user };
    default:
      return state;
  }
};
