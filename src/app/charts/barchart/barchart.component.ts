import { Component, OnInit } from '@angular/core';

import { LoginserviceService } from 'src/app/loginservice.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {

  constructor(private _weather: LoginserviceService ) { }
  chart = [];
  ngOnInit() {
    this._weather.dailyForecast()
    .subscribe(res => {
      const temp_max = res['list'].map(res => res.main.temp_max);
      const temp_min = res['list'].map(res => res.main.temp_min);
      const pressure = res['list'].map(res => res.main.pressure);
      const humidity = res['list'].map(res => res.main.humidity);
      const alldates = res['list'].map(res => res.dt);

      const weatherDates = [];
      alldates.forEach((res) => {
        const jsdate = new Date(res * 1000);
          weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }));
      });
      console.log(weatherDates);
      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: weatherDates,
          datasets: [
            {
              label: 'Temperature Max',
              data: temp_max,
              backgroundColor: '#3cba9f',
              fill: false
            },
            {
              label: 'Temperature Min',
              data: temp_min,
              backgroundColor: '#ffcc00',
              fill: false
            },
          ]
        },
        options: {
          responsive: true,
          legend: {
            display: true,
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });
  }

}
