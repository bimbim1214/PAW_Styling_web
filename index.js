// Definisi Library yang digunakan
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const flash = require("req-flash");
const app = express();

// Definisi lokasi file router
const loginRoutes = require("./src/routes/router-login");
const registerRoutes = require("./src/routes/router-register");
const contactRoutes = require("./src/routes/router-contact");
const appRoutes = require("./src/routes/router-app");


// Configurasi library session
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "t@1k0ch3ng",
    name: "secretName",
    cookie: {
      sameSite: true,
      maxAge: 600000,
    },
  })
);

// Configurasi dan gunakan library
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());

app.use(function (req, res, next) {
  res.setHeader(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  res.setHeader("Pragma", "no-cache");
  next();
});

// Setting folder views
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

// Middleware untuk melayani file statis (misalnya gambar, CSS, JS)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Middleware untuk file statis
app.use('/public', express.static('public'));

// Gunakan routes yang telah didefinisikan
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use('/contact', contactRoutes);
app.use("/", appRoutes);


// Log routes yang terdaftar untuk debugging (opsional)
console.log(app._router.stack);

// Gunakan port server
app.listen(5050, () => {
  console.log("Server Berjalan di Port : " + 5050);
});
