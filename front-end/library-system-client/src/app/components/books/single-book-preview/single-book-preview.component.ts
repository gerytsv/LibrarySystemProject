import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-single-book-preview',
  templateUrl: './single-book-preview.component.html',
  styleUrls: ['./single-book-preview.component.css']
})
export class SingleBookPreviewComponent implements OnInit {
  @Input() book;

  constructor() {}

  ngOnInit() {}
}
