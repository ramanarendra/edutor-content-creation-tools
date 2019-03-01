import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from 'src/app/loginservice.service';

@Component({
  selector: 'app-statshome',
  templateUrl: './statshome.component.html',
  styleUrls: ['./statshome.component.css']
})
export class StatshomeComponent implements OnInit {

  constructor(private testData: LoginserviceService) { }
  totalQues: number;
  attemptedQues: number;
  unAttemptedQues: number;
  skippedQues: number;
  correctQues: number;
  inCorrectQues: number;
  userScore: number;
  breakpoint: any;
  accuracy: number;
  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
    this.testData.userAttemptData().subscribe(res => {
      this.totalQues = res['total_questions'].length;
      this.attemptedQues = res['attempted'].length;
      this.unAttemptedQues = res['unattempted'].length;
      this.skippedQues = res['skipped_questions'].length;
      this.attemptedQues = res['attempted'].length;
      this.correctQues = res['correct'].length;
      this.inCorrectQues = res['incorrect'].length;
      this.userScore = res['score'];
      this.accuracy = (this.correctQues / this.attemptedQues) * 100;
      console.log(this.accuracy);
    });
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
  }

}
