import { User } from './user.model';
import { Comment } from './comment.model';

export class Article {
    id: string = '';
    name: string = '';
    content: string = '';
    created_at: string = '';
    updated_at: string = '';
    user: User = new User();
    comments: Comment[] = [];
}