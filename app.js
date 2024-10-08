require('dotenv').config()

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req, res)=>{
    res.render("coordinates")
})

let url = ``


app.get("/weather/api", (req, res)=>{


    https.get(url, (response)=>{
        response.on("data", (data)=>{
            // console.log(data);

            const content = JSON.parse(data);

            console.log(content);
            res.send(content)

        })
    })

})


app.post("/weather/api", (req, res)=>{
    const lat = req.body.lat;
    const lon = req.body.lon;

    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.SECRET_KEY}`


    res.redirect("/weather/api");

})

// This is new Branches






app.listen(3000, ()=>{
    console.log("Server Running");
})