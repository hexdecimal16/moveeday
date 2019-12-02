import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL = 'https://api.themoviedb.org/3/';
  baseURLMusic = 'https://api.napster.com/v2.2/';
  configData = null;
  baseImageURL = null;
  searchLogoSize = null;
  APIKEY = '16fc63f2ef99c68373d8507f2c33deb2';
  APIKEY_MUSIC = 'MjY3MDdjMTItMDFhYS00Yjc0LTkyY2ItZmFjNTg5YzNlNDM0';
  constructor() {
    this.getConfig();
  }
  getConfig() {
    const url = ''.concat(this.baseURL, 'configuration?api_key=', this.APIKEY);
    fetch(url)
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        this.baseImageURL = data.images.secure_base_url;
        this.configData = data.images;
        this.searchLogoSize = data.images.logo_sizes[0];
        console.log('config:', data);
        console.log('config fetched');
      })
      .catch(err => {
        alert(err);
      });
  }


  getSearch(event: string) {
    const url = ''.concat(this.baseURL, 'search/movie?api_key=', this.APIKEY, '&query=', event);
    return (fetch(url)
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      }));
  }

  getMovie(movieId: number) {
    const url = ''.concat(this.baseURL, 'movie/', movieId.toString(), '?api_key=', this.APIKEY, '&append_to_response=reviews');
    return (fetch(url)
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      }));
  }

  getUpcomingMovies(country: string) {
    let url = ''.concat('https://api.themoviedb.org/3/movie/now_playing?api_key=16fc63f2ef99c68373d8507f2c33deb2&language=en-US&page=1');
    if (country.length !== 0) {
      url = url.concat('&region=', country);
    }
    return (fetch(url)
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      }));
  }

  getNowPlayingMovies(page: number) {
    const url = ''.
      concat('https://api.themoviedb.org/3/movie/now_playing?api_key=16fc63f2ef99c68373d8507f2c33deb2&language=en-US&page=', page.toString());
    return (fetch(url)
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      }));
  }

  getMusicCharts(type: string, page: number) {
    let url = '';
    if (type === 'art') {
      url = ''.concat(this.baseURLMusic, '/artists/top?&apikey=', this.APIKEY_MUSIC, '&limit=', page.toString());
    }
    if (type === 'tra') {
      url = ''.concat(this.baseURLMusic, '/tracks/top?&apikey=', this.APIKEY_MUSIC, '&limit=', page.toString());
    }
    return (fetch(url)
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      }));
  }

  getShows(type: string, page: number) {
    let url;
    if (type === 'pop') {
      url = ''.concat(this.baseURL, 'tv/popular?api_key=', this.APIKEY, '&language=en-US&page=', page.toString());
    }
    if (type === 'rat') {
      url = ''.concat(this.baseURL, 'tv/top_rated?api_key=', this.APIKEY, '&language=en-US&page=', page.toString());
    }
    if (type === 'air') {
      url = ''.concat(this.baseURL, 'tv/on_the_air?api_key=', this.APIKEY, '&language=en-US&page=', page.toString());
    }
    return (fetch(url)
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      }));
  }

  searchMusic(query: string) {
    const url = ''.concat(this.baseURLMusic, 'search?apikey=', this.APIKEY_MUSIC, '&query=', query, '&type=track');
    return (fetch(url)
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      }));
  }

  searchShow(query: string) {
    const url = ''.concat(this.baseURL, 'search/tv?api_key=', this.APIKEY, '&language=en-US&query=', query, '&page=1');
    return (fetch(url)
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      }));
  }

  getShow(id: number) {
    const url = ''.concat(this.baseURL, 'tv/', id.toString(), '?api_key=', this.APIKEY, '&language=en-US');
    return (fetch(url)
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      }));
  }

  getMusicDetails(type: string, id: string) {
    let url = '';
    if (type === 'art') {
      url = ''.concat(this.baseURLMusic, 'artists/', id, '?apikey=', this.APIKEY_MUSIC);
    }
    if (type === 'tra') {
      url = ''.concat(this.baseURLMusic, 'tracks/', id, '?apikey=', this.APIKEY_MUSIC);
    }
    return (fetch(url)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    }));
  }
}

