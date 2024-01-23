const express = require('express');
const { MongoClient } = require('mongodb');
var cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

const mongoURI = 'mongodb://127.0.0.1:27017/RechargeApplication';

app.use(cors());
app.use(bodyParser.json());


app.get('/get-plans', async (req, res) => {
  try {
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, });
    await client.connect();

    const collection = client.db().collection('getPlans');
    const data = await collection.find().toArray();

    res.json(data);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } 

});


// app.post('/registeruser', async (req, res) => {
//     console.log("request",req)
//     try {
      
//       const client = new MongoClient(mongoURI, { useNewUrlParser: true, });
//       await client.connect();
  
//       // Access the collection and insert data (replace 'your_collection' with your actual collection name)
//       const collection = client.db().collection('tableusers');
//       const newData = req.body; 
//       const result = await collection.insertOne(newData);
  
     
//       res.json(result.ops[0]);
//     } catch (error) {
//       console.error('Error storing data in MongoDB:', error);
//       res.status(500).json({ error: 'Internal Server Error 500' });
//     }
// })




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});