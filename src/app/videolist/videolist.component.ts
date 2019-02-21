import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlaylistService } from '../playlist.service';
import { Video } from '../video';
import { FormControl } from '@angular/forms';
import { EditEventWrapper } from '../edit-event-wrapper';

@Component({
  selector: 'app-videolist',
  templateUrl: './videolist.component.html',
  styleUrls: ['./videolist.component.css']
})
export class VideolistComponent implements OnInit {

  //@Input('title') titleFc: FormControl;
  // @Input('url') urlFc: FormControl;


  @Input('addFlag') addFlag: boolean;

  @Output() editVideo: EventEmitter<EditEventWrapper> = new EventEmitter<EditEventWrapper>();


  vid: Video = {
    dataLink: "",
    thumbnail: "",
    title: "",
    id: 0,
    isApproved: false
  };

  eventData: EditEventWrapper = {
    vid: this.vid,
    addFlag: false
  }

  videoList: Array<Video>;
  constructor(private _playlistSvc: PlaylistService) {
    this._playlistSvc.getPlaylist().subscribe(data => {
      this.videoList = data;
    });
  }

  ngOnInit() {
  }


  addVideo(vid: Video) {
    var url = vid.dataLink;
    var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    if (videoid != null) {
      console.log("video id = ", videoid[1]);
    } else {
      console.log("The youtube url is not valid.");
    }

    var imgThumbnail = "https://img.youtube.com/vi/" + videoid[1] + "/hqdefault.jpg";
    vid.thumbnail = imgThumbnail;
    this.vid.title = vid.title;    
    this.vid.dataLink = vid.dataLink;
    this.vid.thumbnail = vid.thumbnail;
    this.vid.isApproved = vid.isApproved;
    if (this.addFlag) {
      let random = Math.random();
      this.vid.id = Math.floor(random * 1000);
      let status = this._playlistSvc.addVideo(this.vid);
      this.videoList.push(this.vid);

    } else {
      this.vid.id = vid.id;
      let status = this._playlistSvc.updateVideo(this.vid).subscribe(
        data => {
          this._playlistSvc.getPlaylist().subscribe(data => {
            this.videoList = data;
          })
        },
        error => { }
      );
      this.eventData.vid.dataLink = "";
      this.eventData.vid.id = 0;
      this.eventData.vid.isApproved = false;
      this.eventData.vid.title = "";
      this.eventData.vid.thumbnail = "";
      this.eventData.addFlag = true;
      this.editVideo.emit(this.eventData);



    }
  }




  Edit(video: Video) {
    this.eventData.vid = video;
    this.eventData.addFlag = false;
    this.editVideo.emit(this.eventData);
  }

  Delete(video: Video) {
    this._playlistSvc.deleteVideo(video).subscribe(
      data => {
        this._playlistSvc.getPlaylist().subscribe(data => {
          this.videoList = data;
        })
      },
      error => { }
    )
  }
  Approve(video: Video) {
    this._playlistSvc.approveVideo(video).subscribe(
      data => {
        this._playlistSvc.getPlaylist().subscribe(data => {
          this.videoList = data;
        })
      },
      error => { console.log(error) }

    )
  }
}
