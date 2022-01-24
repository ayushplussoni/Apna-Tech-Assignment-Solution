const express= require ("express");
const app=express();
const bodyParser=require("body-parser");
const CSVToJSON = require('csvtojson');
const fs = require('fs'); 
const CSV = require('csv');
const csv = require('csv-parser');
const cors= require("cors");
const path = require("path")
const multer = require("multer")
var array=[];

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, "states.csv")
  }
})

var upload = multer({ storage: storage })

app.use(
    cors({
        origin:"http://127.0.0.1:3000",
    }))
app.use(bodyParser.urlencoded({extended:true}));



app.get("/login/:username/:password",function(req,res){
    
    const users=["ayush"];
    const passwords=["qwerty"];
    for(var i=0;i<users.length;i++)
    {
        if(users[i]==req.params.username&&passwords[i]==req.params.password)
            res.json({loginStatus:"success"});
    }
    res.json({loginStatus:"fail"})
});

app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
})



app.get("/process",function(req,res){
    fs.createReadStream("./uploads/states.csv")
.pipe(csv())
.on('data', function(data){
    try 
    {
        var obj={};
        obj.id=data.id;
        obj.name=data.name;
        array.push(obj);
    }
    catch(err) {
       
    }
})
.on('end',function()
{

});

    var array2=array;
    array=[];
    res.json(array2);
});

app.post("/deleteState/:id",function(req,res)
{
     var readStream = fs.createReadStream("./uploads/states.csv"); // readStream is a read-only stream wit raw text content of the CSV file
var writeStream = fs.createWriteStream("./uploads/output.csv"); // writeStream is a write-only stream to write on the disk
var csvStream = CSV.parse(); // csv Stream is a read and write stream : it reads raw text in CSV and output untransformed records

csvStream.on("data", function(data) {
   
 console.log(data.name);
  if(data.id!=req.params.id)writeStream.write(JSON.stringify(data.id)+","+JSON.stringify(data.name));
})
.on("end", function(){
    
})
.on("error", function(error){
    console.log(error)
});

readStream.pipe(csvStream)
fs.rename('output.csv', 'states.csv', () => {
  
});

fs.createReadStream("./uploads/states.csv")
.pipe(csv())
.on('data', function(data){
    try 
    {
        var obj={};
        obj.id=data.id;
        obj.name=data.name;
        array.push(obj);
    }
    catch(err) {
       
    }
})
.on('end',function()
{

});

    var array2=array;
    array=[];
    res.json(array2);
   
  
});
   



app.listen(5000,function(){console.log("Hey Ayush !");});