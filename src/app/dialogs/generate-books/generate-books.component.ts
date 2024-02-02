import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IAddBook } from '../../interfaces/book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generate-books',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './generate-books.component.html',
  styleUrl: './generate-books.component.scss'
})
export class GenerateBooksComponent implements OnInit{
  public generateForm = new FormGroup({
    count: new FormControl<number>(1, [Validators.required, Validators.min(1)]),
  });

  constructor(
    public dialogRef: MatDialogRef<GenerateBooksComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: number
  ) {
  }

  public ngOnInit(): void {
    if (this.data) {
      this.generateForm.get('count')?.setValue(1);
    }
  }

  public get count(): FormControl<number> {
    return this.generateForm.get('count') as FormControl<number>;
  }

  public onOk(): void {
    this.onAdd();
  }

  private onAdd(): void {
    let count: number = this.generateForm.get('count')?.value ?? 0;
    this.dialogRef.close(count);
  }

  public onClose(): void {
    this.dialogRef.close();
  }

}
