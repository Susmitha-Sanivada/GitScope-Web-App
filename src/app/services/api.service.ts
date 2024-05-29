import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getUser(githubUsername: string): Observable<any> {
    const userUrl = `https://api.github.com/users/${githubUsername}`;

    return this.httpClient.get(userUrl).pipe(
      map((data: any) => {
        let {
          avatar_url,
          name,
          bio,
          followers,
          following,
          location,
          public_repos,
        } = data;
        return {
          avatar_url,
          name,
          bio,
          followers,
          following,
          location,
          public_repos,
        };
      }),
      catchError((error: any) => {
        console.log(error.message);
        return of({ error: error.message });
      })
    );
  }
  getRepos(
    githubUsername: string,
    results_per_page: number,
    page_number: number
  ): Observable<any> {
    const reposUrl = `https://api.github.com/users/${githubUsername}/repos?per_page=${results_per_page}&page=${page_number}`;
    let datas: Array<object> = [];
    return this.httpClient.get(reposUrl).pipe(
      map((data: any) => {
        data.map((el: any) => {
          let { name, description, language, topics, svn_url } = el;
          datas.push({ name, description, language, topics, svn_url });
        });
        return datas;
      }),
      catchError((error: any) => {
        console.log(error.message);
        return of({ error: error.message });
      })
    );
  }
}
