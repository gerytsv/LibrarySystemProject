import { DialogService } from './../../../core/services/dialog.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-book-preview',
  templateUrl: './single-book-preview.component.html',
  styleUrls: ['./single-book-preview.component.css']
})
export class SingleBookPreviewComponent implements OnInit {
  @Input() book;

  constructor(
    private readonly dialogService: DialogService,
    private readonly router: Router
  ) {}

  ngOnInit() {}
}
