import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs'
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private readonly oauthService: OAuthService) { }

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = 'eyJraWQiOiI5Vk1rVXRMSlpSNWpMU2wxa2J2VmRhQTlja3Fhb0ZXTEkrRDVrUnVDMFZVPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1OTg5Mzk2ZS1lMGQxLTcwYTUtMTUwNC04NjM5MzJmZTg3YzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy13ZXN0LTFfWEIyTVlMUmltX2F6dXJlYWQiXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMS5hbWF6b25hd3MuY29tXC91cy13ZXN0LTFfWEIyTVlMUmltIiwidmVyc2lvbiI6MiwiY2xpZW50X2lkIjoiMnUwc2hvMG9xdWQ4cWhnMzluZ3BhZG9yMTMiLCJvcmlnaW5fanRpIjoiMWE0MGUzOTUtNTRjMC00YjRlLWJhY2EtMmU2ZGJiOWU2ZjY5IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF1dGhfdGltZSI6MTcwNjYyNTU4MywiZXhwIjoxNzA2NzExOTgzLCJpYXQiOjE3MDY2MjU1ODMsImp0aSI6IjYyMjE0MjRhLTBkMzItNGU2MS04YjhiLWQ3NzYxMTA0ZWVhNSIsInVzZXJuYW1lIjoiYXp1cmVhZF9yb2RyaWdvLmNvdWxvbkBnZXRkYXRhLmNsIn0.Lxt1m_WhTsP3gIptAww_qg5lLpZGdoRAaoK96Y32neKeYpJmbYASrnoZ5A9xK8oSf0x9oJYq06ZhQjsY-fQWvsHHtC84vfqVB3MBqIjs_dnaGqzGWas5hgSnFcsn4Fuh5fZ2Zb_3HlhX0_-ONicbGLD1lAv6RPjk5bObUX3DAa6SJTVEtIavcCzrhcgwS8oiPcdwcYygqBlNfMTLJ8iAA2C-7HJetqA9lad9CeP-Z7uXDnYANwnlOf7v6dd6j3hCTrTuDJHYIcnpUVTE7wZcEpm3YKcHu6zHA0xTJsCJdk10swlelNfrd_WAfKSzHetTyEeOvViRHxUJkBuA5i0QVA';
    if (req.url.includes('/oauth2/')) {
      return next.handle(req);
    }
    if (token) {
      req = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
      return next.handle(req);
    }

    throw new Error('Error al obtener token');
  }
}
