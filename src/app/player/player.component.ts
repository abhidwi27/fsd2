import { Component, OnInit, ViewChild, ElementRef, DoCheck, SimpleChanges } from '@angular/core';
import { Review } from '../review';
import { VideoselectService } from '../videoselect.service';
import { ProgressService } from '../progress.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, DoCheck {

  @ViewChild('videoPlayer') videoplayer: ElementRef;
  private vref: any;
  volumeIndex: number = 1;
  oldVolumeIndex: number = 1;
  isPlaying: boolean;
  reviews: Array<Review>;
  videoSrc: string;
  public likeCount;
  public dislikeCount;
  oldVideoSrc: string;
  progressVal: number;



  constructor(private _videoSelectSvc: VideoselectService, private _progressSvc: ProgressService) {
    this._videoSelectSvc.videoLinkSource.subscribe(source => this.videoSrc = source);
  }

  ngOnInit() {
    let review: Review = {
      videoLink: "",
      like: 0,
      dislike: 0
    };
    this.reviews = [];
    this.vref = this.videoplayer.nativeElement;
    this.vref.volume = this.volumeIndex;
    this.isPlaying = false;
    //this.videoSrc = this.vref.childNodes[0].getAttribute('src');
    this.oldVideoSrc = this.videoSrc = "../../assets/data/videoplayer.mp4";

    review.dislike = this.likeCount = 0;
    review.like = this.dislikeCount = 0;
    review.videoLink = this.videoSrc;
    this.reviews.push(review);
    window.localStorage.setItem('reviews', JSON.stringify(this.reviews));


  }

  play() {
    this.vref.play();
    this.isPlaying = true;

  }
  pause() {
    this.vref.pause();
    this.isPlaying = false;
  }
  volumeUp() {
    if (this.volumeIndex != 1) {
      this.volumeIndex = this.volumeIndex + 0.1;
      this.vref.volume = this.volumeIndex;
      this.oldVolumeIndex = this.volumeIndex;
    }
  }
  volumeDown() {
    if (this.volumeIndex > 0.1) {
      this.volumeIndex = this.volumeIndex - 0.1;
      this.vref.volume = this.volumeIndex;
      this.oldVolumeIndex = this.volumeIndex;
    }

  }
  muteUnmute() {
    if (this.oldVolumeIndex == 0) {
      this.volumeIndex = this.oldVolumeIndex;
      this.vref.volume = this.volumeIndex;
    } else {
      this.oldVolumeIndex = this.volumeIndex;
      this.volumeIndex = 0;
      this.vref.volume = this.volumeIndex;
    }
  }
  reload() {
    this.vref.load();
    this.vref.play();
  }

  like() {
    let review: Review = {
      videoLink: "",
      like: 0,
      dislike: 0
    };
    review.videoLink = this.videoSrc;
    this.reviews = JSON.parse(window.localStorage.reviews);
    for (let element of this.reviews) {
      if (element.videoLink == this.videoSrc) {
        element.like = element.like + 1;
        this.likeCount = element.like;
        break;
      } else {
        review.like = 1;
        this.likeCount = review.like;
        this.reviews.push(review);
      }
    };

    window.localStorage.setItem('reviews', JSON.stringify(this.reviews));
  }

  dislike() {
    let review: Review = {
      videoLink: "",
      like: 0,
      dislike: 0
    };
    review.videoLink = this.videoSrc;
    this.reviews = JSON.parse(window.localStorage.reviews);
    for (let element of this.reviews) {
      if (element.videoLink == this.videoSrc) {
        element.dislike = element.dislike + 1;
        this.dislikeCount = element.dislike;
        break;
      } else {
        review.dislike = 1;
        this.dislikeCount = review.dislike;
        this.reviews.push(review);
      }
    };

    window.localStorage.setItem('reviews', JSON.stringify(this.reviews));

  }

  updateReview() {
    let review: Review = {
      videoLink: "",
      like: 0,
      dislike: 0
    };

    //review.videoLink = this.videoSrc = this.vref.childNodes[0].getAttribute('src');
    review.videoLink = this.videoSrc;
    this.reviews = JSON.parse(window.localStorage.reviews);
    for (let element of this.reviews) {
      if (element.videoLink == this.videoSrc) {
        this.dislikeCount = element.dislike;
        this.likeCount = element.like;
        break;
      } else {
        review.dislike = this.likeCount = 0;
        review.like = this.dislikeCount = 0;

      }
    };


    this.reviews.push(review);
    window.localStorage.setItem('reviews', JSON.stringify(this.reviews));
  }

  ngDoCheck() {
    if (this.oldVideoSrc != this.videoSrc) {
      this.oldVideoSrc = this.videoSrc;
      this.updateReview();
      this.vref = this.videoplayer.nativeElement;
      this.vref.load();
      this.vref.play();
    }
  }

  updateProgress() {
    this.progressVal = 100 * (this.vref.currentTime / this.vref.duration);
    this._progressSvc.updateProgress(this.progressVal);
  }
}
