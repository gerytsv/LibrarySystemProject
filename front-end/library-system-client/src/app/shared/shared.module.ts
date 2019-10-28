import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './nav/search/search.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CloseButtonComponent } from './close-button/close-button.component';



@NgModule({
  declarations: [SearchComponent, NavComponent, FooterComponent, CloseButtonComponent],
  imports: [
    CommonModule, MatDialogModule
  ],
  exports: [
    SearchComponent, NavComponent, FooterComponent, MatDialogModule, CloseButtonComponent
  ]
})
export class SharedModule { }
