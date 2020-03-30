import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  toggle: boolean;

  constructor() {
    this.toggle = false;
  }

  ngOnInit(): void {
  }
  toggleMenu() {
    this.toggle = !this.toggle;
  }

}
