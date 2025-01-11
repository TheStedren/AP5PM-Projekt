import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { AppStorageService } from '../services/app-storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  favorites: { city: string, weather: any }[] = [];

  constructor(private storage: AppStorageService, private weatherService: WeatherService) {}

  ionViewWillEnter() {
    this.loadFavorites();
  }

  async loadFavorites() {
    const favoriteCities = (await this.storage.get('favorites')) || [];
    this.favorites = await Promise.all(favoriteCities.map(async (city: string) => {
      const weather = await this.weatherService.getWeather(city).toPromise();
      return { city, weather };
    }));
  }

  async removeFavorite(city: string) {
    this.favorites = this.favorites.filter((item) => item.city !== city);
    const favoriteCities = this.favorites.map(item => item.city);
    await this.storage.set('favorites', favoriteCities);
  }
    getWeatherIconUrl(iconCode: string): string {
    return this.weatherService.getWeatherIconUrl(iconCode);
  }
}
