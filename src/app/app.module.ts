import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { SplashComponent } from './splash/splash.component';
import { HomeComponent } from './home/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { MusicComponent } from './music/music.component';
import { TelevisionComponent } from './television/television.component';
import { DisplayComponent } from './display/display.component';

const config = {
  apiKey: 'AIzaSyAVLPpo0Cl_m0AAVtZEdzlidyuDmCIZhwU',
  authDomain: 'moveeday.firebaseapp.com',
  databaseURL: 'https://moveeday.firebaseio.com',
  projectId: 'moveeday',
  storageBucket: 'moveeday.appspot.com',
  messagingSenderId: '98407493780',
  appId: '1:98407493780:web:5fd8e7455df21b48b20481',
  measurementId: 'G-WDBE689QE1'
};

const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', component: SplashComponent},
  {path: 'login', component: LoginComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'music', component: MusicComponent},
  {path: 'television', component: TelevisionComponent},
  {path: 'display/:type/:id', component: DisplayComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    HomeComponent,
    LoginComponent,
    MenuComponent,
    MusicComponent,
    TelevisionComponent,
    DisplayComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    NgbModule,
    FormsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
