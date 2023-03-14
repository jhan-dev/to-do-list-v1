const express = require("express");
const bodyParser = require("body-parser");
// const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

const app = express();

// let items = ["Buy Food", "Cook Food", "Eat Food"];
// let workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your todolist!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item."
});

const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

app.get("/", function (req, res) {
  
  // let day = date.getDate();
  
  Item.find({})
    .then(function(foundItems){
      if (foundItems.length === 0) {
        Item.insertMany(defaultItems)
          .then(function(){
            console.log("Successfully saved default items to DB.");
          })
          .catch(function(err){
            console.log(err)
          })
        res.redirect("/");
      }
      else {
        res.render("list", { listTitle: "Today", newListItems: foundItems });
      }
    })

  // let currentDay = today.getDay()
  // let day = ""

  // switch (currentDay) {
  //     case 0:
  //         day = "Sunday"
  //         break;
  //     case 1:
  //         day = "Monday"
  //         break;
  //     case 2:
  //         day = "Tuesday"
  //         break;
  //     case 3:
  //         day = "Wednesday"
  //         break;
  //     case 4:
  //         day = "Thursday"
  //         break;
  //     case 5:
  //         day = "Friday"
  //         break;
  //     case 6:
  //         day = "Saturday"
  //         break;
  //         default:
  //             console.log(`Error: current day is equal to: ${currentDay}`)
  // }

});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName
  });

  item.save();

  res.redirect("/");
  
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.post("/work", function (req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("server is running on port 3000.");
});
