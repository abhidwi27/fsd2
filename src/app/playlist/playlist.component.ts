import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../playlist.service';
import { Video } from '../video';
import { VideoselectService } from '../videoselect.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  playlistArr: Array<Video>
  constructor(private playlistSvc: PlaylistService, private _videoSelectSvc: VideoselectService) {
    this.playlistSvc.playListObservable.subscribe(
      data => { this.playlistArr = data; }
    )
  }

  ngOnInit() {



    this.playlistSvc.getPlaylist().subscribe(
      data => { this.playlistArr = data; }
    )


  }

  playNewVideo(videoSrc: string) {
    console.log('new vide clicked');
    this._videoSelectSvc.changeVideoSource(videoSrc);
  }

}
