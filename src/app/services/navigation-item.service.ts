import { Injectable } from '@angular/core';
import { INavigationItem } from '../interfaces/navigation-item';

@Injectable({
  providedIn: 'root'
})
export class NavigationItemService {
  public pageItems: INavigationItem[] = [
    {
      name: 'home', //
      icon: 'home',
      label: 'HOME',
      link: 'home',
    },
    {
      name: 'books',
      icon: 'menu_book',
      label: 'BOOKS',
      link: 'books',
    },
    {
      name: 'edit', 
      icon: 'edit',
      label: 'EDIT',
      link: 'edit',
    },
  ];
  public editItems: INavigationItem[] = [
    {
      name: '5',
      icon: 'edit_note',
      label: 'CHANGE',
      link: 'home',
    },
    {
      name: '6',
      icon: 'add',
      label: 'ADD',
      link: 'home',
    },
    {
      name: '7',
      icon: 'delete',
      label: 'DELETE',
      link: 'home',
    },
  ];

  public getpageItems(): INavigationItem[] {
    return this.pageItems;
  }

  public geteditItems(): INavigationItem[] {
    return this.editItems;
  }
}