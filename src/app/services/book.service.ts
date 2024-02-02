import { Injectable } from '@angular/core';
import { IAddBook, IBook, IEditBook } from '../interfaces/book';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ){}

  private _currentId: number = 5;

  /*
  private booksList: BehaviorSubject<IBook[]> = new BehaviorSubject<IBook[]>([
    
    {
      id: '1',
      author: 'Автор 1',
      name: 'Книга 1',
    },
    {
      id: '2',
      author: 'Автор 2',
      name: 'Книга 2',
    },
    {
      id: '3',
      author: 'Автор 3',
      name: 'Книга 3',
    },
    {
      id: '4',
      author: 'Автор 4',
      name: 'Книга 4',
    },
    {
      id: '5',
      author: 'Автор 5',
      name: 'Книга 5',
    },
    
  ]);

  */

  private _books: IBook[] = [];

  public getAllBooks(): Observable<IBook[]> {
    //let headers = new HttpHeaders({ 
    //  ['Content-Type']: 'application/json',
    //  ['Authorization']: `Bearer ${this.authService.accessToken}` 
    // });

    return this.httpClient.get<IBook[]>(environment.apiUrl + 'books'
    //, {
    //  headers: headers
    //}
    )
  }

  public getBook(id: string): Observable<IBook> {
    return this.httpClient.get<IBook>(environment.apiUrl + 'books/'+ id)
  }

  //public addBook(addBookRequest: IAddBook): Observable<any> {
    //this._currentId++;
    //let book: IBook = {
    //  id: this._currentId.toString(),
    //  name: addBookRequest.name,
    //  author: addBookRequest.author
    //};


    ////this._books.push(book);
    
    //const currentList = this.booksList.value;
    //currentList.push(book);
    //this.booksList.next(currentList);
  //  return of();
  //}

  public addBook(requestBook: IAddBook): Observable<IAddBook> {
    return this.httpClient.post<IAddBook>(environment.apiUrl + 'books', requestBook)
  }

  public editBook(requestBook: IEditBook): Observable<IEditBook> {
    return this.httpClient.put<IEditBook>(environment.apiUrl + 'books/'+ requestBook.id, requestBook)
  }

  public generateBooks(count: number): Observable<number> {
    return this.httpClient.post<number>(environment.apiUrl + 'books/generate/'+ count, count)
  }

  public deleteBooks(): Observable<void> {
    return this.httpClient.delete<void>(environment.apiUrl + 'books')
  }

  public deleteBook(id: string): Observable<void> {
    return this.httpClient.delete<void>(environment.apiUrl + 'books/'+ id)
  }
}
