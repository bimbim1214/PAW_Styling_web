const config = require('../configs/database');
let mysql = require('mysql');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    formRegister(req, res) {
        res.render("register", {
            url: 'http://localhost:5050/',
        });
    },
    saveRegister(req, res) {
        let username = req.body.username;
        let password = req.body.pass;

        // Validasi input
        if (!username || !password) {
            req.flash('color', 'danger');
            req.flash('status', 'Oops..');
            req.flash('message', 'Username dan password tidak boleh kosong!');
            return res.redirect('/register');
        }

        pool.getConnection(function (err, connection) {
            if (err) {
                console.error('Error connecting to the database:', err);
                req.flash('color', 'danger');
                req.flash('status', 'Oops..');
                req.flash('message', 'Terjadi kesalahan server. Coba lagi nanti.');
                return res.redirect('/register');
            }

            const query = `INSERT INTO users (username, password) VALUES (?, SHA2(?, 512))`;

            connection.query(query, [username, password], function (error, results) {
                connection.release(); // Pastikan koneksi selalu dilepaskan
                if (error) {
                    console.error('Error executing query:', error);
                    req.flash('color', 'danger');
                    req.flash('status', 'Oops..');
                    req.flash('message', 'Terjadi kesalahan saat menyimpan data.');
                    return res.redirect('/register');
                }

                req.flash('color', 'success');
                req.flash('status', 'Yes..');
                req.flash('message', 'Registrasi berhasil!');
                res.redirect('/login');
            });
        });
    },
};
