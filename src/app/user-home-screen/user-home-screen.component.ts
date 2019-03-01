import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Chart } from 'chart.js';

import { LoginserviceService } from '../loginservice.service';
import { unusedValueExportToPlacateAjd } from '@angular/core/src/render3/interfaces/i18n';
import { User, UsersList } from '../loginmodel';
import { checkNoChanges } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-user-home-screen',
  templateUrl: './user-home-screen.component.html',
  styleUrls: ['./user-home-screen.component.css']
})
export class UserHomeScreenComponent implements OnInit {
  chart = [];
  pie = [];
  userdata: any;
  doughnut = [];
  data = [];
  pieChart: boolean;
  barChart: boolean;
  constructor(private http: HttpClient, private _weather: LoginserviceService )  {}
  pieChartClick() {
    this.barChart = false;
    this.pieChart = true;
  }
  barChartClick() {
    this.barChart = true;
    this.pieChart = false;
  }
  ngOnInit() {
    this._weather.fakeApi()
    .subscribe(res => {
      console.log(res);
       const Dates = [];
       const payLoad = [];
       const Bcount = [];
      const temp_max = res['packets'].forEach(element => {
        Dates.push(new Date(element.timestamp).toLocaleTimeString());
        payLoad.push(parseFloat(element.payloadString));
        Bcount.push(element.brokerCounter);
      });
     const colorForchart = [
        '#E5685F', '#4CAF50', '#FF5810', '#00BBDE', '#9926AC', '#E5685F', '#4CAF50', '#FF5810',
        '#4CAF50', '#FF5810', '#00BBDE', '#9926AC'
      ];
      const pay = res['packets'];
      console.log('temp_max' + temp_max);
      console.log('weatherDates' + Dates);
      console.log(Dates);
      this.doughnut = new Chart('doughnut', {
        type: 'bar',
        data: {
          labels: Dates,
          datasets : [{
            backgroundColor: '#9926AC',
            data                  : payLoad,
            label: 'Pay Load',
            fill: true
        },
        {
          backgroundColor: '#FF5810',
          data                  : Bcount,
          label: 'B Count',
          fill: true
      }]
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
    this._weather.fakeApi()
    .subscribe(res => {
      console.log(res);
       const Dates = [];
       const payLoad1 = [];
       let Bcount1 = [];
       let maxi: number;
       let mini: number;
      const temp_max = res['packets'].forEach(element => {
        Dates.push(new Date(element.timestamp).toLocaleTimeString());
        payLoad1.push(parseInt(element.payloadString, 0));
        Bcount1.push(parseInt(element.brokerCounter, 0));
      });
     const colorForchart = [
        '#E5685F', '#4CAF50', '#FF5810', '#00BBDE', '#9926AC', '#E5685F', '#4CAF50', '#FF5810',
        '#4CAF50', '#FF5810', '#00BBDE', '#9926AC'
      ];
      maxi = Math.max.apply(null, payLoad1);
      mini = Math.min.apply(null, payLoad1);
      Bcount1 = [mini, maxi];
      this.chart = new Chart('chart', {
        type: 'bar',
        data: {
           labels: ['Minumum', 'Maximum'],
          datasets : [
            {
            backgroundColor: '#9926AC',
            data: Bcount1,
            label: 'Load',
            fill: false
          }
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
              display: true,
              ticks: {
                suggestedMin: 0
            }
            }],
          }
        }
      });
    });
    // this._weather.jsonPlace().subscribe(res => {
    //   console.log(res);
    //    this.userdata = res;
    //   const postid = res;
    //   const email = 60;
    //   this.doughnut = new Chart('doughnut', {
    //     type: 'doughnut',
    //     data: {
    //       datasets: [
    //         {
    //           data: [
    //             postid,
    //             email
    //           ],
    //           backgroundColor: [
    //             '#3cba9f',
    //             '#cccccc'

    //           ]
    //         }
    //       ],
    //       labels: [
    //         'Red',
    //         'Orange'
    //       ]
    //     },
    //     options: {
    //       responsive: true,
    //       legend: {
    //         position: 'top',
    //         display: true,
    //       },
    //       title: {
    //         display: true,
    //         text: 'Chart.js Doughnut Chart'
    //       },
    //       animation: {
    //         animateScale: true,
    //         animateRotate: true
    //       }

    //     }
    //   });
    //  });
    // this._weather.dailyForecast()
    // .subscribe(res => {
      // const temp_max = res['list'].map(res => res.main.temp_max);
      // const temp_min = res['list'].map(res => res.main.temp_min);
      // const pressure = res['list'].map(res => res.main.pressure);
      // const humidity = res['list'].map(res => res.main.humidity);
      // const alldates = res['list'].map(res => res.dt);

      // const weatherDates = [];
      // alldates.forEach((res) => {
      //   const jsdate = new Date(res * 1000);
      //     weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }));
      // });
      // console.log(weatherDates);
      // this.chart = new Chart('canvas', {
      //   type: 'bar',
      //   data: {
      //     labels: weatherDates,
      //     datasets: [
      //       {
      //         label: 'Temperature Max',
      //         data: temp_max,
      //         backgroundColor: '#3cba9f',
      //         fill: false
      //       },
      //       {
      //         label: 'Temperature Min',
      //         data: temp_min,
      //         backgroundColor: '#ffcc00',
      //         fill: false
      //       },
      //     ]
      //   },
      //   options: {
      //     responsive: true,
      //     legend: {
      //       display: true,
      //     },
      //     scales: {
      //       xAxes: [{
      //         display: true
      //       }],
      //       yAxes: [{
      //         display: true
      //       }],
      //     }
      //   }
      // });
      // this.doughnut = new Chart('doughnut', {
      //   type: 'doughnut',
      //   data: {
      //     labels: weatherDates,
      //     datasets: [
      //       {
      //         label: 'Temperature Max',
      //         data: temp_max,
      //         backgroundColor: '#8519BE',
      //         fill: false
      //       },
      //       {
      //         label: 'Temperature Min',
      //         data: temp_min,
      //         backgroundColor: '#089496',
      //         fill: false
      //       },
      //     ]
      //   },
      //   options: {
      //     responsive: true,
      //     legend: {
      //       display: true,
      //     },
      //     scales: {
      //       xAxes: [{
      //         display: true
      //       }],
      //       yAxes: [{
      //         display: true
      //       }],
      //     }
      //   }
      // });
    // });
  }

}
