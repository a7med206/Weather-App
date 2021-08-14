import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class WeatherService {
  path: string = '';
  weatherObject = new BehaviorSubject<any>(null);
  city = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }


  getWeather(coords: any) {
    // this.path = `https://api.darksky.net/forecast/a177f8481c31fa96c3f95ad4f4f84610/${coords.latitude},${coords.longitude}`;
    // use proxy to overcome cors issue
    this.path = `https://api.allorigins.win/raw?url=https://api.darksky.net/forecast/a177f8481c31fa96c3f95ad4f4f84610/${coords.latitude},${coords.longitude}`;
    return this.http.get(this.path);

  }



  async updateWeather() {
    if (navigator.geolocation) {
      // works only if location allowed
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
          // call the weather api then pass the response to the weatherObject of type behavior subject
          this.getWeather(coords).subscribe(res => this.weatherObject.next(res));
          this.getCityName(coords).subscribe((res: any) => {
            this.city.next(res['results'][(res['results'].length - 1)].address_components[1].long_name);
          })
        })
    }
  }


  getCityName(coords: any) {
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&sensor=true&key=AIzaSyCeHUtkPo0KIR74G8imeVfeBfmhJmtwZAg`);
  }

};


