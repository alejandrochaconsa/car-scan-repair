import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarDiagnoseService {
  private apiUrl = 'http://localhost:3000/diagnose';

  constructor(private http: HttpClient) { }

  diagnose(year: string, make: string, model: string, code: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { year, make, model, code });
  }
}
