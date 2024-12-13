const router = require('express').Router();
const homeController = require('../controllers').home;
const profileController = require('../controllers').profile;
const verifyUser = require('../configs/verify');
const contactRoutes = require('./router-contact'); // Tambahkan ini

router.get('/', verifyUser.isLogin, homeController.home);
router.get('/profile', verifyUser.isLogin, profileController.profile);

// Gunakan router-contact untuk semua rute yang dimulai dengan /contact
router.use('/contact', contactRoutes); // Tambahkan ini

module.exports = router;
