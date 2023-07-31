import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useMemo,
  useReducer,
} from "react";

import { Nullable } from "../types/Nullable";
import {
  Action,
  State,
  UserProviderReducer,
} from "./reducers/UserProviderReducer";

interface Value {
  state: State;
  dispatch: Dispatch<Action>;
}

export const UserContext = createContext<Nullable<Value>>(null);

interface Props {
  children: ReactNode;
}

export const UserProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(UserProviderReducer, {
    user: null,
  });

  return (
    <UserContext.Provider value={useMemo(() => ({ state, dispatch }), [state])}>
      {children}
    </UserContext.Provider>
  );
};
