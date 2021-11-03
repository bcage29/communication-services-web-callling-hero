import { User } from "core/reducers/login";

const SET_USER = 'SET_USER';

interface SetUserAction {
  type: typeof SET_USER;
  user: User;
}

export const setUser = (user: User): SetUserAction => {
  return {
    type: SET_USER,
    user
  };
};

export { SET_USER };

export type LoginTypes = SetUserAction;
