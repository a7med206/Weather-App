import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class WeatherService {
  path: string = '';
  weatherObject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }


  getWeather(coords: any) {
    // use proxy to overcome cors issue
    this.path = `https://api.allorigins.win/raw?url=https://api.darksky.net/forecast/a177f8481c31fa96c3f95ad4f4f84610/${coords.latitude},${coords.longitude}`;
    // this.path = `https://api.darksky.net/forecast/a177f8481c31fa96c3f95ad4f4f84610/${coords.latitude},${coords.longitude}`;
    return this.http.get(this.path);

  }



  async updateWeather() {
    console.log('update')
    if (navigator.geolocation) {
      // works only if location allowed
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
          this.getWeather(coords).subscribe(res => this.weatherObject.next(res));
        })
    }

  }



};


