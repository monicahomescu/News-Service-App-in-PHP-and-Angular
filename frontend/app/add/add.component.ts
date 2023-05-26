import { Component, OnInit } from '@angular/core';
import { News } from '../news';
import { NewsService } from '../services/news.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  news = new News();
  submitted = false;
  error!: string;

  constructor(private newsService: NewsService, private router: Router, private usersService: UsersService) { }

  ngOnInit() { }

  save() {
    this.newsService.addNews(this.news).subscribe((news: News) => {
      console.log("News created", news)
    })
  }

  onSubmit() {
    if (this.areTextboxesEmpty()) {
      let msg = 'Please fill in:';
      if (!this.news.text)
        msg += ' Text,';
        if (!this.news.title)
        msg += ' Title,';
        if (!this.news.producer)
        msg += ' Producer,';
        if (!this.news.date)
        msg += ' Date,';
        if (!this.news.category)
        msg += ' Category,';
      this.error = msg.slice(0, -1);
      return;
    }
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/view']);
  }

  areTextboxesEmpty(): boolean {
    return (
      !this.news.text ||
      !this.news.title ||
      !this.news.producer ||
      !this.news.date ||
      !this.news.category
    );
  }

}
