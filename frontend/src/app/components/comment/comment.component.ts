import { Component, Input } from '@angular/core';
import { Comment } from "../../models/comment.model";
import { CommentService } from "../../services/comment.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  currentComment: Comment = new Comment();
  @Input() comments: any[] = [];
  @Input() article_id: string = '';
  currentUser = JSON.parse(localStorage.getItem('currentUser') || '');

  isLoading = true;

  constructor(private commentService: CommentService) { }

  handleCreateComment(commentForm: any) {
    this.currentComment = commentForm.form.value;
    this.currentComment.article_id = this.article_id;
    this.currentComment.user_id = this.currentUser.id;
    console.log('hhh', this.currentUser)
    this.commentService.createComment(this.currentComment).subscribe(
      comment => {
        console.log(this.comments); this.comments.push(comment)
      },
      error => console.log(error.message),
      () => {
        commentForm.reset();
      }
    );
  }
}
