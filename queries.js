const { pool } = require("./db");

const addDepartment = async (deptName) => {
    try {
        const results = await pool.query('INSERT INTO departments (name) VALUES ($1) RETURNING *', [deptName])
        return {
            error: false,
            data: results.rows[0],
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
            data: results.rows[0],
            message: `Employee added with ID: ${results.rows[0].id}`
        }
    } catch(error) {
        console.log(error)
        if (error.code == '23503') {
            return {
                error: true,
                message: `Department with ID ${dept_id} doesn't exist.`
            }
        }
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
        if (results.rows == 0) {
            return {
                error: true,
                message: `Department with ID ${dept_id} doesn't exist.`
            }
        }
        // Return result
        return {
            error: false,
            data: results.rows[0]
        }
    } catch (error) {
        console.log(error)
        return {
            error: true,
            message: error.message
        }
    }
}

const getEmployee = async (empId) => {
    try {
        let query = `
            SELECT em.name, em.contact, em.join_date, dept.name AS dept
            FROM employees AS em
            LEFT JOIN departments AS dept ON dept.id = em.dept_id
            WHERE em.id = ${empId}
        `
        const results = await pool.query(query)
        if (results.rows == 0) {
            return {
                error: true,
                message: `Employee with ID ${empId} doesn't exist.`
            }
        }
        // Return result
        return {
            error: false,
            data: results.rows[0]
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
        // Query get_employee_data() takes department IDs and employee join date
        let deptIds = `'{${dept_id.join()}}'`
        let query = `SELECT get_employee_data(${deptIds}, '${join_date}') AS row`
        const results = await pool.query(query)
        if (results.rows == 0) {
            return {
                error: true,
                message: 'No data for the given parameters.'
            }
        }
        // Format the returned json
        let result = []
        for (let i of results.rows) {
            result.push(i.row)
        }
        // Return result
        return {
            error: false,
            data: result
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
        let query = `UPDATE employees SET contact = ${contact} WHERE id = ${empId} RETURNING *`
        const results = await pool.query(query)
        if (results.rows == 0) {
            return {
                error: true,
                message: `Employee with ID ${empId} doesn't exist.`
            }
        }
        return {
            error: false,
            data: results.rows[0]
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
    getEmployee,
    addEmployee,
    updateEmployeeContact
}
