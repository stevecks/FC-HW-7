import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { IAddBook, IBook } from '../interfaces/book';
import { AddBookComponent } from '../dialogs/add-book/add-book.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { GenerateBooksComponent } from '../dialogs/generate-books/generate-books.component';
import { DeleteBooksComponent } from '../dialogs/delete-books/delete-books.component';
import { FormsModule } from '@angular/forms';
import { DeleteBookComponent } from '../dialogs/delete-book/delete-book.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  public bookCardList: IBook[] = [];
  public filteredBookCardList: IBook[] = [];
  public searchText: string = '';
  isInputFocused: boolean = false;

  public noBook: boolean = true;
  public noBookSearch: boolean = false;
  public onSearch: boolean = false;

  constructor(
    public bookService: BookService,
    private dialog: MatDialog
  ) { }
  public ngOnInit(): void {
    this.noBook = false;
    this.onSearch = false;
    this.noBookSearch= false;
    this.loadBooks();
  }


  private loadBooks(): void {
    this.bookService.getAllBooks().subscribe(bookFromService => {
      this.bookCardList = bookFromService;
      this.filteredBookCardList = this.bookCardList;
      this.noBook = false;
      if (this.bookCardList.length === 0) this.noBook = true;
    });
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

  public addBook(): void {
    const dialogRef = this.dialog.open(AddBookComponent);
    dialogRef.afterClosed().subscribe((result: IAddBook) => {
      if (result) {
        this.bookService.addBook(result).subscribe(() => {
          this.loadBooks();
        });
      }
    });
  }

  public generateBooks(): void {
    const dialogRef = this.dialog.open(GenerateBooksComponent);
    dialogRef.afterClosed().subscribe((result: number) => {
      if (result > 0) {
        this.bookService.generateBooks(result).subscribe(() => {
          this.loadBooks();
        });
      }
    });
  }

  public deleteAllBooks(): void {
    const dialogRef = this.dialog.open(DeleteBooksComponent);
    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.bookService.deleteBooks().subscribe(() => {
          this.reset()
          this.loadBooks();
        });
      }
    });
  }

  public deleteBook(id: string): void {
    const dialogRef = this.dialog.open(DeleteBookComponent);
    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.bookService.deleteBook(id).subscribe(() => {
          this.loadBooks();
        })
      }
    });
  }

}

