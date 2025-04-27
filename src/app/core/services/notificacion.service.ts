import { Injectable } from '@angular/core';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from 'src/entities/usuario.entity';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  private fcmToken: string | null = null;

  constructor(private http: HttpClient) { }
  
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

  public notificar(user: Usuario, userFrom: Usuario): Observable<any> {

		return this.http.post('https://ravishing-courtesy-production.up.railway.app/notifications', {
			token: user.token,
			notification: {
				title: 'Llamada entrante',
				body: `${user.nombre} ${user.apellido} te está llamando.`,
			}, android: {
				priority: 'high',
				data: {
					userId: user.id,
					meetingId: uuidv4(),
					type: 'incoming_call',
					name: user.nombre,
					userFrom: userFrom.id,
				}
			}
		}, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			})
		});

	}
}
