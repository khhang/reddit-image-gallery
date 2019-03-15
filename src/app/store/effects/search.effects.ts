import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import * as SearchActions from '../actions/search.actions';
import { switchMap, map, catchError } from 'rxjs/operators';

import { RedditService } from '../../services/reddit.service';

@Injectable()
export class SearchEffects {
    // Listen to type of actions being dispatched and respond to them accordingly
    constructor(private actions$: Actions, private redditService: RedditService) {}

    @Effect()
    getSubAutocomplete$ = this.actions$.pipe(
        ofType(SearchActions.SearchActionTypes.GetSubAutocomplete),
        switchMap((action: SearchActions.GetSubAutocomplete) => {
            console.log(action);
            return this.redditService.getSubredditAutocomplete({include_over_18: false, include_profiles: false, query: action.payload}).pipe(
                map((subNamesAutocomplete: any) => new SearchActions.GetSubAutocompleteSuccess(subNamesAutocomplete.subreddits)),
                catchError(error => of(new SearchActions.GetSubAutocompleteFailed(error)))
            );
        })
    );
}