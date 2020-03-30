import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  private behaviorState: BehaviorSubject<boolean>;
  public currentState: Observable<boolean>;

  constructor() {
    this.behaviorState = new BehaviorSubject(false);
    this.currentState = this.behaviorState.asObservable();
  }

  public setState(state: boolean): void {
    return this.behaviorState.next(state);
  }
}
