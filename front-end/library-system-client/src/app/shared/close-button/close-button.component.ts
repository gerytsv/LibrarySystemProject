import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-close-button',
  templateUrl: './close-button.component.html',
  styleUrls: ['./close-button.component.css']
})
export class CloseButtonComponent implements OnInit {

  constructor(
    private readonly dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  public close() {
    this.dialog.closeAll();
  }
}
