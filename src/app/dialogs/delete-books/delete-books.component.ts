import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IAddBook } from '../../interfaces/book';
import { AddBookComponent } from '../add-book/add-book.component';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-books',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './delete-books.component.html',
  styleUrl: './delete-books.component.scss'
})
export class DeleteBooksComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteBooksComponent>,
    public bookService: BookService
  ) {
  }


  public onClose(): void {
    this.dialogRef.close();
  }

  public onOk(): void {
    this.delete();
  }

  private delete(): void {
    this.dialogRef.close(true);    
  }
}
