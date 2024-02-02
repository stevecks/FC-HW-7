import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { IAddBook, IBook, IEditBook } from '../../interfaces/book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss'
})
export class AddBookComponent implements OnInit {

  public bookForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    author: new FormControl<string>('', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<AddBookComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: IAddBook
  ) {
  }

  public ngOnInit(): void {
    if (this.data) {
      this.bookForm.get('name')?.setValue(this.data.name);
      this.bookForm.get('author')?.setValue(this.data.author);
    }
  }

  public get name(): FormControl<string> {
    return this.bookForm.get('name') as FormControl<string>;
  }

  public get author(): FormControl<string> {
    return this.bookForm.get('author') as FormControl<string>;
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onOk(): void {
    this.onAdd();
  }

  private onAdd(): void {
    let book: IAddBook = {
      name: this.bookForm.get('name')?.value ?? '',
      author: this.bookForm.get('author')?.value ?? '',
    };
    this.dialogRef.close(book);
  }

}
