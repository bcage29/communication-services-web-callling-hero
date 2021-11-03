import { Reducer } from 'redux';
import {
  LoginTypes,
  SET_USER
} from '../actions/login';

export interface User {
  id: string; //"brennen.cage@microsoft.com",
  name: string; //"Brennen Cage",
  signalRUserId: string; //null,
  signalRConnectionId: string; //A55iUS6Cjs3iTTXVv0Ynvgedd1be431",
  graphParticipantId: string; //null,
  acsUserId: string; //f315a648-2519-48d5-8939-3a9a55e1491a_0000000d-7cac-f5ae-3dfe-9c3a0d000a9a",
  meetingUrl: string; //null,
  meetingName: string; //null,
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
