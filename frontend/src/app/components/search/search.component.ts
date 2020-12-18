import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ArticleService } from "../../services/article.service";
import { Article } from "../../models/article.model";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  currentArticle: Article = new Article();
  articles: Article[] = [];
  errors = [];
  isLoading = true;
  keyword: string = '';
  @Output() handleSelectedArticle: EventEmitter<any> = new EventEmitter<any>();

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.onGetArticles();
  }

  onGetArticles() {
    this.articleService
      .getArticles()
      .subscribe(
        res => {
          this.articles = res;
          this.handleSelectedArticle.emit(this.articles[0]);
        },
        error => console.log(error.message),
        () => (this.isLoading = false)
      );
  }

  onSearchArticles(event: any, searchForm: any) {

    if (event.keyCode === 13) {
      let search = searchForm.form.value;

      this.articleService
        .searchArticles(search)
        .subscribe(
          res => {
            this.articles = res;
            this.handleSelectedArticle.emit(this.articles[0]);
          },
          error => console.log(error.message),
          () => (this.isLoading = false)
        );
    }

  }

}
