import React, { useState } from 'react';
import { Stack, Icon, PrimaryButton, TextField, Separator } from '@fluentui/react';
import {
  paneFooterStyles,
  paneFooterTokens,
  footerMainTextStyle,
  textFieldStyles,
  copyLinkButtonStyle,
  copyIconStyle
} from './styles/CommandPanel.styles';

const invitePeopleString = 'Move User to new meeting';
const copyJoinInfoString = 'Join new meeting';

// const copyJoinLink = (): void => {
//   const inputElement = document.getElementById('inputText') as HTMLInputElement;
//   inputElement.select();
//   document.execCommand('copy');
// };

export interface MoveParticipantProps {
  moveParticipant(teamsMeetingUrl: string): void;
}

//export default (): JSX.Element => {
export default (props: MoveParticipantProps): JSX.Element => {

  const [name, setName] = useState(" ");

  const handleInput = (event: any): void => {
    setName(event.target.value);
  };

  return (
    <Stack styles={paneFooterStyles} tokens={paneFooterTokens}>
      <Separator />
      <div className={footerMainTextStyle}>{invitePeopleString}</div>
      {/* <TextField styles={textFieldStyles} id="inputText" type="text" value={`${document.baseURI}`}></TextField> */}
      <TextField onChange={handleInput} id="inputText" type="text"></TextField>
      <PrimaryButton className={copyLinkButtonStyle} onClick={() => props.moveParticipant(name)}>
        {copyJoinInfoString}
      </PrimaryButton>
    </Stack>
  );
};
