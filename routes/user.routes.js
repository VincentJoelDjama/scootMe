const express = require('express');
const router = express.Router();
 //define a routes manager from express framework
const upload = require('../middlewares/upload.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const checkUser = authMiddleware.checkUser;


//required controllers

const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

// auth routers

router.post('/register', upload.single("avatar"), authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);

// user router

router.get("/:id", checkUser,  userController.getUserProfile);
router.get("/", checkUser, userController.getAllUsers);
router.put("/edit/:id", checkUser, upload.single("avatar"), userController.editProfile);

// upload router

//router.post("/upload", upload.single("file"), uploadController.uploadProfil);

//exports router

module.exports = router;