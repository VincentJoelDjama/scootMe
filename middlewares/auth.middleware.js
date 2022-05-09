const jwt = require("jsonwebtoken");
const models = require("../models");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
 
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (error, decodedToken) => {
      if (error) {
        res.locals.user = null;
        res.cookie("jwt", "", {
          maxAge: 1
        }); 

      } else {
        req.token = decodedToken;
        let user = await models.User.findByPk(decodedToken.userId);
        res.locals.user = user;
        
        next();
      }
    });
  } else {
    res.locals.user = null;

  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  if (token) {

      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
       // console.log(err);
        res.status(200).json('no token');
      } else {
        //console.log('decodToken:' + decodedToken.id);
        next();
      }
    });
  } else {
    //console.log('No token');
    res.status(200).json('no token');
  }
};