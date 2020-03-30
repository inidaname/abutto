import { Component, OnInit } from '@angular/core';
import {  StatesService } from '../../../services/share/states.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  toggle: boolean;

  constructor(
    private state: StatesService
  ) {
    this.toggle = false;
  }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.toggle = !this.toggle;
    this.state.setState(this.toggle);
  }

}
