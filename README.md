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
Create Department <br>

|Endpoint URL|Authorization|Headers|Description|
|:---|:---|:---|:---|
|POST /departments |None | Content-Type: application/json | <br>

|Endpoint URL|Headers|Body|Description
|:---|:---|:---|:---|
|POST /departments |  Content-Type: application/json | {"dept_name": <-string->} | Create department with that name| <br>
|POST /employees |Content-Type: application/json| {"emp_name": <-string->, "emp_contact": <-integer->,"dept_id": <-integer->}| Create an employee |<br>
|GET /employees |Content-Type: application/json|{"dept_id": <-integer->,"join_date": <-date-string->}|Get employees at a department joined after the date passed|<br>
|GET /departments/:id |Content-Type: application/json|request parameter id is department id integer|Get department data|<br>
|PUT /update/employee/:id |Content-Type: application/json|{"emp_name":<-string->", "emp_contact": <-string->}|Update employee name or contact. Required employee ID in request url|<br>
