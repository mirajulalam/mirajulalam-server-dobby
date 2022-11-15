const express = require("express");
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json())



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dqikb8c.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
  try{
     
    await client.connect();
    const taskCollection = client.db('dobby').collection('task');

    // post task in mongodb 
    app.post('/task',async (req,res)=>{
      const task =req.body;
      const result = await taskCollection.insertOne(task)
      res.send(result)
    })

     // get all data
     app.get('/allImages',async(req,res)=>{
      const query={}
      const cursor = await taskCollection.find(query);
      const result = await cursor.toArray();
      res.send(result)
    });
     
  }
  catch{

  }
  
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Hello Dobby app!')
  })
  
  app.listen(port, () => {
    console.log(`Dobby app listening on port ${port}`)
  })