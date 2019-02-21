import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Video } from './video';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  _url: string = "http://localhost:3000/playlist";
  playListData: Array<Video>;
  playList = new BehaviorSubject<Array<Video>>(this.playListData);
  playListObservable = this.playList.asObservable();
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {

  }


  getPlaylist(): Observable<Array<Video>> {
    return this.http.get<Array<Video>>(this._url)
      .pipe(
        tap(data => { }),
        catchError(this.handleError('playlisterror', []))
      );
  }

  addVideo(vid: Video): boolean {
    let res = this.http.post<Video>(this._url, JSON.stringify(vid), { headers: this.headers })
      .subscribe(
        data => { },
        error => console.log(error)
      );
    console.log(res);
    return true;
  }

  updateVideo(vid: Video): Observable<Video> {
    var status = 0;
    let requestData = {
      "dataLink": vid.dataLink,
      "title": vid.title,
      "thumbnail": vid.thumbnail,
      "isApproved": false
    }

    let _putUrl = this._url + "/" + vid.id;
    let res = this.http.put<Video>(_putUrl, JSON.stringify(requestData), { headers: this.headers });
    return res;

  }

  deleteVideo(vid: Video): Observable<number> {
    let _delUrl = this._url + "/" + vid.id;
    let res = this.http.delete<number>(_delUrl, { headers: this.headers });
    return res;
  }

  approveVideo(vid: Video) {

    let requestData = {
      "dataLink": vid.dataLink,
      "title": vid.title,
      "thumbnail": vid.thumbnail,
      "isApproved": true
    }
    console.log("Video Object while approving " + vid);
    let _putUrl = this._url + "/" + vid.id;

    let res = this.http.put<Video>(_putUrl, JSON.stringify(requestData), { headers: this.headers })
    res.subscribe(
      data => {
        this.getPlaylist().subscribe(
          data => {
            this.playListData = data;
            this.playList.next(this.playListData);
          }
        );
      }
    );
    return res;
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
