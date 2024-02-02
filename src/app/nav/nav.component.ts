import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { INavigationItem } from '../interfaces/navigation-item';
import { NavigationItemService } from '../services/navigation-item.service'; //
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { inject } from '@angular/core/testing';
import { BookService } from '../services/book.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    RouterModule
    
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  public pageItems: INavigationItem[] = [];
  public editItems: INavigationItem[] = [];
  public activatedItemName: string = 'books';
  public activatedItemIcon: string = 'menu_book';
  item: any;

  //navigationService: NavigationItemService = inject(NavigationItemService);

  constructor(
    public navigationService: NavigationItemService,
    public bookService: BookService,
    public authService: AuthService
    ) {
    //this.mailItems = this.navigationService.getmailItems();
    //this.folders = this.navigationService.getfolders();
    
  }

  public ngOnInit(): void {
    this.pageItems = this.navigationService.getpageItems();
    this.editItems = this.navigationService.geteditItems();
  }

  public onItemClick(item: INavigationItem): void {
    this.activatedItemName = item.name;
    this.activatedItemIcon = item.icon;
  }

  public getIsAuthorized(): boolean {
    return this.authService.isAuthorized;
  }
  
}

