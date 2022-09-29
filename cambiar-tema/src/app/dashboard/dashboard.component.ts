import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  icon='dark_mode';
  style='light-mode';

  constructor() { }

  ngOnInit(): void {
  }

  changeMode() {
    
  }
}
