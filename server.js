// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/

const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
};

const getTemp=(req, res)=> {
    res.send(projectData);
    console.log(projectData);
  }
app.get('/all', getTemp);
// GET method route


let newEntry = {};

app.post('/addData', (req, res) => {

    newEntry ={
    temp : req.body.temp,
    feels : req.body.feels,
    feelingValue:req.body.feelingValue,
    // currentData:req.body.currentData,
    }
    projectData=newEntry;
    console.log(projectData)
    });


