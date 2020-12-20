const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const ObjectID = require("mongodb").ObjectID;



app.use(bodyParser.json());
app.use(cors());



const dbInfo = {
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME    
}



const uri = "mongodb+srv://todo:todo@cluster0.7xlib.mongodb.net/todo?retryWrites=true&w=majority";


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const moviesCollections = client.db(`${dbInfo.DB_NAME}`).collection("movies");
    const seatsCollections = client.db(`${dbInfo.DB_NAME}`).collection("seats");
    
   
    console.log("Database connected");

   
 
    


    // perform actions on the collection object
    app.get('/moviesCollections', (req, res) => {
        moviesCollections.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })   

    app.get('/seatsCollections', (req, res) => {
        seatsCollections.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })   

    
    
    app.patch("/update/:id", (req, res) => {        
        seatsCollections
            .updateOne(
                { _id: ObjectID(req.params.id) },
                {
                    $set: { status: req.body.status },
                }
            )
            .then((result) => {
                res.send(result.modifiedCount > 0);
            });
    });

    

});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(8000, () => {
    console.log('Example app listening at http://localhost:8000')
})