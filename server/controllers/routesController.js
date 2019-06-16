const Senior = require("../database/models/Senior");
const Interest = require("../database/models/Interest");

module.exports = {
    homePage: (req, res) => {
        res.render("index.ejs");
    },
    interestPage: (req, res) => {
        res.render("interest");
    },
    interests: (req, res) => {

    },
    matchBasedOnCity: (req, res) => {
        if(req.session.user && req.cookies.seniorCookie) {
            Senior.findAll({
                include: [
                    {model: Interest}
                ], 
            }).then(seniors => {
                const resObj = seniors.map(senior => {
                    return Object.assign(
                        {},
                        {
                            id: senior.id,
                            name: senior.name,
                            age: senior.age,
                            city: senior.city,
                            interest: senior.interests.map(interest => {
    
                                return Object.assign(
                                    {},
                                    {
                                        senior_id: interest.seniorId,
                                        hobby: interest.hobby,
                                    }
                                )
                            })
                        }
                    )
                });
                let matchingSeniorData = []
                resObj.forEach(element => {
                    if(element.id !== req.session.user.id) {
                        if(element.city === req.session.user.city){
                        matchingSeniorData.push({name: element.name, age: element.age, city: element.city, interest: element.interest});
                         } 
                                
                    }
                })
                res.render("profile", {hobbies: matchingSeniorData})  
            }).catch(err => console.error(`Something went wrong: ${err.stack}`))
        
        } else {
            res.redirect("/");
        }
    },
    logout: (req, res) => {
        if(req.session.user && req.cookies.seniorCookie) {
            res.clearCookie("seniorCookie");
            res.redirect("/");
        } else {
            res.redirect("signin");
        }
    }
}