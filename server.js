const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
// const layouts = require('express-ejs-layouts')
const passport = require("passport");
const methodOverride = require("method-override");
const port = process.env.PORT || 3000;


require("dotenv").config();

// const cloudinary = require("cloudinary");
// const multer = require("multer");
// const upload = multer({
//     dest: "./uploads"
// });
// // Set up multer's storage/memory locations
// let storage = multer.diskStorage({
//     filename: (req, file, cb) => {
//         cb(null, `${file.fieldname}-${Date.now()}`)
//     },
//     destination: (req, file, cb) => {
//         cb(null, '/tmp/my-uploads')
//     }
// })
// let upload = multer({
//     storage
// })


// create the Express app
const app = express();


// connect to the MongoDB with mongoose
require("./config/database");
require("./config/passport");

// require our routes
const indexRoutes = require("./routes/index");
const moodsRoutes = require("./routes/moods");
const userRoutes = require("./routes/users");
const commentsRoutes = require("./routes/comments");


// view engine setup
app.set("view engine", "ejs");
// app.use(layouts)


// app.get('/', (req, res) => {
//     res.render('index', { recentUpload: "" })
//   })

app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
// TODO Add session middleware here
app.use(session({
    secret: "SEIRRocks!",
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

app.use("/", indexRoutes);
app.use("/", commentsRoutes);
app.use("/", moodsRoutes);
app.use("/", userRoutes);


// app.post("/", upload.single("inputFile"), function (req, res) {
//     cloudinary.uploader.upload(req.file.path, function (result) {
//         var cloudID = result.public_id;
//         var imageLink = `https://res.cloudinary.com/ckargbo/image/upload/v1596670875/${cloudId}.jpg`
//         res.render("result", {
//             image: imageLink
//         });
//     })
// });



app.listen(port, () => {
    console.log(`Express is listening on port:${port}`);
});