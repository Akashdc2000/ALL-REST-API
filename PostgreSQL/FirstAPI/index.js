const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
app.use(express.json())
const dbEmployee=require('./employee')

app.get('/', (request, response) => {
    response.send("<h1>Welcome in POSTGRESQL World</h1>")
})


app.get('/employees',dbEmployee.getEmployees)
app.get('/employee/:id',dbEmployee.getEmployeeByID)
app.put('/employee/:id',dbEmployee.updateEmployee)
app.post('/addEmployee',dbEmployee.createEmployees)
app.delete('/deleteEmployee/:id',dbEmployee.deleteEmployee)

app.listen(5000, () => {
    console.log("Connection Successful..")
})