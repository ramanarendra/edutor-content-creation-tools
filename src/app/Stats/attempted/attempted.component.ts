import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-attempted',
  templateUrl: './attempted.component.html',
  styleUrls: ['./attempted.component.css']
})
export class AttemptedComponent implements OnInit {
  @Input() accuracy: string ;
  constructor() { }

  ngOnInit() {
  }

}
