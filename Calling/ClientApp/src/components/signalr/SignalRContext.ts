import { createContext, useContext } from 'react';
import SignalRConnection from './SignalRConnection';

export interface SignarlRContextProps {
  connection?: SignalRConnection;
  isReady: boolean;
  isError: boolean;
}

export const SignalRContext = createContext<SignarlRContextProps>({
  isReady: false,
  isError: false,
});

export const useSignalRContext = () => useContext(SignalRContext);
