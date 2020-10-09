import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UrlGeneratorService } from './url-generator.service';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

describe('UrlGeneratorService', () => {
  let service: UrlGeneratorService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ]
    });
    service = TestBed.inject(UrlGeneratorService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('makeFriendlyUrl()', () => {
    it('fetch friendly url from api', () => {
      const postSpy = jest.spyOn(httpClient, 'post').mockReturnValue(of('friendlyUrl'));

      service.makeFriendlyUrl('longUrl').subscribe((response) => {
        expect(response).toEqual('friendlyUrl');
      });
      expect(postSpy).toHaveBeenCalledTimes(1);
      expect(postSpy).toHaveBeenCalledWith(`${environment.apiUrl}/url-generator/friendly`, { sourceUrl: 'longUrl'});
    });
  });
});
