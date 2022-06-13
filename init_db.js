const { pool } = require("./db");

/**
 * Drops employees and departments table
 * and any triggers and functions which exist on the relation.
 */
async function dropAll() {
    try {
        await pool.query('DROP TRIGGER IF EXISTS emp_count ON employees');
        await pool.query('DROP FUNCTION IF EXISTS update_emp_count()');
        await pool.query('DROP FUNCTION IF EXISTS get_employee_data(dpid integer, joindate date)');
        await pool.query('DROP FUNCTION IF EXISTS get_employee_data(dpid integer[], joindate date)');
        await pool.query('DROP TABLE IF EXISTS employees');
        await pool.query('DROP TABLE IF EXISTS departments');
        console.log("Cleared the database.")
    } catch (err) {
        console.log(err)
    }
}

/**
 * Creates a `departments` table.
 */
async function createDepartmentTable() {
    try {
        let query = `
            CREATE TABLE departments (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                emp_count INTEGER DEFAULT 0
            )
        `
        const result = await pool.query(query)
        if (result)
            console.log('Created departments table..')
    } catch (error) {
        console.log(error)
    }
}

/**
 * Creates a `employees` table
 */
async function createEmployeeTable() {
    try {
        let query = `
            CREATE TABLE employees (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                contact VARCHAR(100),
                join_date DATE,
                dept_id INTEGER,
                CONSTRAINT fk_emp_dept FOREIGN KEY (dept_id) REFERENCES departments (id)
            )
        `
        const result = await pool.query(query)
        if (result) 
            console.log('Created employees table...')
    } catch (error) {
        console.log(error)
    }
}

/**
 * Creates a function which increases the employee count
 * of the department in which the employee is added.
 */
async function employeeCountFunction () {
    try {
        let query = `
            CREATE or REPLACE FUNCTION update_emp_count() RETURNS trigger AS $$
            BEGIN
                UPDATE departments
                SET emp_count = emp_count + 1
                WHERE departments.id = NEW.dept_id;
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `
        await pool.query(query)
    } catch (error) {
        console.log(error)
    }
}

/**
 * Creates a trigger which calls the employee count
 * function whenever an employee is added
 */
async function employeeCountTriggeer() {
    try {
        let query = `
            CREATE TRIGGER emp_count BEFORE INSERT ON employees
            FOR EACH ROW EXECUTE FUNCTION update_emp_count();
        `
        const result = await pool.query(query)
        if (result)
            console.log('Created count trigger..')
    } catch (error) {
        console.log(error)
    }
}

/**
 * Creates a function which returns employee data
 * at a department joined after a particular date.
 */
async function employeeDataFunction() {
    try {
        let query = `
            CREATE OR REPLACE FUNCTION get_employee_data(dpid integer[], joindate date) RETURNS table (document json) AS $$
            SELECT jsonb_build_object(
                'name', em.name,
                'contact', em.contact,
                'dept', dept.name,
                'join_date', em.join_date
            ) FROM employees AS em
            LEFT JOIN departments AS dept ON dept.id = em.dept_id
            WHERE em.dept_id = ANY(dpid) AND em.join_date >= joindate;
            $$ LANGUAGE SQL;
        `
        const result = await pool.query(query)
        if (result)
            console.log('Created employee function..')
    } catch (error) {
        console.log(error)
    }
}

/**
 * Creates a function which sets the join date
 * whenever an employee is added
 */
async function employeeJoinDateFunction() {
    try {
        let query = `
            CREATE OR REPLACE FUNCTION join_date() RETURNS trigger AS $$
            BEGIN
                IF NEW.join_date IS NULL THEN
                    NEW.join_date := now();
                    RETURN NEW;
                END IF;
                RETURN NEW
            ;
            END;
            $$ LANGUAGE plpgsql;
        `
        const result = await pool.query(query)
    } catch (error) {
        console.log(error)
    }
}

/**
 * Trigger which calls the join date function.
 */
async function employeeJoinDateTrigger() {
    try {
        let query = `
            CREATE TRIGGER set_join_date BEFORE INSERT ON employees
            FOR EACH ROW EXECUTE FUNCTION join_date();
        `
        const result = await pool.query(query)
        if (result)
            console.log('Created join date trigger...')
    } catch (error) {
        console.log(error)
    }
}

async function init_db() {
    await dropAll()
    await createDepartmentTable()
    await createEmployeeTable()
    await employeeCountFunction()
    await employeeCountTriggeer()
    await employeeDataFunction()
    await employeeJoinDateFunction()
    await employeeJoinDateTrigger()
    pool.end()
    console.log('Done!')
}

init_db();
