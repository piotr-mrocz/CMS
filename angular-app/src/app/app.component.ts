import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

interface Restaurant {
  Name: string;
  Description: string;
}

interface Entry<T> {
  id: number;
  attributes: T;
}

interface Response {
  data: Entry<Restaurant>[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit
{
  title = 'angular-app';

  error: any | undefined;
  restaurants$: Observable<Restaurant[]> | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit(): void
  {
    const url = "http://localhost:1337/api/restaurants";
    const opts = { params: { populate: "*" } };

    this.restaurants$ = this.http.get<Response>(url, opts).pipe(
      catchError((error) => this.handleError(error)),
      map((response) => response.data.map((x) => x.attributes))
    );

    this.restaurants$.subscribe(x => console.log(x))
  }

  private handleError(error: HttpErrorResponse): Observable<never>
  {
    this.error = error;
    return of();
  }
}
