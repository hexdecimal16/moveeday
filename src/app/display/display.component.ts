import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { element } from 'protractor';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit, OnDestroy {

  private id;
  public musicImage;
  public artist = [];
  private find;
  public date;
  public url: string;
  public display = [];
  public voteMovies = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  private promise: Promise<any | void>;
  constructor(private router: Router,
              private api: ApiService) { }

  ngOnInit() {
    document.getElementById('add').style.display = 'none';
    const url: string = this.router.routerState.snapshot.url;
    this.find = url.split('/');
    this.id = this.find[3];
    if (this.find[2] === 'movie') {
      this.loadMovie();
    }
    if (this.find[2] === 'show') {
      this.loadShow();
    }
    if (this.find[2] === 'art' || this.find[2] === 'tra') {
      this.loadMusic();
    }
    console.log(this.find);
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    document.getElementById('add').style.display = 'block';
  }

  loadMovie() {
    document.getElementById('sho').style.display = 'none';
    document.getElementById('mus').style.display = 'none';
    document.getElementById('mov').style.display = 'relative';
    this.promise = this.api.getMovie(this.id);
    this.promise.then((data) => {
      this.display = data;
      this.date = data.release_date.split('-')[0];
      this.url = ''.concat('https://image.tmdb.org/t/p/original', data.backdrop_path);
      if (data.status.toUpperCase() === 'released'.toUpperCase()) {
        document.getElementById('status').style.color = 'green';
      } else {
        document.getElementById('status').style.color = 'red';
      }
      console.log(data);
    })
      .catch((error) => {
        console.log(error);
      });
  }
  loadShow() {
    document.getElementById('sho').style.display = 'block';
    document.getElementById('mus').style.display = 'none';
    document.getElementById('mov').style.display = 'none';
    this.promise = this.api.getShow(this.id);
    this.promise.then((data) => {
      this.display = data;
      this.url = ''.concat('https://image.tmdb.org/t/p/original', data.backdrop_path);
      console.log(data);
    })
      .catch((error) => {
        console.log(error);
      });
  }
  loadMusic() {
    document.getElementById('sho').style.display = 'none';
    document.getElementById('mus').style.display = 'block';
    document.getElementById('mov').style.display = 'none';
    this.promise = this.api.getMusicDetails(this.find[2], this.id);
    this.promise.then((data) => {
      if (this.find[2] === 'art') {
        this.display = data.artists[0];
        const id = this.display['id'];
        this.url = ''.concat('https://api.napster.com/imageserver/v2/artists/', id.toString(), '/images/500x500.jpg');
        this.musicImage = ''.concat('https://api.napster.com/imageserver/v2/artists/', id.toString(), '/images/500x500.jpg');
      }
      if (this.find[2] === 'tra') {
        this.display = data.tracks[0];
        const albumId = this.display['albumId'];
        this.url = ''.concat('https://api.napster.com/imageserver/v2/albums/', albumId.toString(), '/images/500x500.jpg');
        // tslint:disable-next-line: max-line-length
        this.musicImage = ''.concat('https://api.napster.com/imageserver/v2/albums/', albumId.toString(), '/images/500x500.jpg');
        this.api.getMusicDetails('art', this.display['artistId'].toString()).then((art) => {
           this.artist = art.artists[0];
           console.log(this.artist);
         });
      }
      console.log(this.display);
    })
      .catch((error) => {
        console.log(error);
      });
  }
}

