import { Action } from '@ngrx/store';

export enum SearchActionTypes {
    SelectSortOption = '[SORT] Select',
    SelectFilterOption = '[FILTER] Select',
    AddTag = '[TAG] Add',
    RemoveTag = '[TAG] Remove',
    GetSubAutocomplete = '[AUTOCOMPLETE] Get',
    GetSubAutocompleteSuccess = '[AUTOCOMPLETE] Get Success',
    GetSubAutocompleteFailed = '[AUTOCOMPLETE] Get Failure'
}

export class SelectSortOption implements Action {
    readonly type = SearchActionTypes.SelectSortOption;

    constructor(public payload: any) {}
}

export class SelectFilterOption implements Action {
    readonly type = SearchActionTypes.SelectFilterOption;

    constructor(public payload: any) {}
}

export class AddTag implements Action {
    readonly type = SearchActionTypes.AddTag;

    constructor(public payload: any) {}
}

export class RemoveTag implements Action {
    readonly type = SearchActionTypes.RemoveTag;

    constructor(public payload: any) {}
}

export class GetSubAutocomplete implements Action {
    readonly type = SearchActionTypes.GetSubAutocomplete;

    constructor(public payload: any) {}
}

export class GetSubAutocompleteSuccess implements Action {
    readonly type = SearchActionTypes.GetSubAutocompleteSuccess;

    constructor(public payload: any) {}
}

export class GetSubAutocompleteFailed implements Action {
    readonly type = SearchActionTypes.GetSubAutocompleteFailed;

    constructor(public payload: any) {}
}

export type SearchActionsUnion = SelectSortOption 
    | SelectFilterOption
    | AddTag
    | RemoveTag
    | GetSubAutocomplete
    | GetSubAutocompleteSuccess
    | GetSubAutocompleteFailed;