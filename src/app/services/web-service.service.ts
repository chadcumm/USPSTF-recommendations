import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebServiceService {
  private url = 'https://data.uspreventiveservicestaskforce.org/api/json?key=38TX6xUfkn6wfm6b7X9nAu';

  constructor(private http: HttpClient) { }

  getJsonData(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}