import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RedditService } from './services/reddit.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatToolbarModule, MatInputModule, MatIconModule, MatSidenavModule, MatRadioModule, MatCardModule, MatSelectModule, MatAutocompleteModule, MatChipsModule } from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GalleryComponent } from './gallery/gallery.component';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatChipsModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [
    RedditService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
