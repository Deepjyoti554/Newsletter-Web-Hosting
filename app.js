const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){

    var fisrtName = req.body.fName;
    var secondName = req.body.lName;
    var email = req.body.email;

    const data = {
        members : [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME : fisrtName,
                    LNAME : secondName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/69366f0bc2";

    const options = {
        method : "POST",
        auth : "Deep:af31ca668bcfff36ed4a226c9405489bf-us21"
    }

    //SetUp the request
    const request = https.request(url, options, function(response){

        if(response.statusCode === 200)
        {
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }


        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    //post the request
    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
})


app.get("/", function(req, res){
    res.send("We are received your request");
})

app.listen(process.env.PORT || 3000, function(req, res){
    console.log("Server is running on port no 3000");
})

//API KEY
//f31ca668bcfff36ed4a226c9405489bf-us21

//Audience Id:
//69366f0bc2