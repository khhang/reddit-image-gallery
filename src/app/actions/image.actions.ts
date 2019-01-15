import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ImageData } from './../models/imageData';

export const GET_IMAGES = '[IMAGES] Get';
export const GET_IMAGES_SUCCESS = '[IMAGES] Get Success';
export const GET_IMAGES_FAILED = '[IMAGES] Get Failure';

export class GetImages implements Action {
    readonly type = GET_IMAGES;

    constructor() {}
}

export class GetImagesSuccess implements Action {
    readonly type = GET_IMAGES_SUCCESS;

    constructor(public payload: any) {}
}

export class GetImagesFailed implements Action {
    readonly type = GET_IMAGES_FAILED;

    constructor(public payload: ImageData[]) {}
}

export type Actions = GetImages | GetImagesSuccess | GetImagesFailed;