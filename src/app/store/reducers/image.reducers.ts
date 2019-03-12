import { ImageData } from './../../models/imageData';
import * as  ImageActions from './../actions/image.actions';

export interface State {
    data: ImageData[],
    loaded: boolean,
    loading: boolean
}

export const initialState: State = {
    data: [],
    loaded: false,
    loading: false
};

export function reducer(state: State = initialState, action: ImageActions.Actions): State {
    switch(action.type){
        case ImageActions.GET_IMAGES:
            return {
                ...state,
                loading: true
            };
        case ImageActions.GET_IMAGES_SUCCESS:
            const data = action.payload;
            return {
                ...state,
                loading: false,
                loaded: true,
                data
            }
        case ImageActions.GET_IMAGES_FAILED:
            return {
                ...state,
                loading: false,
                loaded: false
            }
        default:
            return state;
    }
}