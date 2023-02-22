const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.get("/", function(){
    res.send("Hello")

    let today = new Date()

    if (today.getDay() === 6 || today.getDay() === 0) {
        res.write("<h1>Woo Hoo, it's the weekend!</h1>")
    }
    else {
        res.write("<p>Unfortunately, it's not the weekend.</p>")
        res.write("<h1>Boo, it's a work day...</h1>")
        res.send()
    }

})

app.listen(3000, function(){
    console.log("server is running on port 3000.")
})