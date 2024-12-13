const config = require('../configs/database');
let mysql = require('mysql');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

//const pool = require('../configs/database'); // Import the pool instance from database.js

module.exports = {
    // Menampilkan data buku
    getContact(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM mobil;', function (error, results) {
                if (error) throw error;

                // Kirim data buku ke view dengan nama 'buku'
                res.render('contact', {
                    url: 'http://localhost:5050/',
                    buku: results // Mengganti 'contacts' dengan 'buku'
                });
            });
            connection.release();  // Always release the connection after use
        });
    },

    // Form tambah data buku
    formContact(req, res) {
        res.render("addContact", { 
            url: 'http://localhost:5050/',
        });
    },

    // Menyimpan data buku
    saveContact(req, res) {
        let { nama, type, warna } = req.body;
    
        // Validasi input
        if (nama && type && warna) {
            pool.getConnection(function (err, connection) {
                if (err) {
                    console.error("Connection Error:", err);
                    res.send('Gagal menyambung ke database');
                    return;
                }
    
                connection.query(
                    `INSERT INTO mobil (nama, type, warna) VALUES (?, ?, ?);`,
                    [nama, type, warna],
                    function (aerror, results) {  // Changed `error` to `aerror`
                        if (aerror) {  // Corrected variable name to `aerror`
                            console.error("Query Error:", aerror);
                            res.send('Gagal menyimpan data');
                            return;
                        }
    
                        req.flash('color', 'success');
                        req.flash('status', 'Yes..');
                        req.flash('message', 'Data berhasil disimpan');
                        res.redirect('/contact');
                    }
                );
                connection.release();  // Always release the connection after use
            });
        } else {
            res.send('Data tidak lengkap');
        }
    },
    

    // Mengedit data buku
    editContact(req, res) {
        const { id } = req.params;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM mobil WHERE id = ?', [id], function (error, results) {
                if (error) throw error;
                if (results.length > 0) {
                    res.render('editContact', {
                        url: 'http://localhost:5050/',
                        contact: results[0] // Mengirim data buku yang akan diedit
                    });
                } else {
                    res.redirect('/contact');
                }
            });
            connection.release();  // Always release the connection after use
        });
    },

    // Memperbarui data buku
    updateContact(req, res) {
        const { id } = req.params;
        const {nama, type, warna } = req.body;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                'UPDATE mobil SET nama = ?, type = ?, warna = ? WHERE id = ?',
                [nama, type, warna, id],
                function (error, results) {
                    if (error) throw error;
                    res.redirect('/contact');
                }
            );
            connection.release();  // Always release the connection after use
        });
    },

    // Menghapus data buku
    deleteContact(req, res) {
        const { id } = req.params;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('DELETE FROM mobil WHERE id = ?', [id], function (error, results) {
                if (error) throw error;
                res.redirect('/contact');
            });
            connection.release();  // Always release the connection after use
        });
    },
};
