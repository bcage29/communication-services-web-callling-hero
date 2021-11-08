import {
  HubConnection,
  HubConnectionState,
  HubConnectionBuilder,
} from '@microsoft/signalr';

export default class SignalRConnection {
  public readonly connection: HubConnection;

  constructor(signalRUrlStr: string, email: string) {
    this.connection = new HubConnectionBuilder()
      .withUrl(signalRUrlStr, {
        headers: { "x-ms-signalr-user-id": email},
        withCredentials: false
      })
      .withAutomaticReconnect()
      .build();
  }

  async connect() {
    if (this.connection.state === HubConnectionState.Disconnected) {
      return this.connection.start();
    }

    return Promise.resolve();
  }

  async disconnect() {
    if (this.connection.state === HubConnectionState.Connected) {
      return this.connection.stop();
    }

    return Promise.resolve();
  }

  startListen<T>(target: string, handler: (payload: T) => void) {
    this.connection.on(target, handler);
  }

  stopListen(target: string) {
    this.connection.off(target);
  }
}
