import { Component, OnInit } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { IAddBook, IBook, IEditBook } from '../interfaces/book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { MatDialog } from '@angular/material/dialog';
import { AddBookComponent } from '../dialogs/add-book/add-book.component';
import { EditBookComponent } from '../dialogs/edit-book/edit-book.component';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    MatButtonModule,
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss'
})
export class BookDetailComponent implements OnInit {
  public book: IBook | undefined;

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
    //private location: Location,
  ) { }
  
  public ngOnInit(): void {
    this.loadBook();
  }

  //private loadBook(): void {
    //let id =

  //  this.bookService.getBook(id).subscribe(bookFromService => {
  //  this.bookCardList = bookFromService;
  //  this.filteredBookCardList = this.bookCardList;
  //  });
    //this.filteredBookCardList = this.bookCardList;

    //console.log('');
  //}


  private loadBook(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.bookService.getBook(id).subscribe(
        bookFromService => {
          this.book = bookFromService;
        },
        (error) => {
          console.error('Error loading book:', error);
        }
      );
    } else {
      console.error('Invalid book ID');
    }
  }

  public goBack(): void {
    //this.location.back();
    this.router.navigate(['/books']);
  }

  //public editBook(): void {
  //  const dialogRef = this.dialog.open(EditBookComponent);
  //  dialogRef.afterClosed().subscribe((result: IEditBook) => {
  //    if (result) {
  //      this.bookService.editBook(result);
  //    }
  //  });
  //}
  
  public editBook(): void {
    const dialogRef = this.dialog.open(EditBookComponent, {
      data: this.book
    });

    dialogRef.afterClosed().subscribe((result: IEditBook) => {
      if (result) {
        this.bookService.editBook(result).subscribe(() => {
          this.loadBook();
        });
      }
    });
    }

}
