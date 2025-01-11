import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { AppStorageService } from "../services/app-storage.service";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  weatherData: any = null;
  forecastData: any = null;
  city: string = '';

  constructor(private weatherService: WeatherService,private storage: AppStorageService) { }
  
  getWeather() {
    if (this.city !== '') {
      this.weatherService.getWeather(this.city).subscribe({
        next: (data) => {
          this.weatherData = data;
        },
        error: (err) => {
          console.error('Error fetching weather:', err);
        },
      });

      this.weatherService.getForecast(this.city).subscribe({
        next: (data) => {
          this.forecastData = data;
        },
        error: (err) => {
          console.error('Error fetching forecast:', err);
        },
      });
    }
  }

  getWeatherIconUrl(iconCode: string): string {
    return this.weatherService.getWeatherIconUrl(iconCode);
  }

  groupForecastByDay(forecasts: any[]): any[] {
    const grouped = forecasts.reduce((acc, forecast) => {
      const date = forecast.dt_txt.split(' ')[0];
      if (!acc[date]) {
        acc[date] = { date, forecasts: [] };
      }
      acc[date].forecasts.push(forecast);
      return acc;
    }, {});
  
    return Object.values(grouped);
  }
  
  async addToFavorites() {
    let favorites = await this.storage.get('favorites');
    if (!favorites) {
      favorites = [];
    }
    if (!favorites.includes(this.city)) {
      favorites.unshift(this.city);
      this.storage.set('favorites', favorites);
    }
  }
}
