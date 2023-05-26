import { Component } from '@angular/core';
import { News } from '../news';
import { NewsService } from '../services/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  allNews!: News[];
  dateFilter!: string;
  categoryFilter!: string;
  prevDateFilter: string = '';
  prevCategoryFilter: string = '';

  constructor(private newsService: NewsService, private router: Router) {}
  
  ngOnInit() {
    this.newsService.viewNews().subscribe((allNews: News[]) => {
      this.allNews = allNews;
      console.log(this.allNews);
    })
  }

  filter(dateFilter: string, categoryFilter: string) {
    if (dateFilter == undefined)
      dateFilter = "";
    if (categoryFilter == undefined)
      categoryFilter = "";
    
    
    this.newsService.filterNews(dateFilter, categoryFilter).subscribe((allNews: News[]) => {
      this.allNews = allNews;
      console.log(this.allNews);
      console.log(dateFilter);
      console.log(categoryFilter);
    })

    this.prevDateFilter = dateFilter;
        this.prevCategoryFilter = categoryFilter;
        this.dateFilter = '';
        this.categoryFilter = '';
  }

  updateNews(id: number){
    this.router.navigate(['update', id]);
  }

}
