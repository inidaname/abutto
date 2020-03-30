import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentSpace: string;

  constructor() {
    this.currentSpace = 'needing';
  }

  ngOnInit(): void {
  }

  changeSpace(space: string): void {
    this.currentSpace = space;
  }

}
