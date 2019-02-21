import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private progress = new BehaviorSubject(0);
  progressVal = this.progress.asObservable();
  constructor() { }

  updateProgress(val: number) {
    this.progress.next(val);
  }
}
