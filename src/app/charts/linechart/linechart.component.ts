import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { LoginserviceService } from 'src/app/loginservice.service';
import { ScoreComponent } from 'src/app/Stats/score/score.component';
@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit {

  constructor(private testData: LoginserviceService) { }
  chart = [];
  totalQues: number;
  attemptedQues: number;
  unAttemptedQues: number;
  skippedQues: number;
  correctQues: number;
  inCorrectQues: number;
  userScore: number;
  ngOnInit() {
    const Dates = [];
    this.testData.userAttemptData().subscribe(res => {
      console.log(res);
      console.log('Time : ' + res['timeline'].forEach(element => {
        Dates.push(element.sessions);
      }));
      console.log(Dates);
      this.totalQues = res['total_questions'].length;
      this.attemptedQues = res['attempted'].length;
      this.unAttemptedQues = res['unattempted'].length;
      this.skippedQues = res['skipped_questions'].length;
      this.attemptedQues = res['attempted'].length;
      this.correctQues = res['correct'].length;
      this.inCorrectQues = res['incorrect'].length;
      this.userScore = res['score'];
    });
  }
  score() {
    this.testData.userAttemptData().subscribe(res => {
      // console.log(res);
      // console.log('Attempted : ' + res['attempted'].length);
      // console.log('Correct : ' + res['correct'].length);
      // console.log('Incorrect : ' + res['incorrect'].length);
      // console.log('Score : ' + res['score']);
      // console.log('skipped_questions : ' + res['skipped_questions'].length);
      // console.log('total_questions : ' + res['total_questions'].length);
      // console.log('unattempted : ' + res['unattempted'].length);
      const Bcount = [this.userScore , 10, 5];
      this.chart = new Chart('chart', {
        type: 'line',
        data: {
           labels: ['Your Score', 'Topper Score', 'Average Score'],
          datasets : [
            {
            backgroundColor: '#9926AC',
            data: Bcount,
            label: 'Score Graph',
            fill: true
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
            },
            scaleLabel: {
              display: true,
              labelString: 'Marks'
            }
            }],
          }
        }
      });
    });
    // let Bcount1 = [];
    // let maxi: number;
    // let mini: number;
    // let avgScore: number;
    // maxi = 90;
    // mini = 50;
    // avgScore = 55;
    // Bcount1 = [mini, maxi, avgScore];
    // this.chart = new Chart('chart', {
    //   type: 'line',
    //   data: {
    //      labels: ['Your Score', 'Topper Score', 'Average Score'],
    //     datasets : [
    //       {
    //       backgroundColor: '#9926AC',
    //       data: Bcount1,
    //       label: 'Score Graph',
    //       fill: true
    //     }
    //   ]
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
    //         display: true,
    //         ticks: {
    //           suggestedMin: 0
    //       },
    //       scaleLabel: {
    //         display: true,
    //         labelString: 'Marks'
    //       }
    //       }],
    //     }
    //   }
    // });

  }
  accuracy() {
    const Bcount = [this.attemptedQues / this.totalQues * 100 , 100, 55];
    this.chart = new Chart('chart', {
      type: 'line',
      data: {
         labels: ['Your Score', 'Topper Score', 'Average Score'],
        datasets : [
          {
          backgroundColor: '#E5685F',
          data: Bcount,
          label: 'Accuracy Graph',
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
          },
          scaleLabel: {
            display: true,
            labelString: 'Percentage'
          }
          }],
        }
      }
    });

  }
  attempted() {
    const Bcount = [this.attemptedQues, 2, 1];
    this.chart = new Chart('chart', {
      type: 'line',
      data: {
         labels: ['Section 1', 'Section 2', 'Section 3'],
        datasets : [
          {
          backgroundColor: '#00BBDE',
          data: Bcount,
          label: 'Attempted Graph',
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
          },
          scaleLabel: {
            display: true,
            labelString: 'Questions'
          }
          }],
        }
      }
    });

  }
  time() {
    let Bcount1 = [];
    let subj1: number;
    let subj2: number;
    let subj3: number;
    subj1 = 18;
    subj2 = 5;
    subj3 = 20;
    Bcount1 = [subj1, subj2, subj3];
    this.chart = new Chart('chart', {
      type: 'line',
      data: {
         labels: ['English Language', 'Quantitative', 'Reasoning  '],
        datasets : [
          {
          backgroundColor: '#FF5810',
          data: Bcount1,
          label: 'Time Graph',
          fill: true
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
          },
          scaleLabel: {
            display: true,
            labelString: 'Minutes'
          }
          }],
        }
      }
    });

  }
}
