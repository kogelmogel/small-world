const Senior = require("../database/models/Senior");
const bcrypt = require("bcrypt");

module.exports = {
    loginPage: (req, res) => {
        res.render("login");
    },
    loggedUser: (req, res) => {
        Senior
            .findOne({where: {username : req.body.username}})
            .then(foundUser => {
                bcrypt
                .compare(req.body.password, foundUser.dataValues.password)
                .then(results => {
                    if(req.body.username !== null && results){
                        req.session.user = foundUser.dataValues;
                        res.redirect("/profile");
                } else {
                    console.log("Something went wrong when loggin in");
                    res.redirect("/signin");
                }
            })
            .catch(error => console.error(`Couldn't login: ${error.stack}`));
            })
            .catch(error => console.error(`Something went wrong when comparing password: ${error.stack}`));
    }
};