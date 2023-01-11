const express= require('express')
const MongoClient=require('mongodb').MongoClient
const app=express()

app.use(express.json())

var database;


app.get('/',(request,response)=>{
    response.send("<h1>Welcome to First Assignment</h1>")
})

app.get('/customers',(request,response)=>{
    database.collection('customer').find({}).toArray((error,result)=>{
        if(error) response.status(404).send(error)
        if(result.length>0)
            response.send(result)
        else
            response.send("User Not Found...")
    })
})

app.get('/customers/:firstname',(request,response)=>{
    database.collection('customer').find({firstname:request.params.firstname}).toArray((error,result)=>{
        if(error) response.status(404).send(error)
        if(result.length>0)
            response.send(result)
        else
            response.send("User Not Found...")
    })
})

app.listen(3000,()=>{
    MongoClient.connect("mongodb://127.0.0.1:27017",{ useNewUrlParser: true},(error,result)=>{
        if(error) throw error
        database=result.db('CustomerDB')
    })
    console.log("Connection Successful...")
})