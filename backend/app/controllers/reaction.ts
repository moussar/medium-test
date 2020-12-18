import Reaction from '../models/reaction';

export default class ReactionCtrl {

    react = (req, res) => {
        Reaction.create(
            req.body
        ).then((reaction) => {
            res.json(reaction);
        }).catch(err => {
            res.json(err.errors[0].message);
        });
    }


    unreact = (req, res) => {
        Reaction.destroy({
            where: {
                id: req.params.id
            }
        }).then(reaction => {
            res.json(reaction);
        }).catch(err => {
            res.json(err.errors[0].message);
        });
    }


}



