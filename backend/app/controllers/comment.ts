import Comment from '../models/comment';
import User from '../models/user';

export default class CommentCtrl {

    create = async (req, res) => {
        await Comment.create({
            content: req.body.content,
            article_id: req.body.article_id,
            user_id: req.body.user_id,
        }).then(async (comment) => {
            await Comment.findOne({
                where: {
                    id: comment.id
                },
                include: [{
                    model: User,
                    duplicating: false,
                    as: 'user',
                    attributes: ['username'],
                }]
            }).then(comment => {
                res.json(comment);
            }).catch(err => {
                res.json(err.errors[0].message);
            });

        }).catch(err => {
            res.json(err.errors[0].message);
        });
    }

}



