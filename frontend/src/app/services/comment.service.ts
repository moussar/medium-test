import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CommentService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://localhost:3001';
  token = localStorage.getItem('currentUser') || '';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: JSON.parse(this.token)
    })
  };

  createComment(comment: any): Observable<{}> {
    return this.http.post(this.apiUrl + '/api/comment', JSON.stringify(comment), this.httpOptions);
  }

}