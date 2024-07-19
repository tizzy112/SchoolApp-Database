//here we get our router from express
const {Router} = require("express");

//here we import and disstructure our auth controller and give them there route
const {createAccount, userLogin} = require("../controller/authController");


//creating our route variable from Router();
const router = Router();

//create account route
router.post("/auth/create-account/:account", createAccount);

//login account route
router.post("/auth/login/:account", userLogin);



//here we export our route
module.exports = router;