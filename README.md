# Billeasy Backend Test API
Test API to create and get employees & departments in a company

### Set up the database 
Create **.env** file in your local Repository and set **DATABASE_URL** to your Postgresql database URI
### Initialize the database 
`$ npm run initdb`
This will clear existing tables.
### Run
`$ node index.js`<br>

Open browser at http://localhost:{PORT}/
Configure PORT in `index.js`

#### API Endpoints
|Endpoint URL|Headers|Body|Description
|:---|:---|:---|:---|
|POST /departments |  Content-Type: application/json |{<br>"dept_name": ***string*** <br>}|Create department with the given name. Key `dept_name` is department name string.| <br>
|POST /employees |Content-Type: application/json|{<br> "emp_name": ***string***, "emp_contact": ***string***, "dept_id": ***integer*** <br>}|Create an employee. Keys `emp_name` is employee name, `emp_contact` is employees contact number. `dept_id` is department ID|<br>
|GET /employees |Content-Type: application/json|{<br> "dept_ids": [ ***integer*** ], "join_date": ***date-string*** <br>}|Get employees at mentioned departments joined after the date passed. Keys `dept_ids` is a list of integers, which are the department IDs. `join_date` is employee join date, date format is YYYY-MM-DD|<br>
|GET /departments/:id |Content-Type: application/json|Request parameter id is department ID|Get department data for that id|<br>
|GET /employees/:id |Content-Type: application/json|Request parameter id is employee ID|Get employee data for that id|<br>
|PUT /update/employee/:id |Content-Type: application/json|{<br> "emp_contact": ***string*** <br>}|Update employee contact. Request parameter id is employee ID. Key `emp_contact` is a string which is the contact to update.|<br>
