const express = require("express")
const bodyParser = require("body-parser")

const app = express()

let items = ["Buy Food", "Cook Food", "Eat Food"]

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){

    let today = new Date()
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    let day = today.toLocaleDateString("en-US", options)

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

    res.render("list", {kindOfDay: day, newListItems: items})

})

app.post("/", function(req, res){
    let item = req.body.newItem
    console.log(item)

    items.push(item)

    res.redirect("/")
})

app.listen(3000, function(){
    console.log("server is running on port 3000.")
})