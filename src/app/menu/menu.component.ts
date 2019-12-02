import { Component, OnInit, NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../service/api.service';
import { AuthService } from '../service/auth.service';
import { RouterModule, Router } from '@angular/router';

@NgModule({
  imports: [NgbModule, RouterModule]
})

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})

export class MenuComponent implements OnInit {

  public type: string = this.router.routerState.snapshot.url;
  public term: string;
  public results = [];
  public toggle = 'false';
  private promise: Promise<any | void>;
  constructor(private api: ApiService,
              public auth: AuthService,
              public router: Router) { }

  ngOnInit() { }

  search() {
    console.log(this.type);
    this.results = [];
    console.log(this.router.routerState.snapshot.url);
    if (this.term === '') {
      this.results = [];
    } else {
      if (this.router.routerState.snapshot.url === '/home') {
        this.type = '/home';
        this.promise = this.api.getSearch(this.term);
        this.promise.then((data) => {
          this.results = data.results;
        })
          .catch((err) => {
            console.log(err);
          });
      }
      if (this.router.routerState.snapshot.url === '/television') {
        this.type = '/television';
        this.promise = this.api.searchShow  (this.term);
        this.promise.then((data) => {
          this.results = data.results;
          console.log(this.results);
        })
          .catch((error) => {
            console.log(error);
          });
      }
      if (this.router.routerState.snapshot.url === '/music') {
        this.type = '/music';
        this.promise = this.api.searchMusic(this.term);
        this.promise.then((data) => {
          this.results = data.search.data.tracks;
          console.log(data);
        })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }

  showPanel() {
    if (this.toggle === 'open') {
      this.toggle = 'close';
      document.getElementById('main1').style.marginLeft = '0';
      document.getElementById('main').style.marginLeft = '0';
      document.getElementById('mySidebar').style.width = '0';
      document.getElementById('mySidebar').style.display = 'none';
    } else {
      this.toggle = 'open';
      document.getElementById('main1').style.marginLeft = '30vw';
      document.getElementById('main').style.marginLeft = '30vw';
      document.getElementById('mySidebar').style.width = '30vw';
      document.getElementById('mySidebar').style.display = 'block';
    }
  }

  logout() {
    this.auth.googleSignOut().catch(err => {
      console.log(err);
    });
  }

}
