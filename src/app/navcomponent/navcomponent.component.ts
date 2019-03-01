import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navcomponent',
  templateUrl: './navcomponent.component.html',
  styleUrls: ['./navcomponent.component.css']
})
export class NavcomponentComponent implements OnInit {

  constructor() { }
  showMenu: boolean;
  ngOnInit() {
  }
  show_menu() {
    if (this.showMenu) {
      this.showMenu = false;
      console.log('true');
    } else {
      this.showMenu = true;
      console.log('false');
    }

  }
}
