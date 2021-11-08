import React from 'react';
import { TextField } from '@fluentui/react';

import {
  inputBoxStyle,
  inputBoxTextStyle,
  inputBoxWarningStyle,
  labelFontStyle,
  warningStyle
} from './styles/Configuration.styles';

interface GenericTextFieldProps {
  setName(name: string): void;
  name: string;
  setEmptyWarning(isEmpty: boolean): void;
  isEmpty: boolean;
  isDisabled?: boolean;
  showLabel: boolean;
  errorMessage?: string;
  hasError?: boolean;
}

const TextFieldStyleProps = {
  wrapper: {
    height: '2.3rem'
  },
  fieldGroup: {
    height: '2.3rem'
  }
};

export default (props: GenericTextFieldProps): JSX.Element => {
  const onNameTextChange = (event: any): void => {
    props.setName(event.target.value);
    if (event.target.value) {
      props.setEmptyWarning(false);
    } else {
      props.setEmptyWarning(true);
    }
  };

  return (
    <div>
      {
        props.showLabel ? <div className={labelFontStyle}>{props.name}</div> : null
      }
      <TextField
        autoComplete="off"
        inputClassName={inputBoxTextStyle}
        ariaLabel={"Choose your " + props.name}
        borderless={true}
        className={props.isEmpty ? inputBoxWarningStyle : inputBoxStyle}
        onChange={onNameTextChange}
        id={props.name}
        placeholder={"Enter your " + props.name}
        styles={TextFieldStyleProps}
        disabled={props.isDisabled}
      />
      {props.hasError && (
        <div role="alert" className={warningStyle}>
          {' '}
          {props.errorMessage} {' '}
        </div>
        ) || props.isEmpty && (
        <div role="alert" className={warningStyle}>
          {' '}
          {props.name} cannot be empty{' '}
        </div>
      )}
    </div>
  );
};
