import { Component, OnInit, Input } from '@angular/core';
import { LoginserviceService } from 'src/app/loginservice.service';
@Component({
  selector: 'app-accuracy',
  templateUrl: './accuracy.component.html',
  styleUrls: ['./accuracy.component.css']
})
export class AccuracyComponent implements OnInit {
  @Input() score: string ;
  constructor(private testData: LoginserviceService) { }

  ngOnInit() {
  }

}
