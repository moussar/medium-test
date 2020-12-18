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
  router.route('/articles').get(articleCtrl.getAll); //authenticate.isLoggedIn,

  // Search 
  router.route('/articles/search').post(articleCtrl.search);

  // Create 
  router.route('/article').post(articleCtrl.create);

  // Update 
  router.route('/article/:id').put(articleCtrl.update);

  // Delete 
  router.route('/article/:id').delete(articleCtrl.delete);


  /* Comments */

  // Create 
  router.route('/comment').post(commentCtrl.create);

  /* Users */

  // Create 
  router.route('/user').post(userCtrl.create);

  // login
  router.route('/user/login').post(userCtrl.login);

  /* Reactions */

  router.route('/reaction').post(reactionCtrl.react);



  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
