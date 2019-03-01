import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from 'src/app/loginservice.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {

  constructor(private _weather: LoginserviceService ) { }
  pie = [];
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
      this.pie = new Chart('pie', {
        type: 'pie',
        data: {
          labels: weatherDates,
          datasets: [
            {
              label: 'Temperature Max',
              data: temp_max,
              backgroundColor: '#B37E7E',
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
          title: {
            display: true,
            // text: 'details.label',
          },
          legend: {
            display: false,
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
