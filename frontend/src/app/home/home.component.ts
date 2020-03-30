import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { StatesService } from '../shared/services/share/states.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public obs: Observable<boolean>;

  constructor(
    private state: StatesService
  ) {
    this.obs = this.state.currentState;
  }

  ngOnInit(): void {
  }

}
