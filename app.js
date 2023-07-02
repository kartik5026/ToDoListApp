const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('view engine', 'ejs');


var items = [];
let workItems = [];


app.get("/", (req, res) => {
    var today = new Date();
    var options = {
        weekday:'long',
        day:'numeric',
        month:'long'
    }
    var day = today.toLocaleDateString("en-IN",options);
    res.render('list', { listTitle: day , newListItems:items});
})
app.get("/work",(req,res)=>{
    res.render("list",{listTitle:"Work", newListItems:workItems});
})
app.post("/",(req,res)=>{
    let item = req.body.item;

    if(req.body.list == 'Work'){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
    
})

app.get("/clear",(req,res)=>{
    items.length  = 0;
    workItems.length = 0;
    res.redirect("/");
})
app.listen(3000, () => {
    console.log("Server running on port 3000");
})