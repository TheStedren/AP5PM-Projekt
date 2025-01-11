import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = environment.apiKey;
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) {}

  getWeather(
    city: string,
    units: string = 'metric',
    lang: string = 'en'
  ): Observable<any> {
    const url = `${this.baseUrl}/weather?q=${city}&units=${units}&lang=${lang}&appid=${this.apiKey}`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  getForecast(
    city: string,
    units: string = 'metric',
    lang: string = 'en'
  ): Observable<any> {
    const url = `${this.baseUrl}/forecast?q=${city}&units=${units}&lang=${lang}&appid=${this.apiKey}`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  getWeatherIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
