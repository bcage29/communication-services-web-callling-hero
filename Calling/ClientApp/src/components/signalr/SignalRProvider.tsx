import React, { useEffect, useState } from "react";
import SignalRConnection from "./SignalRConnection";
import { SignalRContext } from "./SignalRContext";

interface SignalRProviderProps {
  signalRUrlStr?: string;
  children: any;
}

export default (props: SignalRProviderProps): JSX.Element => {
  const [isReady, setIsReady] = useState(false);
  const [isError, setIsError] = useState(false);
  const [connection, setConnection] = useState<SignalRConnection>();

  const { signalRUrlStr, children } = props;

  useEffect(() => {
    if (signalRUrlStr !== undefined) {
      const connect = new SignalRConnection(signalRUrlStr);
      setConnection(connect);
    }
  }, [signalRUrlStr]);

  useEffect(() => {
    if (connection) {
      connection
        .connect()
        .then((d) => {
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