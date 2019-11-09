import { BooksDataService } from './../books-data.service';
import { BookDTO } from './../models/book.dto';
import { DialogService } from './../../../core/services/dialog.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-single-book-preview',
  templateUrl: './single-book-preview.component.html',
  styleUrls: ['./single-book-preview.component.css']
})
export class SingleBookPreviewComponent implements OnInit {
  public book; // the book
  public currentIsBorrower = false;
  public borrower: string; // the user that has borrowed the this.book
  public currentUser: string;

  constructor(
    private readonly dialogService: DialogService,
    private readonly router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly booksService: BooksDataService,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    const cover = this.data.data.cover;

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

    console.log(cover);
    this.authService.loggedUser$.subscribe((response) => {
      this.currentUser = response.username;
      console.log(`Current User: ${response.username}`);
    });

    this.booksService
      .viewCurrentBook(this.data.data.book.id)
      .subscribe((response) => {
        this.book = response;
        // console.log(this.book);
        if (this.book.borrowedBy.username === undefined) {
          this.borrower = '-';
        } else {
          this.borrower = this.book.borrowedBy.username;
          if (this.currentUser === this.book.borrowedBy.username) {
            this.currentIsBorrower = true;
          }
        }
        console.log(`Borrower of book: ${this.borrower}`);
      });

    console.log(`isBorrowed: ${this.book.freeToBorrow}`);
    this.book.freeToBorrow = this.book.freeToBorrow;
  }

  public borrow() {
    // this.booksService.borrowBook(this.book.id).subscribe((r) => {
    //   console.log(r);
    // });
    if (!this.book.freeToBorrow) {
      // returning the book
      if (this.currentIsBorrower) {
        this.booksService.borrowBook(this.book.id).subscribe((r) => {
          // un-borrowing the book
          console.log(`Un-borrowing the book: ${r.title}`);
          this.book.freeToBorrow = true;
          this.borrower = '-';
        });
      }
    } else {
      // is free to borrow
      this.booksService.borrowBook(this.book.id).subscribe((r) => {
        // borrowing the book
        console.log(`Borrowing the book: ${r.title}`);
        this.book.freeToBorrow = false;
        this.borrower = this.currentUser;
      });
    }
  }

  public showReviews() {}
}
