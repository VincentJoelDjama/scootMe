const bcrypt = require('bcrypt');
const models = require('../models');
const jwt = require('jsonwebtoken');
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*\d).{4,8}$/;


const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id, isAdmin) => {
  return jwt.sign({
    userId: id ,
    isAdmin: isAdmin 
  }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

//Register user
module.exports.signUp = (req, res) => {

  const {
    firstname,
    lastname,
    email,
    password,
    mobile,
    address,
  } = req.body;

  const picture = req.file? req.file.filename : req.body.picture;
  
console.log(req.file);
//console.log(...JSON.parse(req.body.user));

  if (email == null || password == null) {
    return res.status(400).json({
      error: "missing parameters"
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: "invalid email"
    })
  }
  /* if(!emailValidator.validate(email)){
      return res.status(400).json({error: "invalid email"})
  } */
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error: "invalid password !"
    });
  }

  models.User.findOne({
      where: {
        email
      }
    })
    .then((user) => {
      
      if (!user) {
        bcrypt
          .hash(password, 10)
          .then((bcryptedPassword) => {
            models.User.create({
                firstname,
                lastname,
                email,
                password: bcryptedPassword,
                mobile,
                address,
                isAdmin: 0,
                picture 
              })
              .then((newUser) => {
                res.status(201).json(newUser);
              })
              .catch((e) => res.status(500).json(e));
          })
          .catch((error) => res.status(500).json({
            error
          }));
      } else return res.status(400).json({
        error: "Email already exists !"
      });
    })
    .catch(() => res.status(500).json({
      error: "An error occured !"
    }));
};


//Sign In
module.exports.signIn = (req, res, next) => {
  const {
    email,
    password
  } = req.body

  if (email == null || password == null) {
    return res.status(400).json({
      error: "missing parameters"
    });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: "invalid email"
    })
  }
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error: "invalid password !"
    });
  }
  models.User.findOne({
      where: {
        email
      }
    })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: 'User not found !'
        });
      }
      bcrypt
        .compare(password, user.password)
        .then((valid) => {
          if (!valid) {

            return res.status(401).json({
              error: 'incorrect password !'
            });
          }
          try {
            const token = createToken(user.id, user.isAdmin);
            res.cookie('jwt', token, {
              httpOnly: true,
              maxAge
            })
            res.status(200).json({
              loggedId: user.id,
              Admin: user.isAdmin
             
            });

          } catch (error) {
            res.status(500).json({
              error: 'failed to create token'
            });
          }

        })
        .catch(error => res.status(500).json({
          error: 'hashing password'
        }));
    })
    .catch(error => res.status(500).json({
      error: 'An error occured'
    }));
};

// logout

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', {
    maxAge: 1
  });
  console.log('logged out');
  res.redirect('/');
}