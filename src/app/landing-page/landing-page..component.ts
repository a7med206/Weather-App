import { WeatherService } from './../services/weather.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page..component.html',
  styleUrls: ['./landing-page..component.scss']
})
export class LandingPageComponent implements OnInit {
  weatherObject: any = {};
  city: string = '';
  isCelsius: boolean = false;
  isHourly: boolean = true;
  isRequestAccepted: boolean = false;
  today: string = moment(new Date()).format('dddd DD, YYYY');
  constructor(private weatherApi: WeatherService) { }

  ngOnInit(): void {
    // trigger navigator geolocation and Api call
    this.weatherApi.updateWeather();
    //subscribe to the weather behavior subject
    this.weatherApi.weatherObject.subscribe((res) => {
      this.isRequestAccepted = true;
      if (res) {
        this.weatherObject = res;
        this.weatherApi.city.subscribe(r => {
          if (r) this.city = r;
          else this.city = this.weatherObject.timezone.split('/')[1];
        })

        this.today = moment(this.weatherObject.currently.time, 'X').format('dddd DD, YYYY');
      } else {
        this.weatherObject = null;
      }
    });


  }



  // convert between  celsius and fahrenheit
  convertTemperature(type: string) {
    if (type === 'f') this.isCelsius = false;
    else if (type === 'c') this.isCelsius = true;
  }

  // format temperature in ui according to temperature type
  temperatureFormatter(temperature: any) {
    if (this.isCelsius) return `${(Number((temperature) - 32) * 5 / 9).toFixed()}°`;
    return `${Number(temperature).toFixed()}°`;
  }


  //show hourly or daily array in ui
  hourlyOrDaily(type: string) {
    if (type === 'hour') this.isHourly = true;
    else if (type === 'day') this.isHourly = false;
  }

  // convert timestamp to a more readable hour:minutes format like the design
  getTime(time: any) {
    return moment(time, 'X').format('HH:mm');
  }

  // convert timestamp to a more readable day format like the design
  getDate(time: string) {
    return moment(time, 'X').format("ddd");

  }
}
