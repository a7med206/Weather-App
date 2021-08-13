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
    const weatherObject = this.weatherApi.getLocation();
    console.log('weatherObject', weatherObject);
  }
}
