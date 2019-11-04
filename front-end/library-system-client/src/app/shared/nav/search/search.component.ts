import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BooksDataService } from '../../../components/books/books-data.service';
import { SearchService } from '../../../core/services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public query = 'title';
  public input: string;

  ngOnInit() {}
  constructor(
    private readonly searchService: SearchService) {}

  public sendSearchInfo() {
    this.searchService.collectSearchInfo(this.query, this.input);
  }

}
