import {
  HubConnection,
  HubConnectionState,
  HubConnectionBuilder,
} from '@microsoft/signalr';

export default class SignalRConnection {
  public readonly connection: HubConnection;

  private readonly signalRUrlStr: string;

  constructor(signalRUrlStr: string) {
    this.signalRUrlStr = signalRUrlStr;

    this.connection = new HubConnectionBuilder()
      .withUrl(signalRUrlStr, {
        headers: { "x-ms-signalr-user-id": "brennen.cage@microsoft.com"},
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

  async subscribeToCaseNotifications(caseId: string) {
    return this.sendSubscriptionRequest('subscribe', caseId);
  }

  async unsubscribeToCaseNotifications(caseId: string) {
    return this.sendSubscriptionRequest('unsubscribe', caseId);
  }

  private async sendSubscriptionRequest(
    action: 'subscribe' | 'unsubscribe',
    caseId: string,
  ) {
    if (this.connection.connectionId !== undefined) {
      const response = await fetch(
        `${this.signalRUrlStr}/cases/${caseId}/${action}`,
        {
          method: 'POST',
          headers: { user: "asdf" },
          body: JSON.stringify({ connectionId: this.connection.connectionId }),
        },
      );

      if (response.ok === false) {
        throw new Error(
          `Unable to ${action} to notifications from case ID ${caseId}`,
        );
      }
    }
  }

  startListen<T>(target: string, handler: (payload: T) => void) {
    this.connection.on(target, handler);
  }

  stopListen(target: string) {
    this.connection.off(target);
  }
}
