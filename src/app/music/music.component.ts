import { Component, OnInit, NgModule, ɵɵresolveBody } from '@angular/core';
import { ApiService } from '../service/api.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';



@NgModule({
  imports: [NgbModule]
})


@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.less']
})
export class MusicComponent implements OnInit {

  public type = 'art';
  public pauseOnHover = true;
  public slide = 5;
  private currentMusic;
  public musics = [];
  private promise: Promise<any | void>;

  constructor(private api: ApiService,
              private router: Router) { }

  ngOnInit() {
    this.promise = this.api.getMusicCharts('art', 18);
    this.promise.then((data) => {
      this.musics = data.artists;
      this.currentMusic = 18;
      console.log(data);
    })
      .catch((error) => {
        console.log(error);
      });
  }

  showMoreMusic() {
    this.promise = this.api.getMusicCharts(this.type, this.currentMusic + 18);
    this.promise.then((data) => {
      for (let i = this.currentMusic; i < this.currentMusic + 18; i = i + 1) {
        if (this.type === 'art') {
          this.musics.push(data.artists[i]);
        } else {
          this.musics.push(data.tracks[i]);
        }
      }
      this.currentMusic += 18;
    })
      .catch((error) => {
        console.log(error);
      });
    console.log('loaded');
  }

  changeContent(type: string) {
    this.musics = [];
    this.promise = this.api.getMusicCharts(type, 18);
    this.promise.then((data) => {
      if (type === 'art') {
        this.musics = data.artists;
      } else {
        this.musics = data.tracks;
      }
      this.currentMusic = 18;
      console.log(data);
    })
      .then((next) => {
        this.type = type;
        console.log(this.musics);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  displayMusic(id: number) {
    this.router.navigate(['/display', this.type, id]);
  }
}
