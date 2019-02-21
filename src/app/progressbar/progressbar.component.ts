import { Component, OnInit } from '@angular/core';
import { ProgressService } from '../progress.service';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css']
})
export class ProgressbarComponent implements OnInit {

  progressVal: number;

  constructor(private _progressSvc: ProgressService) {
    this._progressSvc.progressVal.subscribe(val =>
      this.progressVal = Number.parseFloat(val.toFixed(2)));

  }

  ngOnInit() {
    this.progressVal = 0;
  }

}
