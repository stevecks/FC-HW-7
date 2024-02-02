import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-log-out',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './log-out.component.html',
  styleUrl: './log-out.component.scss'
})
export class LogOutComponent {
  constructor(
    public dialogRef: MatDialogRef<LogOutComponent>,
  ) { }


  public onClose(): void {
    this.dialogRef.close();
  }

  public onOk(): void {
    this.logout();
  }

  private logout(): void {
    this.dialogRef.close(true);    
  }
}
