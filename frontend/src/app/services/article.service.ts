import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Article } from '../models/article.model';

@Injectable({
  providedIn: "root"
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://localhost:3001';
  token = localStorage.getItem('currentUser') || '';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: JSON.parse(this.token)
    })
  };

  getArticles(): Observable<any> {
    return this.http.get(this.apiUrl + '/api/articles').pipe(
      map(res => {
        return res;
      })
    );
  }

  searchArticles(search: any): Observable<any> {
    return this.http.post(this.apiUrl + '/api/articles/search', JSON.stringify(search), this.httpOptions);
  }

  createArticle(article: Article): Observable<{}> {
    return this.http.post(this.apiUrl + '/api/article', JSON.stringify(article), this.httpOptions);
  }

  updateArticle(article: Article): Observable<{}> {
    return this.http.put(this.apiUrl + '/api/article', JSON.stringify(article), this.httpOptions);

  }

  deleteArticle(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/api/article', this.httpOptions).pipe(
      map(res => {
        return res;
      })
    );
  }

}


/*deleteArticle(id: number): Observable<any> {
  return this.http.delete(`/api/article/${id}`, this.httpOptions)
    .pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    );
}*/