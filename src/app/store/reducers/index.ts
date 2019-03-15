import { ActionReducerMap } from '@ngrx/store';
import * as fromImage from './image.reducers';
import * as fromSearch from './search.reducers';

export interface AppState {
    images: fromImage.State
    search: fromSearch.State
}

export const reducers: ActionReducerMap<AppState> = {
    images: fromImage.reducer,
    search: fromSearch.reducer
};