import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-delete-book',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './delete-book.component.html',
  styleUrl: './delete-book.component.scss'
})
export class DeleteBookComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteBookComponent>,
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
