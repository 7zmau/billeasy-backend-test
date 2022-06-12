const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT 
const db = require('./queries')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ message: "billeasy-test-api" })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

app.post('/departments', async (req, resp) => {
    try {
        let deptName = req.body.dept_name
        if (!deptName) {
            throw 'Invalid request parameters'
        }
        const data = await db.addDepartment(deptName)
        if (data.error) {
            throw data.message
        }
        return resp.status(200).json({
            status: 200,
            data: data.data,
            message: data.message ? data.message :'success'
        })
    } catch(error) {
        return resp.status(400).json({
            status: 400,
            data: false,
            error: error
        })
    }
})

app.post('/employees', async (req, resp) => {
    try {
        let empName = req.body.emp_name
        let empContact = req.body.emp_contact
        let deptId = req.body.dept_id
        const data = await db.addEmployee(empName, empContact, deptId)
        if (data.error) {
            throw data.message
        }
        return resp.status(200).json({
            status: 200,
            data: data.data,
            message: data.message? data.message :'success'
        })
    } catch(error) {
        return resp.status(400).json({
            status: 400,
            data: false,
            error: error
        })
    }
})

app.get('/employees', async (req, resp) => {
    try {
        // Get department IDs and joining date
        // from request body
        let deptIds  = req.body.dept_ids
        let joinDate = req.body.join_date
        // Throw error if no department IDs or join date
        if (!deptIds || deptIds.length == 0 || typeof(deptIds) == 'number' || !joinDate) {
            throw 'Invalid request parameters.'
        }
        const data = await db.getEmployees(deptIds , joinDate)
        if (data.error) {
            throw data.message
        }
        return resp.status(200).json({
            status: 200,
            data: data.data,
            message: data.message? data.message : 'success'
        })
    } catch (error) {
        return resp.status(400).json({
            status: 400,
            data: false,
            error: error
        })
    }
})

app.get('/employees/:id', async (req, resp) => {
    try {
        let empId = parseInt(req.params.id)
        const data = await db.getEmployee(empId)
        if (data.error) {
            throw data.message
        }
        return resp.status(200).json({
            status: 200,
            data: data.data,
            message: data.message? data.message : 'success'
        })
    } catch (error) {
        return resp.status(400).json({
            status: 400,
            data: false,
            error: error
        })
    }
})

app.get('/departments/:id', async (req, resp) => {
    try {
        let deptId = parseInt(req.params.id)
        const data = await db.getDepartment(deptId)
        if (data.error) {
            throw data.message
        }
        return resp.status(200).json({
            status: 200,
            data: data.data,
            message: data.message? data.message : 'success'
        })
    } catch (error) {
        return resp.status(400).json({
            status: 400,
            data: false,
            error: error
        })
    }
})

app.put('/update/employee/:id', async (req, resp) => {
    try {
        let empContact = req.body.emp_contact;
        let empId = parseInt(req.params.id)
        if (!empContact) {
            throw 'Invalid request parameter.'
        }
        const data = await db.updateEmployeeContact(empContact, empId)
        if (data.error) {
            throw data.message
        }
        return resp.status(200).json({
            status: 200,
            data: data.data,
            message: data.message? data.message :'success'
        })
    } catch (error) {
        return resp.status(400).json({
            status: 400,
            data: false,
            error: error
        })
    }
})
