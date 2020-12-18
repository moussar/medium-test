import Article from '../models/article';
import { Op } from 'sequelize';

export default class ArticleCtrl {

    getAll = (req, res) => {
        Article.findAll({
            order: [
                ['name', 'ASC'],
            ]
        }).then(articles => {
            res.json(articles);
        })
    }

    create = (req, res) => {
        Article.create({
            name: req.body.name,
            reference: req.body.reference,
            content: req.body.content,
            user_id: req.body.user_id,
        }).then((article) => {
            res.json(article);
        }).catch(err => {
            res.json(err.errors[0].message);
        });
    }

    search = (req, res) => {
        let content = req.body.keyword;
        Article.findAll({
            where: {
                content: {
                    [Op.like]: '%' + content + '%'
                }
            }
        }).then(articles => {
            res.json(articles);
        }).catch(err => {
            res.json(err.errors[0].message);
        });
    }

    update = (req, res) => {
        Article.update(
            {
                name: req.body.name,
                reference: req.body.reference,
                content: req.body.content,
            },
            {
                where: { id: req.params.id },
                returning: true,
            }
        ).then(article => {
            res.json(article);
        }).catch(err => {
            res.json(err.errors[0].message);
        });
    }

    delete = (req, res) => {
        Article.destroy({
            where: {
                id: req.params.id
            }
        }).then(article => {
            res.json(article);
        }).catch(err => {
            res.json(err.errors[0].message);
        });

    }



}



