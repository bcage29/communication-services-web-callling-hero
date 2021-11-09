import { Reducer } from 'redux';
import {
  LoginTypes,
  SET_USER
} from '../actions/login';

export interface User {
  id: string;
  name: string;
  acsUserId: string;
  meetingUrl: string;
  meetingName: string;
}

export interface LoginState {
  user?: User;
}

const initialState: LoginState = {
  user: undefined,
};

export const loginReducer: Reducer<LoginState, LoginTypes> = (state = initialState, action: LoginTypes): LoginState => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user}
    default:
      return state;
  }
};
