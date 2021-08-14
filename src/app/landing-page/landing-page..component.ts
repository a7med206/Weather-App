import { WeatherService } from './../services/weather.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page..component.html',
  styleUrls: ['./landing-page..component.scss']
})
export class LandingPageComponent implements OnInit {
  weatherObject: any;
  city: string = '';
  isCelsius: boolean = false;
  isHourly: boolean = true;
  today: string = moment(new Date()).format('dddd DD, YYYY');
  constructor(private weatherApi: WeatherService) { }

  ngOnInit(): void {
    this.weatherApi.updateWeather();
    this.weatherApi.weatherObject.subscribe((res) => {
      if (res) {
        this.weatherObject = res;
        console.log(this.weatherObject);
        if (this.weatherObject.timezone) {
          this.city = this.weatherObject.timezone.split('/')[1];
          this.today = moment(this.weatherObject.currently.time, 'X').format('dddd DD, YYYY');
        }
      }
    })



  }

  convertTemperature(type: string) {
    if (type === 'f') this.isCelsius = false;
    else if (type === 'c') this.isCelsius = true;
  }

  temperatureFormatter(temperature: any) {
    if (this.isCelsius) return `${(Number((temperature) - 32) * 5 / 9).toFixed()}°`;
    return `${Number(temperature).toFixed()}°`;
  }

  hourlyOrDaily(type: string) {
    if (type === 'hour') this.isHourly = true;
    else if (type === 'day') this.isHourly = false;
  }

  getTime(time: any) {
    return moment(time, 'X').format('HH:mm');
  }

  getDate(time: string) {
    return moment(time, 'X').format("ddd");

  }
}
