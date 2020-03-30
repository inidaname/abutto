import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private behaviourPage: BehaviorSubject<string>;
  public currentPage: Observable<string>;

  constructor() {
    this.behaviourPage = new BehaviorSubject(null);
    this.currentPage = this.behaviourPage.asObservable();
  }

  public setActivity(activity: string): void {
    return this.behaviourPage.next(activity);
  }
}
