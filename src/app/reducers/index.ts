import { ActionReducerMap } from '@ngrx/store';
import * as fromImage from './image.reducers';

export interface AppState {
    images: fromImage.State
}

export const reducers: ActionReducerMap<AppState> = {
    images: fromImage.reducer
};