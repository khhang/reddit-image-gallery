import { Component, HostListener } from '@angular/core';
import { RedditService } from './services/reddit.service';
import { SortOption } from './models/sortOption';
import { expand } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'app';
  public imageData: ImageData[] = [];
  public redditNames: any = [];
  public sortOptions: SortOption[] = [];
  public subreddit = '';
  public selectedSortOption = 'best';
  public autocompleteNames: string[] = [];
  public tags: string[] = [];
  public after: string = "";
  public appendImages: boolean = false;

  constructor(private _redditService: RedditService){ }

  ngOnInit(){
    this.sortOptions = [
      {
        label: 'Best',
        value: 'best'
      },
      {
        label: 'Hot',
        value: 'hot'
      },
      {
        label: 'New',
        value: 'new'
      },
      {
        label: 'Controversial',
        value: 'controversial'
      },
      {
        label: 'Top',
        value: 'top'
      },
      {
        label: 'Rising',
        value: 'rising'
      }
    ];
  }

  getImages(){
    this.imageData = [];
    this.appendNewImages();
  }

  appendNewImages(){
    let media: ImageData[] = []
    if(this.subreddit || this.tags.length > 0){
      this.appendImages = true;
      this._redditService.getSubreddits([this.subreddit, ...this.tags], this.selectedSortOption, {after: this.after, count: 50}).pipe(
        expand(result => {
          if(result.data){
            media.push(...this._redditService.parseImageData(result));
            this.after = result.data.after;
            if(this.after && media.length < 50){
              return this._redditService.getSubreddits([this.subreddit, ...this.tags], this.selectedSortOption, {after: result.data.after, count: 50});
            }
          }
          return EMPTY;
        })
      ).subscribe((result) => {
        this.imageData.push(...this._redditService.parseImageData(result));
        this.appendImages = false;
      });
    }
  }

  getSubredditAutocomplete(subName: string){
    if(subName){
      this._redditService.getSubredditAutocomplete({include_over_18: false, include_profiles: false, query: subName}).subscribe((result: any) => {
        this.autocompleteNames = result.subreddits.filter((subreddit) => {
          return subreddit.allowedPostTypes.images && this.tags.indexOf(subreddit.name) == -1;
        }).map(subreddit => subreddit.name);
      });
    }else{
      this.autocompleteNames = [];
    }
  }

  onSortChange(){
    this.getImages();
  }

  addTag(subName: string, event: any){
    this.tags.push(subName);

    const autoIdx = this.autocompleteNames.indexOf(subName);
    if(autoIdx != -1){
      this.autocompleteNames.splice(autoIdx, 1);
    }
    event.preventDefault();
    event.stopPropagation();
  }

  removeTag(subName: string){
    const removeIdx = this.tags.indexOf(subName);

    if(removeIdx != -1){
      this.tags.splice(removeIdx, 1);
    }
  }

  onScroll(event: any){
    let source = event.srcElement;
    if(!this.appendImages && source.scrollHeight - source.scrollTop - source.clientHeight === 0){
      this.appendNewImages();
    }
  }
}
