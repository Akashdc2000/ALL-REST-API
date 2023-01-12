const { request, response } = require('express')
const express = require('express')

const MongoClient = require('mongodb').MongoClient

const app = express()
app.use(express.json())

var database;

//Connection between node js and local server
app.get('/', (request, response) => {
    response.send("<h1>Welcome to UserDatabase System...</h1>")
})


//To get all users details
app.get('/api/users', (request, response) => {
    database.collection('users').find({}).toArray((error, result) => {
        if (error)
            throw error
        else
            response.send(result)

    })

})

// Get User Detils by UID
app.get('/api/users/:uid', (request, response) => {
    database.collection('users').find({ uid: parseInt(request.params.uid) }).toArray((error, result) => {
        if (error) throw error
        if (result.length > 0)
            response.send(result)
        else
            response.send("No User Record Found..")
    })
})


// Add new User into Database
app.post("/api/users/addNewUser", (request, response) => {
    let user = {
        uid: parseInt(request.body.uid),
        uname: request.body.uname,
        email: request.body.email,
        salary: request.body.salary
    }
    database.collection('users').insertOne(user, (error, result) => {
        if (error) response.status(505).send(error)
        response.send("User Added Succesfully..")
    })
})


//Update USER DATA
app.put('/api/users/:uid', (request, response) => {
    let user={
        uid:parseInt(request.params.uid),
        uname:request.body.uname,
        email:request.body.email,
        salary:request.body.salary
    }

    let dataset={
        $set:user
    }
    database.collection('users').updateOne({uid : parseInt(request.params.uid)},dataset,(error,result)=>{
        if(error) response.status(500).send(error)
        response.send("Data Updated successfully...")
    })

})

//Delete USER DATA BY UID
app.delete('/api/users/:uid', (request, response) => {
    database.collection('users').deleteOne({uid:parseInt(request.params.uid)},(error,result)=>{
        if(error) response.status(404).send(error)
        response.send("User Deleted Succesfully....")
    })
})


//PATCH Method
//Update USER DATA
app.patch('/api/users/:uid', (request, response) => {
    let user={
        uid:parseInt(request.params.uid),
        // uname:request.body.uname,
        email:request.body.email,
        // salary:request.body.salary
    }

    let dataset={
        $set:user
    }
    database.collection('users').updateOne({uid : parseInt(request.params.uid)},dataset,(error,result)=>{
        if(error) response.status(500).send(error)
        response.send("Data Updated successfully... By PATCH()")
    })

})
app.listen(1234, () => {
    MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true }, (error, result) => {
        if (error)
            throw error
        else
            console.log("Connection Succesfull...")

        database = result.db('UserDatabase')
    })

})

