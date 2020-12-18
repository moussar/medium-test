import { Component } from '@angular/core';
import { Article } from "../../models/article.model";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {

  selectedArticle: Article = new Article();

  handleSelectedArticle(article: Article) {
    this.selectedArticle = article;
  }
}
