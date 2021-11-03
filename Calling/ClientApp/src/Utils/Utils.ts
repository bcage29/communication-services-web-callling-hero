// © Microsoft Corporation. All rights reserved.
import { AudioDeviceInfo, VideoDeviceInfo, RemoteVideoStream } from '@azure/communication-calling';
import { CommunicationIdentifierKind } from '@azure/communication-common';
import { CommunicationUserToken } from '@azure/communication-identity';
import { User } from 'core/reducers/login';
import preval from 'preval.macro';

export const utils = {
  getUser: async (email: string): Promise<User> => {
    const response = await fetch('http://localhost:7071/api/users/' + email);
    if (response.ok) {
      return response.json();
    }
    throw new Error('Invalid user');
  },
  setUser: async (user: User): Promise<void> => {
    const response = await fetch('http://localhost:7071/api/users/' + user.id,
    {
      method: "put",
      body: JSON.stringify(user),
    });
    if (response.ok) {
      return;
    }
    throw new Error('Invalid user');
  },
  getAppServiceUrl: (): string => {
    return window.location.origin;
  },
  getTokenForUser: async (): Promise<CommunicationUserToken> => {
    const response = await fetch('/token');
    if (response.ok) {
      return response.json();
    }
    throw new Error('Invalid token response');
  },
  getRefreshedTokenForUser: async (identity: string): Promise<string> => {
    const response = await fetch(`/refreshToken/${identity}`);
    if (response.ok) {
      const content = await response.json();
      return content.token;
    }
    throw new Error('Invalid token response');
  },
  isSelectedAudioDeviceInList(selected: AudioDeviceInfo, list: AudioDeviceInfo[]): boolean {
    return list.filter((item) => item.name === selected.name).length > 0;
  },
  isSelectedVideoDeviceInList(selected: VideoDeviceInfo, list: VideoDeviceInfo[]): boolean {
    return list.filter((item) => item.name === selected.name).length > 0;
  },
  isMobileSession(): boolean {
    return window.navigator.userAgent.match(/(iPad|iPhone|iPod|Android|webOS|BlackBerry|Windows Phone)/g)
      ? true
      : false;
  },
  isSmallScreen(): boolean {
    return window.innerWidth < 700 || window.innerHeight < 400;
  },
  isUnsupportedBrowser(): boolean {
    return window.navigator.userAgent.match(/(Firefox)/g) ? true : false;
  },
  getId: (identifier: CommunicationIdentifierKind): string => {
    switch (identifier.kind) {
      case 'communicationUser':
        return identifier.communicationUserId;
      case 'phoneNumber':
        return identifier.phoneNumber;
      case 'microsoftTeamsUser':
        return identifier.microsoftTeamsUserId;
      case 'unknown':
        return identifier.id;
    }
  },
  getStreamId: (userId: string, stream: RemoteVideoStream): string => {
    return `${userId}-${stream.id}-${stream.mediaStreamType}`;
  },
  /*
   * TODO:
   *  Remove this method once the SDK improves error handling for unsupported browser.
   */
  isOnIphoneAndNotSafari(): boolean {
    const userAgent = navigator.userAgent;
    // Chrome uses 'CriOS' in user agent string and Firefox uses 'FxiOS' in user agent string.
    if (userAgent.includes('iPhone') && (userAgent.includes('FxiOS') || userAgent.includes('CriOS'))) {
      return true;
    }
    return false;
  },
  isSafari(): boolean {
    // https://stackoverflow.com/questions/7944460/detect-safari-browser
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    return isSafari;
  },
  getBuildTime: (): string => {
    const dateTimeStamp = preval`module.exports = new Date().toLocaleString();`;
    return dateTimeStamp;
  }
};
