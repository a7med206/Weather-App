import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class WeatherService {
  path: string = '';
  lat = new BehaviorSubject(0);
  weatherObject = new BehaviorSubject({});

  constructor(private http: HttpClient) { }


  getWeather(coords: any) {
    this.path = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/a177f8481c31fa96c3f95ad4f4f84610/${coords.latitude},${coords.longitude}`;
    return this.http.get(this.path);
    this.weatherObject.next(this.http.get(this.path).toPromise());

  }


  updateWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }

          this.getWeather(coords).subscribe(res => this.weatherObject.next(res))
        })
    } else this.updateWeather();
  }


}
