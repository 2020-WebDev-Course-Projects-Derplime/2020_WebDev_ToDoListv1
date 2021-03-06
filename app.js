//@ts-check

const express = require("express");
const app = express();
const date = require(__dirname + "/date.js");

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.set("view engine", "ejs");

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.get("/", (req, res) => {

    const today = date.getDate();

    res.render("list", {
        listTitle: today,
        newListItems: items
    });
});

app.post("/", (req, res) => {
    if (req.body.list === "Work List") {
        workItems.push(req.body.newItem);
        res.redirect("/work");
    } else {
        items.push(req.body.newItem);
        res.redirect("/");
    }
});

app.get("/work", (req, res) => {
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});