import * as SearchActions from './../actions/search.actions';

export interface State {
    subs: string[],
    tags: string[],
    searchOptions: any,
    loaded: boolean,
    loading: boolean
}

export const initialState: State = {
    subs: [],
    tags: [],
    searchOptions: {},
    loaded: false,
    loading: false
}

export function reducer(state: State = initialState, action: SearchActions.SearchActionsUnion): State {
    switch(action.type){
        case SearchActions.SearchActionTypes.SelectSortOption:
            return {
                ...state
            };
        case SearchActions.SearchActionTypes.SelectFilterOption:
            return {
                ...state
            };
        case SearchActions.SearchActionTypes.AddTag:
            return {
                ...state,
                tags: [...state.tags, action.payload]
            };
        case SearchActions.SearchActionTypes.RemoveTag:
            return {
                ...state,
                tags: state.tags.filter(tag => tag !== action.payload)
            };
        case SearchActions.SearchActionTypes.GetSubAutocomplete:
            return {
                ...state,
                loading: true,
                loaded: false
            };
        case SearchActions.SearchActionTypes.GetSubAutocompleteSuccess:
            return {
                ...state,
                subs: action.payload,
                loading: false,
                loaded: true
            };
        case SearchActions.SearchActionTypes.GetSubAutocompleteFailed:
            return {
                ...state,
                loading: false,
                loaded: false
            };
        default:
            return state;
    }
}