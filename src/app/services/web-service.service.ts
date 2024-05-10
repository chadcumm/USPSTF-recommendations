import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebServiceService {
  private dataSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  data$: Observable<any> = this.dataSubject.asObservable();
  
  constructor(private http: HttpClient) { }

  getJsonData(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      tap(data => this.dataSubject.next(data))
    );
  }
}