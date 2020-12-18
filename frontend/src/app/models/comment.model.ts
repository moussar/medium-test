import { User } from './user.model';

export class Comment {
    content: string = '';
    user_id: string = '';
    article_id: string = '';
    created_at: string = '';
    updated_at: string = '';
    user: User = new User();
}