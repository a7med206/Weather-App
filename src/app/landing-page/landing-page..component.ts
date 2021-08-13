import { WeatherService } from './../services/weather.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page..component.html',
  styleUrls: ['./landing-page..component.scss']
})
export class LandingPageComponent implements OnInit {
  constructor(private weatherApi: WeatherService) { }

  ngOnInit(): void {
    this.weatherApi.updateWeather();
    this.weatherApi.weatherObject.subscribe((res) => {
      console.log('weatherObject', res);
    })
  }
}
