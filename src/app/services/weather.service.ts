import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WeatherService {
  path: string = '';
  latitude: number = 0;
  longitude: number = 0;

  constructor(private http: HttpClient) { }


  getWeather() {
    this.path = `https://api.darksky.net/forecast/[: a177f8481c31fa96c3f95ad4f4f84610]/${this.latitude},${this.longitude}`;
    return this.http.get(this.path)
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
      return this.getWeather().toPromise();
    }
    return "No weather data available"
  }


  showPosition(position: any) {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
  }
}
