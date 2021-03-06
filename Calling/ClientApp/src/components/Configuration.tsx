// © Microsoft Corporation. All rights reserved.

import React, { useEffect, useState } from 'react';
import { Stack, Spinner, PrimaryButton } from '@fluentui/react';
import LocalPreview from './LocalPreview';
import LocalSettings from './LocalSettings';
import DisplayNameField from './DisplayNameField';
import {
  VideoDeviceInfo,
  AudioDeviceInfo,
  LocalVideoStream,
  DeviceManager,
  CallAgent,
  CallEndReason
} from '@azure/communication-calling';
import { VideoCameraEmphasisIcon } from '@fluentui/react-icons-northstar';
import {
  videoCameraIconStyle,
  configurationStackTokens,
  buttonStyle,
  localSettingsContainerStyle,
  mainContainerStyle,
  fullScreenStyle,
  verticalStackStyle
} from './styles/Configuration.styles';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import { User } from 'core/reducers/login';
import GenericTextField from './GenericTextField';
import GenericDisplayField from './GenericDisplayField';

export type TokenResponse = {
  tokenCredential: AzureCommunicationTokenCredential;
  userId: string;
};

export interface ConfigurationScreenProps {
  user: User;
  userId: string;
  groupId: string;
  callAgent: CallAgent;
  deviceManager: DeviceManager;
  setupCallClient(unsupportedStateHandler: () => void): void;
  setupCallAgent(
    displayName: string,
    groupId: string,
    afterSetupHandler: (callAgent: CallAgent, groupId: string) => void
  ): void;
  setGroup(groupId: string): void;
  setUser(user: User): void;
  startCallHandler(): void;
  unsupportedStateHandler: () => void;
  callEndedHandler: (reason: CallEndReason) => void;
  videoDeviceList: VideoDeviceInfo[];
  audioDeviceList: AudioDeviceInfo[];
  setVideoDeviceInfo(device: VideoDeviceInfo): void;
  setAudioDeviceInfo(device: AudioDeviceInfo): void;
  mic: boolean;
  setMic(mic: boolean): void;
  setLocalVideoStream(stream: LocalVideoStream | undefined): void;
  localVideoRendererIsBusy: boolean;
  videoDeviceInfo: VideoDeviceInfo;
  audioDeviceInfo: AudioDeviceInfo;
  localVideoStream: LocalVideoStream;
  screenWidth: number;
  joinGroup(callAgent: CallAgent, groupId: string): void;
  joinTeamsMeeting(callAgent: CallAgent, meetingLink: string): void;
  getToken(): Promise<TokenResponse>;
  createCallAgent(tokenCredential: AzureCommunicationTokenCredential, displayName: string): Promise<CallAgent>;
  registerToCallEvents(
    userId: string,
    callAgent: CallAgent,
    endCallHandler: (reason: CallEndReason) => void
  ): Promise<void>;
}

export default (props: ConfigurationScreenProps): JSX.Element => {
  const spinnerLabel = 'Initializing call client...';
  const buttonText = 'Start call';
  
  const { user, groupId, setupCallClient, setGroup, unsupportedStateHandler } = props;

  useEffect(() => {
    setupCallClient(unsupportedStateHandler);
  }, [setupCallClient, unsupportedStateHandler]);

  return (
    <Stack className={mainContainerStyle} horizontalAlign="center" verticalAlign="center">
      {props.deviceManager ? (
        <Stack
          className={props.screenWidth > 750 ? fullScreenStyle : verticalStackStyle}
          horizontal={props.screenWidth > 750}
          horizontalAlign="center"
          verticalAlign="center"
          tokens={props.screenWidth > 750 ? configurationStackTokens : undefined}
        >
          <LocalPreview
            mic={props.mic}
            setMic={props.setMic}
            setLocalVideoStream={props.setLocalVideoStream}
            videoDeviceInfo={props.videoDeviceInfo}
            audioDeviceInfo={props.audioDeviceInfo}
            localVideoStream={props.localVideoStream}
            videoDeviceList={props.videoDeviceList}
            audioDeviceList={props.audioDeviceList}
          />
          <Stack className={localSettingsContainerStyle}>
            <GenericDisplayField 
              value={user !== undefined ? user.name : ''}
              name={"Name"}
              showLabel={true}
              isDisabled={true}
            />
            <div>
              <LocalSettings
                videoDeviceList={props.videoDeviceList}
                audioDeviceList={props.audioDeviceList}
                audioDeviceInfo={props.audioDeviceInfo}
                videoDeviceInfo={props.videoDeviceInfo}
                setVideoDeviceInfo={props.setVideoDeviceInfo}
                setAudioDeviceInfo={props.setAudioDeviceInfo}
                deviceManager={props.deviceManager}
              />
            </div>
            <div>
              <PrimaryButton
                className={buttonStyle}
                onClick={async (): Promise<void> => {
                  //1. Retrieve a token
                  const { tokenCredential, userId } = await props.getToken(); // call server to get user and token
                  //2. Initialize the call agent
                  const callAgent = await props.createCallAgent(tokenCredential, user.name);
                  //3. Register for calling events
                  props.registerToCallEvents(userId, callAgent, props.callEndedHandler);
                  //4. Join the call
                  await props.joinTeamsMeeting(callAgent, user.meetingUrl);
                  props.startCallHandler();
                  setGroup(groupId);
                  user.acsUserId = userId;
                  props.setUser(user);
                }}
              >
                <VideoCameraEmphasisIcon className={videoCameraIconStyle} size="medium" />
                {buttonText}
              </PrimaryButton>
            </div>
          </Stack>
        </Stack>
      ) : (
        <Spinner label={spinnerLabel} ariaLive="assertive" labelPosition="top" />
      )}
    </Stack>
  );
};
