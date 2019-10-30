import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './nav/search/search.component';
import { MatDialogModule, MatDialogConfig } from '@angular/material/dialog';
import { CloseButtonComponent } from './close-button/close-button.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SearchComponent, NavComponent, FooterComponent, CloseButtonComponent],
  imports: [
    CommonModule, MatDialogModule, RouterModule
  ],
  exports: [
    SearchComponent, NavComponent, FooterComponent, MatDialogModule, CloseButtonComponent]

})
export class SharedModule { }
