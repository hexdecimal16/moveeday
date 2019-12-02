import { Component, OnInit, NgModule, ɵɵresolveBody } from '@angular/core';
import { ApiService } from '../service/api.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';



@NgModule({
  imports: [NgbModule]
})


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  private toggle = 'close';
  public term;
  status: boolean;
  public pauseOnHover = true;
  public slide = 5;
  private currentPage;
  public movies = [];
  public results = [];
  private promise: Promise<any | void>;

  constructor(private api: ApiService,
              public auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.promise = this.api.getUpcomingMovies('');
    this.promise.then((data) => {
      this.currentPage = data.page;
      for (let i = 0; i < 18; i = i + 1) {
        this.movies.push(data.results[i]);
      }
      console.log(data.total_pages);
      if (data.total_pages > this.currentPage) {
        document.getElementById('showMore').style.display = 'block';
      } else {
        document.getElementById('showMore').style.display = 'none';
      }
      console.log(data);
    })
      .catch((error) => {
        console.log(error);
      });
  }

  updateCountry(country: string) {
    this.promise = this.api.getUpcomingMovies(country);
    this.promise.then((data) => {
      this.movies = [];
      this.movies = data.results;
    });
  }

  showMoreMovie() {
    console.log('Clicked');
    this.promise = this.api.getNowPlayingMovies(this.currentPage + 1);
    this.promise.then((data) => {
      console.log(data);
      this.currentPage = data.page;
      for (let i = 0; i < 18; i = i + 1) {
        this.movies.push(data.results[i]);
      }
      console.log(data.total_pages);
      if (data.total_pages > this.currentPage) {
        document.getElementById('showMore').style.display = 'block';
      } else {
        document.getElementById('showMore').style.display = 'none';
      }
    })
      .catch((error) => {
        console.log(error);
      });
  }

  openMovie(id: number){
    const url = ''.concat('/movie?id=', id.toString());
    this.router.navigate([url]);
  }

  displayMovie(id: number){
    this.router.navigate(['/display', 'movie', id]);
  }
}
