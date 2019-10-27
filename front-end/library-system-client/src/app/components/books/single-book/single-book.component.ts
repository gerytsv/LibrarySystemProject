import { BookDTO } from '../models/book.dto';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {
  @Input() public book: BookDTO;
  public imageUniques: string[] = [
    'https://i1249.photobucket.com/albums/hh506/gery_tsv/book_2b_flat_zpsy0n0jodb.png',
    'https://i1249.photobucket.com/albums/hh506/gery_tsv/book_1b_flat_zpsfrvh4rxs.png',
    'https://i1249.photobucket.com/albums/hh506/gery_tsv/book_5b_flat_zpskdczqie1.png',
    'https://i1249.photobucket.com/albums/hh506/gery_tsv/book_4b_flat_zpswbcizfkn.png',
    'https://i1249.photobucket.com/albums/hh506/gery_tsv/book_3b_flat_zpscwufshmy.png',
    'https://i1249.photobucket.com/albums/hh506/gery_tsv/book_6b_flat_zpsis9yj0va.png'
  ];

  public imagesForUse: string[] = this.imageUniques;

  constructor() {}

  public chooseRandomDesign() {
    // refilling the array if needed
    if (!this.imagesForUse.length) {
      this.imagesForUse = this.imageUniques; // something s wrong here on the 5/6th reload
    }
    const index = Math.floor(Math.random() * this.imagesForUse.length);
    const val = this.imagesForUse[index];

    // now remove that value from the array
    this.imagesForUse.splice(index, 1);

    this.book.cover = val;
  }

  ngOnInit(): void {
    this.chooseRandomDesign();
  }
}
