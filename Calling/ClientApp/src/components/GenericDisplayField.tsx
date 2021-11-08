import React from 'react';
import { TextField } from '@fluentui/react';

import {
  inputBoxStyle,
  inputBoxTextStyle,
  inputBoxWarningStyle,
  labelFontStyle,
  warningStyle
} from './styles/Configuration.styles';

interface GenericDisplayFieldProps {
  name: string;
  isDisabled?: boolean;
  showLabel: boolean;
  value: string;
}

const TextFieldStyleProps = {
  wrapper: {
    height: '2.3rem'
  },
  fieldGroup: {
    height: '2.3rem'
  }
};

export default (props: GenericDisplayFieldProps): JSX.Element => {
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
        className={inputBoxStyle}
        id={props.name}
        styles={TextFieldStyleProps}
        disabled={props.isDisabled}
        value={props.value}
      />
    </div>
  );
};
