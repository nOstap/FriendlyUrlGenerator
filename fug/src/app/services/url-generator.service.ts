import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlGeneratorService {

  constructor(private readonly httpClient: HttpClient) { }

  makeFriendlyUrl(sourceUrl: string): Observable<string> {
    return this.httpClient.post(`${environment.apiUrl}/url-generator/friendly`, { sourceUrl }, {
      responseType: 'text',
    });
  }
}
