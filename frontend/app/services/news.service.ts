import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from '../news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  baseUrl = 'http://localhost/wp';

  constructor(private httpClient: HttpClient) { }

  viewNews(): Observable<News[]> {
    return this.httpClient.get<News[]>(`${this.baseUrl}/view.php`);
  }

  addNews(news: News): Observable<News> {
    return this.httpClient.post<News>(`${this.baseUrl}/add.php`, news);
  }

  updateNews(news: News) {
    return this.httpClient.put<News>(`${this.baseUrl}/update.php`, news);
  }

  filterNews(dateFilter: string, categoryFilter: string): Observable<News[]> {
    return this.httpClient.get<News[]>(`${this.baseUrl}/filter.php` + `?date=${dateFilter}` + `&category=${categoryFilter}`);
  }

  detailsNews(id: number): Observable<News> {
    return this.httpClient.get<News>(`${this.baseUrl}/details.php` + `?id=${id}`);
  }

}
