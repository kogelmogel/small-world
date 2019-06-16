require('dotenv').config();

const {connector} = require("./server/database/config/dbConfig");
const express = require("express");
const port = process.env.PORT || 3010;
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
const routesController = require("./server/controllers/routesController");
const {check} = require("express-validator/check");
const {
    getRegistrationPage,
    postUserRegistration
} = require ("./server/controllers/registerController")
const {
    loginPage,
    loggedUser
} = require ("./server/controllers/loginController")


app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    name: process.env.SESSION_COOKIE,    
    secret: process.env.SESSION_SECRET,    
    resave: false,    
    saveUninitialized: false
    })
);
app.use(morgan("dev"));

let isUserLoggedIn = (req, res, next) => {
    if(req.session.user && req.cookies.authCookie) {
        res.redirect("/profile")
    } else {
        next();
    }
}

app.get("/", isUserLoggedIn, routesController.homePage);

app.get("/register", isUserLoggedIn, getRegistrationPage);
app.post("/register", postUserRegistration);

app.get("/interests", routesController.interestPage);

app.post("/interests", routesController.interests);

app.get("/signin", loginPage);

app.post("/signin", loggedUser);

app.get("/profile", routesController.matchBasedOnCity);

// app.get("/inbox", isUserLoggedIn, (req, res) => {
//     res.render("inbox")
// })

app.get("/logout", routesController.logout);


connector.sync()
    .then(() => {
        app.listen(port, () => console.log(`I've got ears on port: ${port}`));
    })
    .catch(error => console.error(`Couldn't sync with database: ${error.stack}`));

