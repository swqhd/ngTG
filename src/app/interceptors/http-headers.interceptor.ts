import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment as env } from 'src/environments/environment';
import { Observable } from "rxjs";

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  constructor() {
  }
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler): Observable<HttpEvent<any>> {
       req = req.clone({
         setHeaders: {
          'x-rapidapi-key': env.RAPID_API_KEY,
          'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com'
         },
         setParams: {
           key: env.KEY_R
         }
       });
       return next.handle(req);
    }

}
