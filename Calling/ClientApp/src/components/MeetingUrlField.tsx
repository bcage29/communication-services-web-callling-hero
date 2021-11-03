import React from 'react';
import { TextField } from '@fluentui/react';

import {
  inputBoxStyle,
  inputBoxTextStyle,
  inputBoxWarningStyle,
  labelFontStyle,
  warningStyle
} from './styles/Configuration.styles';

interface MeetingUrlProps {
  //setName(name: string): void;
  name: string;
  setEmptyWarning(isEmpty: boolean): void;
  isEmpty: boolean;
  isDisabled: boolean;
}

const TextFieldStyleProps = {
  wrapper: {
    height: '2.3rem'
  },
  fieldGroup: {
    height: '2.3rem'
  }
};

export default (props: MeetingUrlProps): JSX.Element => {
  // const onNameTextChange = (event: any): void => {
  //   props.setName(event.target.value);
  //   if (event.target.value) {
  //     props.setEmptyWarning(false);
  //   } else {
  //     props.setEmptyWarning(true);
  //   }
  // };

  return (
    <div>
      <div className={labelFontStyle}>Meeting URL</div>
      <TextField
        autoComplete="off"
        inputClassName={inputBoxTextStyle}
        ariaLabel="Enter your meeting url"
        borderless={true}
        className={props.isEmpty ? inputBoxWarningStyle : inputBoxStyle}
        //onChange={onNameTextChange}
        id="name"
        placeholder="Enter your name"
        defaultValue="https://teams.microsoft.com/l/meetup-join/19%3ameeting_YWE1NDRkNzktYTk3Mi00NzQ4LTgyMTQtNzE5OWRjNTQ1OWY2%40thread.v2/0?context=%7b%22Tid%22%3a%229bc3e81f-80ea-4a04-b5ec-06eb59a03d44%22%2c%22Oid%22%3a%228324bcf9-6ce3-49ce-a146-b69e11ccbc45%22%7d"
        styles={TextFieldStyleProps}
        disabled={props.isDisabled}
      />
      {props.isEmpty && (
        <div role="alert" className={warningStyle}>
          {' '}
          Meeting URL cannot be empty{' '}
        </div>
      )}
    </div>
  );
};
