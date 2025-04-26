import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor() { }

  public intercept(request: HttpRequest<any>, next: HttpHandler){

		const token = localStorage.getItem('token');

		if (token) {

			const cloned = request.clone({

				setHeaders: {

					Authorization: token

				}

			});

			return next.handle(cloned);

		}

		return next.handle(request);

	}
}
