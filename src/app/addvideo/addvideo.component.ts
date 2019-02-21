import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Video } from '../video';
import { PlaylistService } from '../playlist.service';

@Component({
  selector: 'app-addvideo',
  templateUrl: './addvideo.component.html',
  styleUrls: ['./addvideo.component.css']
})
export class AddvideoComponent implements OnInit {


  //title = new FormControl('');
  //url = new FormControl('');
  addFlag: boolean;
  btnText: string;
  vid: Video = {
    dataLink: "",
    title: "",
    id: 0,
    thumbnail: "",
    isApproved: false

  }


  constructor(private _playlistSvc: PlaylistService) { }

  ngOnInit() {
    this.addFlag = true;
    this.btnText = "Add Video";
    this.vid.dataLink = "";
    this.vid.id = 0;
    this.vid.isApproved = false;
    this.vid.thumbnail = "";
    this.vid.title = "";
  }

  update(eventData) {
    let video = eventData.vid;
    this.vid.title = video.title;
    this.vid.dataLink = video.dataLink;
    this.vid.id = video.id;
    this.vid.isApproved = video.isApproved;
    this.vid.thumbnail = video.thumbnail;

    this.addFlag = eventData.addFlag;
    if (this.addFlag) {
      this.btnText = "Add Video";
    } else {
      this.btnText = "Submit";
    }

  }
}
