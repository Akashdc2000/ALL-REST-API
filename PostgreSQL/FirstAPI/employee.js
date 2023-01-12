const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.UNAME,
    password: process.env.password,
    host: "localhost",
    port: 5432,
    database: "firstpostgres-api"
})

//Create new Employee
const createEmployees = (request, response) => {

    const { name, email } = request.body

    const QUERY = 'insert into employee (name,email) values($1,$2) returning *'

    pool.query(QUERY, [name, email], (error, result) => {
        if (error) {
            console.log(error)
            throw error
        }
        response.status(200).json({
            msg: "Data Inserted Succesfully...",
            data: result.rows[0]
        })
    })
}

//Get All employees
const getEmployees = (request, response) => {

    const QUERY = 'select * from employee'

    pool.query(QUERY, (error, result) => {
        if (error) {
            console.log(error)
            throw error
        }
        response.status(200).json({
            msg: "All Employee Details...",
            data: result.rows
        })
    })
}


//Get Employee by ID

const getEmployeeByID = (request, response) => {
    const id = parseInt(request.params.id)
    const QUERY = 'select * from employee where id=$1'

    pool.query(QUERY, [id], (error, result) => {
        if (error) {
            console.log(error)
            throw error
        }
        response.status(200).json({
            msg: " Employee Details...",
            data: result.rows[0]
        })
    })
}

//Update Employee Details...
const updateEmployee = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
    const QUERY = 'update employee set name=$1,email=$2 where id=$3'

    pool.query(QUERY, [name, email, id], (error, result) => {
        if (error) {
            console.log("Happen Something wrong... ")
        }
        response.status(200).json({
            msg: "Data Updated Succesfully..."
        })
    })

}

//To delete a records 
const deleteEmployee = (request, response) => {
    const id = parseInt(request.params.id)
    const QUERY = 'delete from employee where id=$1'

    pool.query(QUERY, [id], (error, result) => {

        if (error) {
            console.log("Happen Something wrong... ")
        }
        response.status(200).json({
            msg: "Records Remove Successfully..."
        })
    })


}

module.exports = {
    createEmployees, getEmployees, getEmployeeByID, updateEmployee, deleteEmployee
}