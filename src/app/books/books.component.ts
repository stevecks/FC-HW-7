import { Component, OnInit } from '@angular/core';
import { IAddBook, IBook } from '../interfaces/book';
import { BookService } from '../services/book.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AddBookComponent } from '../dialogs/add-book/add-book.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit {
  //public bookCardList: IBooksItem[] = [];
  //private bookService: BooksItemService = inject(BooksItemService);
  
  public noBook: boolean = true;
  public noBookSearch: boolean = false;
  public onSearch: boolean = false;

  public bookCardList: IBook[] = [];
  public filteredBookCardList: IBook[] = [];
  
  public searchText: string = '';

  constructor(
    public bookService: BookService,
    private router: Router
  ) {
    //this.bookCardList = this.bookService.getAllBooks();
    //this.filteredBookCardList = this.bookCardList;
  }
  public ngOnInit(): void {
    this.noBook = false;
    this.onSearch = false;
    this.noBookSearch= false;
    this.loadBooks();
    //this.filterResults();
  }

  private loadBooks(): void {
    this.bookService.getAllBooks().subscribe(bookFromService => {
      this.bookCardList = bookFromService;
      this.filteredBookCardList = this.bookCardList;
      if ( this.bookCardList.length === 0 ) this.noBook = true;
    });
    //this.filteredBookCardList = this.bookCardList;
    
    //console.log('');
  }

  public filterResults(text: string) {
    this.searchText = text;
    if (!text) {
      return;
    }
    this.onSearch = true;
    this.filteredBookCardList = this.bookCardList.filter(
      book => book?.name.toLowerCase().includes(text.toLowerCase())
    );
    if (this.filteredBookCardList.length === 0) this.noBookSearch = true;
    else this.noBookSearch = false;
  }

  public clear() {
    this.searchText = '';
  }
  
  public reset() {
    this.searchText = '';
    this.ngOnInit();
  }

  public openBook(id: string) {
    this.router.navigate([`/books/${id}`]);
  }

  /*
  public addBook(): void {
    const dialogRef = this.dialog.open(AddBookComponent);
    dialogRef.afterClosed().subscribe((result: IAddBook) => {
      if (result) {
        this.bookService.addBook(result);
      }
    });
  }
  */

  public goEdit() {
    this.router.navigate(['/edit']);
  }

  public generateRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

