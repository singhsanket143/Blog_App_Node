var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//APP CONGIG
app.set("view engine","ejs");
mongoose.connect("mongodb://localhost/restful_blog_app");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


// MONGOOSE/MODEL/CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now()}
});
var Blog = mongoose.model("Blog",blogSchema);

//RESTFUL ROUTES
app.get("/",function (req,res) {
    res.redirect("/blogs");
});
app.get("/blogs",function (req,res) {
    Blog.find({},function (err,blogs) {
        if(err){
            console.log(err);
        } else {
            res.render("index",{blogs: blogs});
        }
    })
});
app.get("/blogs/new",function (req,res) {
    res.render("new");
});
app.post("/blogs",function (req,res) {
    Blog.create(req.body.blog,function (err,newBlog) {
        if(err){
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});


app.listen(3000,function () {
    console.log("Server is running");
});

