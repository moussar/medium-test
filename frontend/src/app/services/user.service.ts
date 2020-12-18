import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://localhost:3001';
  token = localStorage.getItem('currentUser') || '';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: JSON.parse(this.token)
    })
  };

  registerUser(user: any): Observable<{}> {
    return this.http.post(this.apiUrl + '/api/user', JSON.stringify(user), this.httpOptions);
  }
}
