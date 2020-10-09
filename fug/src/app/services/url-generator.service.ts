import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlGeneratorService {

  constructor(private readonly httpClient: HttpClient) { }

  makeFriendlyUrl(sourceUrl: string): Observable<string> {
    return this.httpClient.post<string>(`${environment.apiUrl}/url-generator/friendly`, {
      sourceUrl,
    });
  }
}
