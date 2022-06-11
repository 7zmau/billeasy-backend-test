const { pool } = require("./db");

const addDepartment = async (deptName) => {
    try {
        const results = await pool.query('INSERT INTO departments (name) VALUES ($1) RETURNING *', [deptName])
        return {
            error: false,
            message: `Department added with ID: ${results.rows[0].id}`
        }
    } catch(error) {
        console.log(error)
        return {
            error: true,
            message: error.message
        }
    }
}

const addEmployee = async (name, contact, dept_id) => {
    try {
        const results = await pool.query('INSERT INTO employees (name, contact, dept_id) VALUES ($1, $2, $3) RETURNING *', [name, contact, dept_id])
        return {
            error: false,
            message: results.rows[0]
        }
    } catch(error) {
        console.log(error)
        return {
            error: true,
            message: error.message
        }
    }
}

const getDepartment = async (dept_id) => {
    try {
        let query = `SELECT * FROM departments WHERE id = ${dept_id}`
        const results = await pool.query(query)
        // Return result
        return {
            error: false,
            message: results.rows[0]
        }
    } catch (error) {
        console.log(error)
        return {
            error: true,
            message: error.message
        }
    }
}

const getEmployees = async (dept_id, join_date) => {
    try {
        // Query get_employee_data() takes department ID and employee join date
        let query = `SELECT get_employee_data(${dept_id}, '${join_date}') AS row`
        const results = await pool.query(query)
        // Format the returned json
        let result = []
        for (let i of results.rows) {
            result.push(i.row)
        }
        // Return result
        return {
            error: false,
            message: result
        }
    } catch(error) {
        console.log(error)
        return {
            error: true,
            message: error.message
        }
    }
}

const updateEmployeeName = async (name, empId) => {
    try {
        const results = pool.query(`UPDATE employees SET name = '${name}' WHERE id = ${empId} RETURNING *`)
        return {
            error: false,
            message: results.rows[0]
        }
    } catch(error) {
        console.log(error)
        return {
            error: true,
            message: error.message
        }
    }
} 

const updateEmployeeContact = async (contact, empId) => {
    try {
        const results = pool.query(`UPDATE employees SET contact = ${contact} WHERE id = ${empId} RETURNING *`)
        return {
            error: false,
            message: results.rows[0]
        }
    } catch(error) {
        console.log(error)
        return {
            error: true,
            message: error.message
        }
    }
}

module.exports = {
    getEmployees,
    addDepartment,
    getDepartment,
    addEmployee,
    updateEmployeeContact,
    updateEmployeeName
}
