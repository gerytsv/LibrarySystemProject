import { BookDTO } from './../models/book.dto';
import { DialogService } from './../../../core/services/dialog.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-single-book-preview',
  templateUrl: './single-book-preview.component.html',
  styleUrls: ['./single-book-preview.component.css']
})
export class SingleBookPreviewComponent implements OnInit {
  public book: BookDTO;
  constructor(
    private readonly dialogService: DialogService,
    private readonly router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    const cover = this.data.data.cover;
    this.book = this.data.data.book;

    $(document).ready(function() {
      $('.book')
        .css('background', `url(${cover}) no-repeat center center`)
        .css('background-size', 'cover');
    });

    $('.book').mouseenter(function() {
      $(this)
        .parent('.book-wrap')
        .addClass('rotate');
    });

    $('.book').mouseleave(function() {
      $(this)
        .parent('.book-wrap')
        .removeClass('rotate');
    });

    $('.book').click(function() {
      $(this)
        .parent('.book-wrap')
        .addClass('flip');
    });

    $('.book-back').click(function() {
      $(this)
        .parent('.book-wrap')
        .removeClass('flip');
    });
  }
}
