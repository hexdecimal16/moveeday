import { Component, OnInit, NgModule, ɵɵresolveBody } from '@angular/core';
import { ApiService } from '../service/api.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@NgModule({
  imports: [NgbModule]
})

@Component({
  selector: 'app-television',
  templateUrl: './television.component.html',
  styleUrls: ['./television.component.less']
})
export class TelevisionComponent implements OnInit {

  private type = 'pop';
  public pauseOnHover = true;
  public slide = 5;
  private currentShow;
  public shows = [];
  private promise: Promise<any | void>;

  constructor(private api: ApiService,
              private router: Router) { }

  ngOnInit() {
    this.promise = this.api.getShows('pop', 1);
    this.promise.then((data) => {
      console.log(data);
      this.currentShow = data.page;
      for (let i = 0; i < 18; i = i + 1) {
        this.shows.push(data.results[i]);
      }
      console.log(data.total_pages);
      if (data.total_pages > this.currentShow) {
        document.getElementById('showMore').style.display = 'block';
      } else {
        document.getElementById('showMore').style.display = 'none';
      }
    })
      .catch((error) => {
        console.log(error);
      });
  }

  showMoreMusic() {
    console.log('loaded');
    this.promise = this.api.getShows(this.type, this.currentShow + 1);
    this.promise.then((data) => {
      console.log(data);
      this.currentShow = data.page;
      for (let i = 0; i < 18; i = i + 1) {
        this.shows.push(data.results[i]);
      }
      console.log(data.total_pages);
      if (data.total_pages > this.currentShow) {
        document.getElementById('showMore').style.display = 'block';
      } else {
        document.getElementById('showMore').style.display = 'none';
      }
    })
      .catch((error) => {
        console.log(error);
      });
  }

  changeContent(type: string) {
    this.type = type;
    this.promise = this.api.getShows(type, 1);
    this.promise.then((data) => {
      this.shows = [];
      this.currentShow = data.page;
      for (let i = 0; i < 18; i = i + 1) {
        this.shows.push(data.results[i]);
      }
      console.log(data.total_pages);
      if (data.total_pages > this.currentShow) {
        document.getElementById('showMore').style.display = 'block';
      } else {
        document.getElementById('showMore').style.display = 'none';
      }
      console.log(data);
    })
      .catch((error) => {
        console.log(error);
      });
    console.log('changed');
  }

  displayShow(id: number) {
    this.router.navigate(['/display', 'show', id]);
  }
}
