import * as express from 'express';

import Authenticate from './middleware/authenticate';

import UserCtrl from './controllers/user';
import ArticleCtrl from './controllers/article';
import CommentCtrl from './controllers/comment';
import ReactionCtrl from './controllers/reaction';

export default function setRoutes(app) {

  const router = express.Router();

  const authenticate = new Authenticate();

  const userCtrl = new UserCtrl();
  const articleCtrl = new ArticleCtrl();
  const commentCtrl = new CommentCtrl();
  const reactionCtrl = new ReactionCtrl();


  /* Articles */

  // get All 
  router.route('/articles').get(authenticate.isLoggedIn, articleCtrl.getAll);

  // Search 
  router.route('/articles/search').post(authenticate.isLoggedIn, articleCtrl.search);

  // Create 
  router.route('/article').post(authenticate.isLoggedIn, articleCtrl.create);

  // Update 
  router.route('/article/:id').put(authenticate.isLoggedIn, articleCtrl.update);

  // Delete 
  router.route('/article/:id').delete(authenticate.isLoggedIn, articleCtrl.delete);


  /* Comments */

  // Create 
  router.route('/comment').post(authenticate.isLoggedIn, commentCtrl.create);

  /* Users */

  // Create 
  router.route('/user').post(authenticate.isLoggedIn, userCtrl.create);

  // login
  router.route('/user/login').post(authenticate.isLoggedIn, userCtrl.login);

  /* Reactions */

  router.route('/reaction').post(authenticate.isLoggedIn, reactionCtrl.react);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
