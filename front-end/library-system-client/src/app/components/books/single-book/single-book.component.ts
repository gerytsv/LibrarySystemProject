import { BookDTO } from '../models/book.dto';
import { Component, OnInit, Input } from '@angular/core';
import { DialogService } from '../../../core/services/dialog.service';
@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {
  @Input() public book: BookDTO;
  public imageUniques: string[] = [
    '../../../../assets/covers/cover-1.png',
    '../../../../assets/covers/cover-2.png',
    '../../../../assets/covers/cover-3.png',
    '../../../../assets/covers/cover-4.png',
    '../../../../assets/covers/cover-5.png',
    '../../../../assets/covers/cover-6.png',
    '../../../../assets/covers/cover-7.png',
    '../../../../assets/covers/cover-8.png',
    '../../../../assets/covers/cover-9.png',
    '../../../../assets/covers/cover-10.png',
    '../../../../assets/covers/cover-11.png',
    '../../../../assets/covers/cover-12.png',
    '../../../../assets/covers/cover-13.png',
    '../../../../assets/covers/cover-14.png',
    '../../../../assets/covers/cover-15.png',
    '../../../../assets/covers/cover-16.png',
    '../../../../assets/covers/cover-17.png',
    '../../../../assets/covers/cover-18.png',
    '../../../../assets/covers/cover-19.png',
    '../../../../assets/covers/cover-20.png'
  ];

  public imagesForUse: string[] = this.imageUniques;

  constructor(private readonly dialogService: DialogService) {}

  public chooseRandomDesign() {
    // refilling the array if needed
    if (!this.imagesForUse.length) {
      this.imagesForUse = this.imageUniques;
    }
    const index = Math.floor(Math.random() * this.imagesForUse.length);
    const val = this.imagesForUse[index];

    // now remove that value from the array
    this.imagesForUse.splice(index, 1);

    this.book.cover = val;
  }

  public onBookClick() {
    this.dialogService.openBookPreview();
  }

  ngOnInit(): void {
    setTimeout ( () => {
    this.chooseRandomDesign();
  });
  }
}
