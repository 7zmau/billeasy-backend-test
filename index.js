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
            data: data.message,
            message: 'success'
        })
    } catch {
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
            data: data.message,
            message: 'success'
        })
    } catch {
        return resp.status(400).json({
            status: 400,
            data: false,
            error: error
        })
    }
})

app.get('/employees', async (req, resp) => {
    try {
        // Get department ID and joining date
        // from request body
        let dept_id = req.body.dept_id
        let join_date = req.body.join_date
        // Throw error if no department ID & join date
        if (!dept_id) {
            throw 'Invalid request parameters.'
        }
        if (!join_date) {
            throw 'Invalid request parameters.'
        }
        const data = await db.getEmployees(dept_id, join_date)
        if (data.error) {
            throw data.message
        }
        return resp.status(200).json({
            status: 200,
            data: data.message,
            message: 'success'
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
        let dept_id = parseInt(req.params.id)
        const data = await db.getDepartment(dept_id)
        if (data.error) {
            throw data.message
        }
        return resp.status(200).json({
            status: 200,
            data: data.message,
            message: 'success'
        })
    }  catch (error) {
        return resp.status(400).json({
            status: 400,
            data: false,
            error: error
        })
    }
})

app.put('/update/employee/:id', async (req, resp) => {
    try {
        let empName = req.body.emp_name;
        let empContact = req.body.emp_contact;
        let empId = parseInt(req.params.id)
        if (!empName && !empContact) {
            throw 'Invalid request parameters.'
        }
        if (empName) {
            const data = await db.updateEmployeeName(empName, empId)
            if (data.error) {
                throw data.message
            }
            return resp.status(200).json({
                status: 200,
                data: data.message,
                message: 'success'
            })
        }
        if (empContact) {
            const data = await db.updateEmployeeContact(empContact, empId)
            if (data.error) {
                throw data.message
            }
            return resp.status(200).json({
                status: 200,
                data: data.message,
                message: 'success'
            })
        }
    } catch {
        return resp.status(400).json({
            status: 400,
            data: false,
            error: error
        })
    }
})
