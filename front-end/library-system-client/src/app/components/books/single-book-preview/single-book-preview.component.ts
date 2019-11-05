import { DialogService } from './../../../core/services/dialog.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
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
  // how are we going to take the info (cover used(assets), title, author...) from the single-book-component
  ngOnInit() {
    $(document).ready(function() {
      $('.book')
        .css(
          'background',
          'url(https://i1249.photobucket.com/albums/hh506/gery_tsv/book_4b_flat_zpswbcizfkn.png) no-repeat center center'
        )
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
