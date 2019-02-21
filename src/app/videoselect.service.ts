import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VideoselectService {

  private videoLink = new BehaviorSubject('');
  videoLinkSource = this.videoLink.asObservable();
  constructor() { }


  changeVideoSource(newSource: string) {
    this.videoLink.next(newSource);
  }
}
