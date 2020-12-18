import * as jwt from 'jsonwebtoken';

export default class Authenticate {

  isLoggedIn = (req, res, next) => {
    console.log('was here ');
    // check header or url parameters or post parameters for token
    let token = req.body.token || req.query.token || req.header('X-Access-Token');

    // decode token
    if (token) {

      // verifies secret and checks exp
      jwt.verify(token, process.env.SECRET_TOKEN_USER, function (err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });

    } else {

      // if there is no token
      // return an error
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });

      // Staging
      //next();

    }
  }

}