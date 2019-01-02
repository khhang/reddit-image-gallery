import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  @ViewChild('gallery') gallery;
  @Input('imageData') imageData: ImageData;
  @Output() scrolledToBottom = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onScroll(event: any){
    this.scrolledToBottom.emit(event);
  }

  onResize(){
    console.log(this.gallery);
    const galleryElem = this.gallery.nativeElement;

    // Width of gallery container
    console.log(this.gallery.nativeElement.clientWidth);

    let temp = [];
    let totalWidth = 0;
    
    for(let i = 0; i < galleryElem.children.length; i++){
      const currImage = galleryElem.childNodes[i].childNodes[0];
      if(currImage && totalWidth < galleryElem.clientWidth){
        totalWidth += currImage.clientWidth;
        temp.push(currImage);
      }
    }

    while(totalWidth > galleryElem.clientWidth){
      let newWidth = 0;
      temp.forEach((image) => {
        console.log(image);
        image.height--;
        newWidth += image.clientWidth;
      });
      totalWidth = newWidth;
    }

    console.log(temp);
    console.log(totalWidth);
  }

}
