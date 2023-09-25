const express = require('express');
const mysql = require('mysql2');
const bodyparser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

app.use(bodyparser.json());

// Creating a mysql database connection:-
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sagar@2001',
    database: 'empsystem',
});

db.connect((err) => {
    if (err) {
        console.error("Database connection error", err);
    } else {
        console.log("Connected to the database");
    }
});

app.use('/home', (req, res) => {
    res.json("Hi, this is done");
});

// Define a route to handle form submission and insert data into the database
app.post('/api/emp', (req, res) => {
    const { firstName, lastName, contact, email, dob, address } = req.body;

    const sql = 'INSERT INTO employees (fname, lname, contact, email, dob, address) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [firstName, lastName, contact, email, dob, address];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data: ', err);
            res.status(500).json({ message: 'Error inserting data' });
        } else {
            console.log("Data inserted successfully");
            res.status(200).json({ message: 'Data inserted successfully' });
        }
    });
});

// Define a route to handle updating employee data
app.put('/api/users/:empId', (req, res) => {
    const empId = req.params.empId;
    const {
        firstName,
        lastName,
        contact,
        email,
        dob,
        address
    } = req.body;

    // Ensure that empId is a valid number (you can add more validation here)
    if (isNaN(empId)) {
        return res.status(400).json({
            message: 'Invalid employee ID'
        });
    }

    // Your SQL update query
    const sql = `
      UPDATE employees
      SET fname = ?,
          lname = ?,
          contact = ?,
          email = ?,
          dob = ?,
          address = ?
      WHERE emp_id = ?`;

    const values = [
        firstName,
        lastName,
        contact,
        email,
        dob,
        address,
        empId
    ];

    // Execute the update query
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            res.status(500).json({
                message: 'Error updating data'
            });
        } else {
            if (result.affectedRows === 1) {
                res.status(200).json({
                    message: 'User Updated Successfully!'
                });
            } else {
                res.status(404).json({
                    message: 'User not found'
                });
            }
        }
    });
});



// Define a route to retrieve and send data from the database
app.get('/api/data', (req, res) => {
    const sql = 'SELECT * FROM employees';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving data:', err);
            res.status(500).json({ message: 'Error retrieving data' });
        } else {
            console.log('Data retrieved successfully');
            res.status(200).json({ data: results }); // Send the retrieved data as JSON
        }
    });
});


// Combine login and token generation into a single route
app.post('/api/login', (req, res) => {
    const { userName, password } = req.body;

    // Add a console.log to see the received data from the frontend
    console.log('Received data from frontend:', userName, password);

    const sql = 'SELECT * FROM employees WHERE fname = ? AND dob = ?';
    const values = [userName, password];

    // Add a console.log to see the SQL query and values being used
    console.log('Executing SQL query:', sql, values);

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            res.status(500).json({ message: 'Error during login' });
        } else {
            if (results.length === 1) {
                const user = results[0];

                // Generate the JWT token
                jwt.sign({ user }, secretKey, { expiresIn: '1h' }, (err, token) => {
                    if (err) {
                        console.error('Error generating JWT token:', err);
                        res.status(500).json({ message: 'Error during login' });
                    } else {
                        // Send the JWT token along with the user data
                        res.status(200).json({ message: 'Login successful', user, token });
                        console.log(userName, password);
                    }
                });
            } else {
                // Username and password don't match
                res.status(401).json({ message: 'Invalid username or password' });
            }
        }
    });
});

// Delete
app.delete('/api/users/:empId', (req, res) => {
    const empId = req.params.empId;

    const sql = 'Delete from employees where emp_id = ?';
    db.query(sql, [empId], (err, result) => {
        if (err) {
            console.error('Error deleting user:', err)
            res.status(500).json({ message: 'Error deleting user' });
        }
        else {
            if (result.affectedRows === 1) {
                res.status(200).json({ message: 'User Deleted Successfully!' });
            }
            else {
                res.status(404).json({ message: 'User not found' });
            }
        }
    });
});


// Secret key for signing and verifying tokens (keep this secret)
const secretKey = 'my_secret_key';

// Middleware to verify JWT token before accessing protected routes
function verifyToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error('Error verifying JWT token:', err);
            return res.status(401).json({ message: 'Access denied, invalid token' });
        }

        req.user = decoded.user;
        next();
    });
}

// Example of using the verifyToken middleware for protected routes
app.get('/api/protected-route', verifyToken, (req, res) => {
    // Access granted if the token is valid
    res.status(200).json({ message: 'Access granted', user: req.user });
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
