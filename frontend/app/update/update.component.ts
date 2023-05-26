import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from '../news';
import { NewsService } from '../services/news.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  id!: number;
  news = new News();
  submitted = false;
  initial = new News();
  error!: string;

  constructor(private route: ActivatedRoute, private router: Router, private newsService: NewsService, private usersService: UsersService) { }

  ngOnInit() {
    this.news.id = this.route.snapshot.params['id'];
    this.newsService.detailsNews(this.news.id)
      .subscribe(data => {
        this.initial = data;
        console.log(data);
      })
  }

  updateNews() {
    if (this.news.text !== undefined) {
      this.news.text = this.news.text;
    }
    else 
    this.news.text = this.initial.text;

    if (this.news.title !== undefined) {
      this.news.title = this.news.title;
    }
    else 
    this.news.title = this.initial.title;

    if (this.news.producer !== undefined) {
      this.news.producer = this.news.producer;
    }
    else 
    this.news.producer = this.initial.producer;

    if (this.news.date !== undefined) {
      this.news.date = this.news.date;
    }
    else 
    this.news.date = this.initial.date;

    if (this.news.category !== undefined) {
      this.news.category = this.news.category;
    }
    else 
    this.news.category = this.initial.category;
  
    console.log(this.news);
  
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
      this.submitted = false;
      return;
    }

    this.newsService.updateNews(this.news).subscribe(() => {
      console.log("News updated", this.news);
    });
  }

  onSubmit() {
    
    this.submitted = true;
    this.updateNews();    
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
