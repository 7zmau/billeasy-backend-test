# Billeasy Backend Test API
Test API to create and get employees & departments in a company
### Add postgres credentials to .env file
### Set the database credentials in
`db.js`
### Initialize the database 
`node init_db.js`
### Run
`node index.js`<br>
Open browser at http://localhost:{PORT}/

Configure PORT in `index.js`

#### API Endpoints
|Endpoint URL|Headers|Body|Description
|:---|:---|:---|:---|
|POST /departments |  Content-Type: application/json |<code>{"dept_name": <string> }</code>|Create department with the given name. Key `dept_name` is department name string.| <br>
|POST /employees |Content-Type: application/json|```{"emp_name": <string>, "emp_contact": <string>,"dept_id": <integer>}```|Create an employee. `emp_name` is employee name, `emp_contact` is employees contact number. `dept_id` is department ID|<br>
|GET /employees |Content-Type: application/json|```{"dept_ids": [<integer>],"join_date": <date-string>}```|Get employees at mentioned departments joined after the date passed. `dept_id` is a list of integers, which are the department IDs. `join_date` is employee join date, date format is YYYY-MM-DD|<br>
|GET /departments/:id |Content-Type: application/json|Request parameter id is department ID|Get department data for that id|<br>
|GET /employees/:id |Content-Type: application/json|Request parameter id is employee ID|Get employee data for that id|<br>
|PUT /update/employee/:id |Content-Type: application/json|```{"emp_contact": <string>}```|Update employee contact. Request parameter id is employee ID|<br>
