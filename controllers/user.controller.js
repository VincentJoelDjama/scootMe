const bcrypt = require('bcrypt');
const models = require("../models");
//const jwt = require('jsonwebtoken');

const Sequelize = require('sequelize');
/* const fs = require('fs')
const {
  promisify
} = require('util')

const unlinkAsync = promisify(fs.unlink); */


module.exports.getUserProfile = (req, res) => {
  models.User.findOne({
      where: {
        id: req.params.id
      },
      attributes: {
        exclude: ['password']
      }
    })
    .then((user) => {

      if (user) return res.status(201).json(user);
      else return res.status(404).json({
        error: "user not found"
      });
    })
    .catch(() => res.status(500).json({
      error: "cannot fetch user"
    }));
};

//user list

module.exports.getAllUsers = (req, res, next) => {
  const options = {
    /* where: Sequelize.where(
      Sequelize.fn(
        'concat',
        Sequelize.col('firstname'),
        ' ',
        Sequelize.col('lastname')
      ),
      {
       [Sequelize.Op.like]: `%JOhn Do%`
      }
    ),  */
    attributes: {
      exclude: ['password']
    },
    limit: 10
  }

  models.User.findAll(options)
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({
        error
      })
    })
}


module.exports.editProfile = (req, res) => {
  console.log(req.token);
  const id = req.token.userId;

  if (id != req.params.id)
    return res.status(400).json({
      error: "wrong token"
    });
  const {
    firstname,
    lastname,
    email,
    password,
    mobile,
    address,
  } = req.body;
  const picture = req.file ? req.file.filename : undefined;


  models.User.findOne({
      where: {
        id: req.params.id
      },
    })
    .then((user) => {
      let tmp = user.picture;
      bcrypt
        .hash(password, 10)
        .then((bcryptedPassword) => {
          user
            .update({
              firstname,
              lastname,
              email,
              address,
              mobile,
              picture,
              password: bcryptedPassword
            })
            .then((user) => {
              if (user) {

                return res.status(201).json(user);
              } else
                return res
                  .status(500)
                  .json({
                    error: "cannot update user profile"
                  });
            })
            .catch(() => {
              res.status(500).json({
                error: "cannot update user"
              });
            });
        })
        .catch((error) => res.status(500).json({
          error
        }));
    })
    .catch(() => res.status(500).json({
      error: "unable to verify user"
    }));
};