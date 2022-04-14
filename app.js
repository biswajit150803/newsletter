const express=require('express');
const http=require('https');
const bodyParser=require('body-parser');
const request=require('request');
const { Http2ServerRequest } = require('http2');
const https=require('https');
const { is } = require('express/lib/request');
const { STATUS_CODES } = require('http');
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req,res){
    var firstName=req.body.fname;
    var lastName=req.body.lname;
    var email=req.body.email;
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    var data={
        members:{
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName,

            }
        }
    }
    var jsonData=JSON.stringify(data);
    const url="https://us14.api.mailchimp.com/3.0/lists/84341f519b";
    const options={
        method:"POST",
        auth:"Biswajit1: fcc0ba86caa22db8696c942588ff7f24-us14"
    }
    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.send("Successfully submitted");
        }
        else{
            res.send("Try again");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data))
        });
    });
    request.write(jsonData);
    request.end();

});
app.listen(process.env.PORT || 3000,function(req,res){
    console.log("The server is listening a port 3000");
});

//
// 84341f519b