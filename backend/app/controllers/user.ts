import User from '../models/user';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export default class UserCtrl {

  create = (req, res) => {
    User.create({
      username: req.body.username,
      email: req.body.email,
      role: req.body.role,
      password: bcrypt.hashSync(req.body.password, 10),
    }).then((user) => {
      res.json(user)
    }).catch(err => {
      res.json(err);
    });
  }

  update = (req, res) => {
    User.scope('withoutPassword').update(
      {
        password: req.body.password,
      },
      {
        where: { id: req.params.id }
      }
    ).then(user => {
      res.json(user);
    }).catch(err => {
      res.json(err.errors[0].message);
    });
  }

  login = (req, res) => {
    User.findOne({
      where: {
        email: req.body.email,
      }
    }).then(user => {
      bcrypt.compare(req.body.password, user.get('password'), async function (err, match) {
        if (match) {
          user.update({
            token: await user.generate(user.get('id'))
          }).then(user => {
            //let token = jwt.sign({ user: user }, process.env.SECRET_TOKEN_USER);
            res.status(200).json(user);
          });
        } else {
          res.json({ error: 'Invalide password' });
        }
      });
    }).catch(err => {
      res.json({ error: 'User doesn\'t existe' });
    });
  }

  logout = (req, res) => {
    User.findOne({
      where: {
        token: req.params.token
      }
    }).then(user => {

      user.update({
        token: null
      }).then(result => {
        res.json({ 'logout': true });
      });

    }).catch(err => {
      res.json(err);
    });
  }

}



