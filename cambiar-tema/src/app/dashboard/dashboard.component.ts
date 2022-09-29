import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  icon='dark-mode';

  constructor() { }

  ngOnInit(): void {
  }

  changeMode() {
    if(this.icon=='dark-mode') {
    this.icon='light-mode';
    }else if(this.icon=='light-mode') {
      this.icon='dark-mode';
    }
  }
}
