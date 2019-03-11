// Listen to Get Images actions, fire request, dispatch action to reducer
import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import * as ImageActions from '../actions/image.actions';
import { switchMap, map, catchError } from 'rxjs/operators';

import { RedditService } from '../../services/reddit.service';

@Injectable()
export class ImagesEffects {
    // Listen to type of actions being dispatched and respond to them accordingly
    constructor(private actions$: Actions, private redditService: RedditService) {}

    @Effect()
    getImages$ = this.actions$.pipe(
        ofType(ImageActions.GET_IMAGES),
        switchMap((action) => {
            console.log(action);
            return this.redditService.getSubreddits(['BeAmazed'], 'hot').pipe(
                map((subreddits) => {
                    const images = this.redditService.parseImageData(subreddits); // Process subs to pull images from subs
                    return new ImageActions.GetImagesSuccess(images);
                }),
                catchError(error => of(new ImageActions.GetImagesFailed(error)))
            );
        })
    );
}