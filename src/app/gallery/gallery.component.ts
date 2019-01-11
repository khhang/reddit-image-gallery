import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChange, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ImageData } from '../models/imageData';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent implements OnInit {

  @ViewChild('gallery') gallery;
  @Input()
  set imageData(value: ImageData[]){
    console.log('Set');
    this._imageData = value;
    this.originalWidths = [];
    // this.cdr.detectChanges();
    // this.resizeGallery();
  };
  @Output() scrolledToBottom = new EventEmitter<any>();

  private _imageData: ImageData[] = [];
  private originalWidths = [];

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  onScroll(event: any){
    this.scrolledToBottom.emit(event);
  }

  getOriginalWidths(imageNodes): void {
    for(let i = 0; i < imageNodes.length; i++){
      if(imageNodes[i].nodeName === 'DIV'){
        imageNodes[i].childNodes[0].height = 350;
        if(this._imageData[i]){
          // console.log("Image data exists");
          // console.log(this._imageData[i]);
          this._imageData[i].originalWidth = this._imageData[i].originalWidth ? this._imageData[i].originalWidth : imageNodes[i].clientWidth;
        }
      }
    }
  }

  resizeGallery(){
    // 1. Get the total width of the div
    const galleryElem = this.gallery.nativeElement;

    // Width of gallery container
    console.log(this.gallery.nativeElement.clientWidth);

    // 2. Build an array of the original widths of the images when set to given height in px
    let imageNodes = Array.from(galleryElem.childNodes).filter((node: any) => {
        return node.nodeName === 'DIV';
    });

    this.getOriginalWidths(imageNodes);
    console.log(imageNodes);
    console.log('Image Data: ')
    console.log(this._imageData);

    // 3. Create a temporary array to hold a row of image elements
    let imageRows = [];
    let imageRowWidth = 0;
    let tempImageArray = [];

    // 4. Push images onto the array until the accumulated original width is greather than the total width of the div
    for(let i = 0; i < this._imageData.length; i++){
      imageRowWidth += this._imageData[i].originalWidth;
      tempImageArray.push(imageNodes[i]);
      if(imageRowWidth > galleryElem.clientWidth){
        imageRowWidth = 0;
        imageRows.push(tempImageArray);
        tempImageArray = [];
      }
    }
    // console.log(imageRows);

    // 5. Resize each row until width of all elements are less than that of total row (account for padding?)
    for(let i = 0; i < imageRows.length; i++){
      let currImageRow = imageRows[i];
      // console.log(currImageRow);
      let totalWidth = currImageRow.reduce((accum, currValue) => {
        console.log(currValue.clientWidth);
        return accum + currValue.clientWidth;
      }, 0);
      // console.log(`Row: ${i}, Width: ${totalWidth}`);
      while(totalWidth >= galleryElem.clientWidth){
        let newWidth = 0;
        currImageRow.forEach((image) => {
          image.childNodes[0].height--; // We use childNodes property here because the img is wrapped in a div element
          newWidth += image.clientWidth;
        });
        totalWidth = newWidth;
      }
    }
  }

  onResize(){
    // this.resizeGallery();
  }

  onImageLoad(idx: number, event: any){
    this._imageData[idx].originalWidth = event.path[0].clientWidth;
    console.log(event);
    if(this.originalWidths.length == this._imageData.length){
      console.log('run function');
    }
    console.log(`Orig: ${this.originalWidths.length}, Image: ${this._imageData.length}`);
  }
}
