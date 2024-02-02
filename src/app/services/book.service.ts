import { Injectable } from '@angular/core';
import { IAddBook, IBook, IEditBook } from '../interfaces/book';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private _books: IBook[] = [];

  constructor(
    private httpClient: HttpClient,
  ) { }

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
  ]);
  */

  public getAllBooks(): Observable<IBook[]> {
    return this.httpClient.get<IBook[]>(environment.apiUrl + 'books')
  }

  public getBook(id: string): Observable<IBook> {
    return this.httpClient.get<IBook>(environment.apiUrl + 'books/' + id)
  }

  public addBook(requestBook: IAddBook): Observable<IAddBook> {
    return this.httpClient.post<IAddBook>(environment.apiUrl + 'books', requestBook)
  }

  public editBook(requestBook: IEditBook): Observable<IEditBook> {
    return this.httpClient.put<IEditBook>(environment.apiUrl + 'books/' + requestBook.id, requestBook)
  }

  public generateBooks(count: number): Observable<number> {
    return this.httpClient.post<number>(environment.apiUrl + 'books/generate/' + count, count)
  }

  public deleteBooks(): Observable<void> {
    return this.httpClient.delete<void>(environment.apiUrl + 'books')
  }

  public deleteBook(id: string): Observable<void> {
    return this.httpClient.delete<void>(environment.apiUrl + 'books/' + id)
  }
}
