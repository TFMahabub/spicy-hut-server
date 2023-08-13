const express = require('express');
const cors = require('cors');
const app = express()
const port = 5000;
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// middleWare-
app.use(cors())
app.use(express.json())


const uri = process.env.DB_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


//Product Collection-
async function Products(){
    const ProductsCollection = client.db('spicy-hut').collection('menus-foods')
    try{
      app.get('/menus', async(req, res)=>{
        const query = {};
        const cursor  = await ProductsCollection.find(query)
        const result  = await cursor.toArray()
        res.send(result)
      })
      app.get('/popular-menus', async(req, res)=>{
        const query = {};
        const cursor  = await ProductsCollection.find().sort({publishedAt: 1})
        const result  = (await cursor.toArray()).slice(0, 8)
        res.send(result)
      })
      
    //   app.delete('/categories/:id', async(req, res)=>{
    //     const id = req.params.id;
    //     const query = {_id: ObjectId(id)}
    //     const result = await ProductsCollection.deleteOne(query)
    //     res.send(result)
    //   })
    //   app.get('/categories/:id', async(req, res)=>{
    //     const id = req.params.id;
    //     const query = {categories_id: parseInt(id)}
    //     const cursor = ProductsCollection.find(query)
    //     const result = await cursor.toArray()
    //     res.send(result)
    //   })
    //   app.get('/categories', async(req, res)=>{
    //     const userEmail = req.query.email;
    //     const query = {seller_email: userEmail}
    //     const cursor = ProductsCollection.find(query);
    //     const result = await cursor.toArray()
    //     res.send(result)
    //   })
    //   app.get('/categories_advertise', async(req, res)=>{
    //     const query = {advertise: true}
    //     const cursor = ProductsCollection.find(query);
    //     const result = await cursor.toArray();
    //     res.send(result)
    //   })
    //   app.put('/categories/:id', async(req, res)=>{
    //     const productId = req.params.id;
    //     const filter = {_id: ObjectId(productId)}
    //     const updatedDoc = { $set: {advertise: true}}
    //     const result = await ProductsCollection.updateOne(filter, updatedDoc)
    //     res.send(result)
    //     console.log(productId);
    //   })
    }
    catch{
      err=>console.error('this Product error:', err)
    }
    finally{
  
    }
  }
  Products()
  .catch(err=>console.error('This is out of the function Products error: ',err))



app.get('/', (req, res)=>res.send('spicy-hut-server is running....'))
app.listen(port)