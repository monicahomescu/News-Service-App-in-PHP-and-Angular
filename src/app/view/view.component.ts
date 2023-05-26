import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from '../news';
import { NewsService } from '../services/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  allNews!: News[];

  constructor(private newsService: NewsService, private router: Router) {}
  
  ngOnInit() {
    this.newsService.viewNews().subscribe((allNews: News[]) => {
      this.allNews = allNews;
      console.log(this.allNews);
    })
  }

  updateNews(id: number){
    this.router.navigate(['update', id]);
  }

}
