import { Injectable } from '@angular/core';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  private fcmToken: string | null = null;

  constructor(private httpClient: HttpClient) { }
  
  async init(): Promise<string | undefined>{
    if (Capacitor.getPlatform() !== 'web'){

      const { receive } = await PushNotifications.requestPermissions();

      if (receive === 'granted') {

        await PushNotifications.register();

      }

      return new Promise((resolve, reject) => {

        PushNotifications.addListener('registration', (token: Token) => {
  
          this.fcmToken = token.value;
          resolve(token.value);
  
        });
  
        PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {});
  
        PushNotifications.addListener('pushNotificationActionPerformed', (action: ActionPerformed) => {});
  
      });

    }
    return undefined;
  }
}
