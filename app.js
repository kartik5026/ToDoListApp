const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('view engine', 'ejs');

let items = [];
let workItems = [];
let idCounter = 1;

app.get("/", (req, res) => {
    var today = new Date();
    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };
    var day = today.toLocaleDateString("en-IN", options);
    res.render('list', { listTitle: day, newListItems: items });
});

app.get("/work", (req, res) => {
    res.render("list", { listTitle: "Work", newListItems: workItems });
});

app.post("/", (req, res) => {
    const { title, description, dueDate, list } = req.body;
    const newItem = {
        id: idCounter++,
        title,
        description,
        dueDate
    };

    if (list === 'Work') {
        workItems.push(newItem);
        res.redirect("/work");
    } else {
        items.push(newItem);
        res.redirect("/");
    }
});


app.post("/edit", (req, res) => {
    const { list, id, newTitle, newDescription, newDueDate } = req.body;

    if (list === 'Work') {
        const item = workItems.find(item => item.id == id);
        if (item) {
            item.title = newTitle;
            item.description = newDescription;
            item.dueDate = newDueDate;
        }
        res.redirect("/work");
    } else {
        const item = items.find(item => item.id == id);
        if (item) {
            item.title = newTitle;
            item.description = newDescription;
            item.dueDate = newDueDate;
        }
        res.redirect("/");
    }
});


app.get("/clear", (req, res) => {
    items.length = 0;
    workItems.length = 0;
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
