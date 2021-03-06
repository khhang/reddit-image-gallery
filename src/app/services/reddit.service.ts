import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListingsParams } from '../models/listingsParams';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class RedditService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  // Get JSON data for subreddits with given options
  getSubreddits(_subNames: string[], _sortOption: string,  _params: ListingsParams = {}): Observable<any> {
    let subNames = _subNames.join("+");
    let options = new HttpParams();
    if(Object.keys(_params).length > 0){
      // Remove before key if after key is present
      if(Object.keys(_params).includes("after") && Object.keys(_params).includes("before")){
        delete _params["before"];
      }

      for(let [key, value] of Object.entries(_params)){
        options = options.append(key, value.toString());
      }
    }
    const params = options.toString();
    return this.http.get(`${this.configService.apiURL}/r/${subNames}/${_sortOption}?${params}`);
  }

  getSubredditAutocomplete(_params: any){
    let options = new HttpParams();

    for(let [key, value] of Object.entries(_params)){
      options = options.append(key, value.toString());
    }

    const params = options.toString();
    return this.http.get(`${this.configService.apiURL}/api/subreddit_autocomplete?${params}`);
  }

  parseImageData(_subsData: any): ImageData[] {
    let imageData: ImageData[] = [];
    if(_subsData){
      imageData = _subsData.data.children.filter((node) => {
        return node.data.url.endsWith('.jpg') || node.data.url.endsWith('.gif');
      }).map((node) => {
        return {
          url: node.data.url,
          subreddit: node.data.subreddit,
          title: node.data.title
        };
      });
    }
    return imageData;
  }
}
