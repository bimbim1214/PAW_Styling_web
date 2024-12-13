const router = require('express').Router();
const contactController = require('../controllers').contact;
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, contactController.getContact); // Tampilkan daftar buku
router.get('/add', verifyUser.isLogin, contactController.formContact); // Form tambah buku
router.post('/save', verifyUser.isLogin, contactController.saveContact); // Simpan buku
router.get('/edit/:id', verifyUser.isLogin, contactController.editContact); // Edit buku
router.post('/update/:id', verifyUser.isLogin, contactController.updateContact); // Update buku
router.get('/delete/:id', verifyUser.isLogin, contactController.deleteContact); // Hapus buku

module.exports = router;
