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

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

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

app.get("/:customListName", function(req, res){
  const customListName = req.params.customListName;

  List.findOne({name: customListName})
    .then(function(foundList){
      if (foundList) {
        res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
      }
      else if (!foundList) {
        const list = new List({
          name: customListName,
          items: defaultItems
        })

        list.save();
        res.redirect(`/${customListName}`);
      }
    })

  const list = new List({
    name: customListName,
    items: defaultItems
  })

  list.save();
});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if (listName === "Today"){
    item.save();
    res.redirect("/");
  }
  else {
    List.findOne({ name: listName })
      .then(function(foundList){
        foundList.items.push(item);
        foundList.save();
        res.redirect(`/${listName}`);
    })
    .catch(function(err){
      console.log(err);
    })
  }
});

app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;

  Item.findByIdAndRemove(checkedItemId)
    .then(function(foundItem){
      Item.deleteOne({_id: checkedItemId});
      console.log("Successfully deleted checked item.");
      res.redirect("/");
    })
    .catch(function(err){
      console.log(err)
    })
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function () {
  console.log("server is running on port 3000.");
});