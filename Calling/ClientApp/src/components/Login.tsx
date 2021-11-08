// © Microsoft Corporation. All rights reserved.
import React, { useState } from 'react';
import { Stack, PrimaryButton, Icon, Image, IImageStyles, TextField } from '@fluentui/react';
import { VideoCameraEmphasisIcon } from '@fluentui/react-icons-northstar';
import heroSVG from '../assets/hero.svg';
import {
  imgStyle,
  containerTokens,
  listStyle,
  iconStyle,
  headerStyle,
  upperStackTokens,
  videoCameraIconStyle,
  buttonStyle,
  nestedStackTokens,
  upperStackStyle,
  listItemStyle
} from './styles/HomeScreen.styles';

import {
  inputBoxStyle,
  inputBoxTextStyle,
  inputBoxWarningStyle,
  labelFontStyle,
  warningStyle
} from './styles/Configuration.styles';
import { User } from 'core/reducers/login';
import { useSignalRContext } from "./signalr";
import { connect } from 'react-redux';
import GenericTextField from './GenericTextField';

export interface LoginProps {
  setUser(user: User): void;
  getUser(email: string): User;
  loginHandler(userEmail: string): void;
}

const imageStyleProps: IImageStyles = {
  image: {
    height: '100%',
    width: '100%'
  },
  root: {}
};

const TextFieldStyleProps = {
  wrapper: {
    height: '2.3rem'
  },
  fieldGroup: {
    height: '2.3rem'
  }
};

export default (props: LoginProps): JSX.Element => {
  const [email, setEmail] = useState('');
  const [emptyWarning, setEmptyWarning] = useState(false);
  // const [name, setName] = useState('');
  const [hasError, setError] = useState(false);

  // const handleInput = (event: any): void => {
  //   setEmail(event.target.value);
  // };

  const { isReady, connection, isError } = useSignalRContext();

  return (
    <Stack horizontal horizontalAlign="center" verticalAlign="center" tokens={containerTokens}>
      <Stack className={upperStackStyle} tokens={upperStackTokens}>
        <div className={headerStyle}>{"Please Log In"}</div>
        <Stack tokens={nestedStackTokens}>
          <GenericTextField 
            setName={setEmail} 
            name={"Email"}
            showLabel={false}
            setEmptyWarning={setEmptyWarning} 
            isEmpty={emptyWarning}
            hasError={hasError}
            errorMessage={"User does not have access."}
          />
        </Stack>
        <PrimaryButton
          className={buttonStyle}
          onClick={async (): Promise<void> => {
            setError(false);
            if (!email) {
              setEmptyWarning(true);
            } else {
              //1. Retrieve a token
              const user = await props.getUser(email); // call server to get user
              if (user != null || user != undefined) {
                if (connection != undefined && connection.connection.connectionId != null) {
                  user.signalRConnectionId = connection.connection.connectionId;
                }
                props.setUser(user);
                props.loginHandler(user.id);
              } else {
                setError(true);
              }
            }
          }}
          disabled={emptyWarning ? true : false}
        >
          {"LOG IN"}
        </PrimaryButton>
      </Stack>
    </Stack>
  );
};
