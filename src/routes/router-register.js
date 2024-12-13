const router = require('express').Router();
const registerController = require('../controllers').register;
const verifyUser = require('../configs/verify');

// Rute untuk menampilkan form registrasi
router.get('/', verifyUser.isLogout, registerController.formRegister);

// Rute untuk menyimpan data registrasi
router.post('/save', verifyUser.isLogout, registerController.saveRegister);

module.exports = router;
