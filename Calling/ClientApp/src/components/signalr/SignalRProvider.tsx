import React, { useEffect, useState } from "react";
import SignalRConnection from "./SignalRConnection";
import { SignalRContext } from "./SignalRContext";

interface SignalRProviderProps {
  signalRUrlStr?: string;
  userEmail: string;
  children: any;
}

export default (props: SignalRProviderProps): JSX.Element => {
  const [isReady, setIsReady] = useState(false);
  const [isError, setIsError] = useState(false);
  const [connection, setConnection] = useState<SignalRConnection>();

  const { signalRUrlStr, userEmail, children } = props;

  useEffect(() => {
    if (signalRUrlStr !== undefined && userEmail !== '') {
      const connect = new SignalRConnection(signalRUrlStr, userEmail);
      setConnection(connect);
    }
  }, [signalRUrlStr, userEmail]);

  useEffect(() => {
    if (connection) {
      connection
        .connect()
        .then(() => {
          setIsReady(true);
        })
        .catch(() => {
          setIsError(true);
        });
    }
    return () => {
      connection?.disconnect();
    };
  }, [connection]);

  return (
    <SignalRContext.Provider
      value={{
        connection,
        isReady,
        isError,
      }}
    >
      {children}
    </SignalRContext.Provider>
  );
};