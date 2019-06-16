const Senior = require("../database/models/Senior");
const Interest = require("../database/models/Interest");
const bcrypt = require("bcrypt");
const {validationResult} = require("express-validator/check");

module.exports = {
    getRegistrationPage: (req, res) => {
        res.render("register")
    },
    postUserRegistration: (req, res) => {
        const errors = validationResult(req)
  
        if(!errors.isEmpty()){
          req.session.error = errors.array();
          res.redirect("/register");
        }else {
        bcrypt
          .hash(req.body.password, 10)
          .then(hashPassword => {
          Senior.create({
            name: req.body.name,
            lastName: req.body.lastName,
            username: req.body.username,
            password: hashPassword,
            city: req.body.city,
            age: req.body.age,
          })
          .then(results => {
            req.session.user = results.dataValues;
            let interests = req.body.interest;
            interests.forEach(hobby => {
                Interest.create({
                    hobby: hobby,
                    seniorId: req.session.user.id
                });
            });
            console.log(interests)
            res.redirect("/profile");
            })
            .catch(error => {
              console.error(`Cannot create user: ${error.stack}`);
            });
        })
        .catch(error => console.error(`Something went wrong when hashing password: ${error.stack}`));
        }
        
      }
};
