import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { IAddBook, IBook, IEditBook } from '../../interfaces/book';
import { AddBookComponent } from '../add-book/add-book.component';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.scss'
})
export class EditBookComponent {

  public bookForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    author: new FormControl<string>('', Validators.required),
  });

  constructor(
    private bookService: BookService,
    public dialogRef: MatDialogRef<AddBookComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: IEditBook
  ) {
    if (data) {
      this.bookForm.setValue({
        name: data.name,
        author: data.author
      });
    }
  }

  public get name(): FormControl<string> {
    return this.bookForm.get('name') as FormControl<string>;
  }

  public get author(): FormControl<string> {
    return this.bookForm.get('author') as FormControl<string>;
  }

  public onOk(): void {
    if (this.data) {
      this.onEdit();
    }
  }

  private onEdit(): void {
    if (!this.data) return;
    let book: IEditBook = {
      id: this.data.id,
      name: this.bookForm.get('name')?.value ?? '',
      author: this.bookForm.get('author')?.value ?? '',
    };
    this.dialogRef.close(book);
  }

  public goBack(): void {
    this.dialogRef.close();
  }

}
