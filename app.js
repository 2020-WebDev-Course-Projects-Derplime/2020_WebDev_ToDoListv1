//@ts-check

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

let items = ["Buy Food", "Cook Food", "Eat Food"];

app.get("/", (req, res) => {

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let today = new Date().toLocaleDateString("en-US", options);

    res.render("list", {
        kindOfDay: today,
        newListItems: items
    });
});

app.post("/", (req, res) => {

    items.push(req.body.newItem);
    res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
