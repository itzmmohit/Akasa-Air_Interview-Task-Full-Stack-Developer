const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const multer = require('multer');

const db = require('db');
const port = 3000;
const hostname = 'localhost';

const database = "blog-akasa";
const tbl = "users";

app.use(cors());

// Set up sessions
app.use(session({
    secret: '5d5014e3e4c5d3a2f12ab85bcee62bc08a6ad575bdcd47eb1edc7d695d1e5f81',
    resave: true,
    saveUninitialized: true,
}));

// Use express.static to serve static files
app.use(express.static(path.join(__dirname, 'client')));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// MySql connection
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: database
});

// Connect with MySql
connection.connect((err) => {
    if (err)
        throw (err);
    console.log("MySql Connected");
});

// Add a route for serving the index.html file
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../client/index.html');
    res.sendFile(filePath);
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../client')));

// Start the server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

app.post('/register', async (req, res) => {
    console.log('Register button clicked');
    const { first, last, email, password } = req.body;

    // Check if the email already exists in the database
    const checkEmailQuery = `SELECT * FROM ${tbl} WHERE email = ?`;
    const checkEmailValues = [email];

    connection.query(checkEmailQuery, checkEmailValues, async (checkErr, checkResult) => {
        if (checkErr) {
            console.error(checkErr);
            res.status(500).send('Error checking email availability');
        } else {
            // If the email is already registered, return an error
            if (checkResult.length > 0) {
                res.status(409).send('Email already registered');
            } else {
                // If the email is not registered, proceed with user registration
                const hashedPassword = await bcrypt.hash(password, 10);

                const insertQuery = `INSERT INTO ${tbl} (first, email, password, last) VALUES (?, ?, ?, ?)`;
                const insertValues = [first, last, email, hashedPassword];

                connection.query(insertQuery, insertValues, (insertErr, insertResult) => {
                    if (insertErr) {
                        console.error(insertErr);
                        res.status(500).send('Error registering user');
                    } else {
                        console.log('User registered successfully');
                        res.status(200).send('User registered successfully');
                    }
                });
            }
        }
    });
});


app.post('/login', (req, res) => {
    console.log('Login button clicked');
    const { email, password } = req.body;

    const sql = `SELECT * FROM ${tbl} WHERE email = ?`;
    const values = [email];

    connection.query(sql, values, async (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error logging in');
        } else {
            console.log('Query result:', result);
            if (result.length > 0) {
                const isPasswordValid = await bcrypt.compare(password, result[0].password);
                console.log('Is password valid:', isPasswordValid);
                if (isPasswordValid) {
                    console.log('User logged in successfully');
                    res.status(200).send('User logged in successfully');
                } else {
                    res.status(401).send('Invalid email or password');
                }
            } else {
                res.status(401).send('Invalid email or password');
            }
        }
    });
});

// New route for handling forgot password requests
app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    // Check if the email exists in the database
    const checkEmailQuery = `SELECT * FROM ${tbl} WHERE email = ?`;
    const checkEmailValues = [email];

    connection.query(checkEmailQuery, checkEmailValues, async (checkErr, checkResult) => {
        if (checkErr) {
            console.error(checkErr);
            res.status(500).send('Error checking email availability');
        } else {
            // If the email is found, send a reset email
            if (checkResult.length > 0) {
                const token = generateToken(); // You need to implement the token generation logic

                // Save the token and associate it with the user's email in the database
                saveTokenToDatabase(email, token); // Implement this function

                // Send the reset email
                sendResetEmail(email, token); // Implement this function

                res.status(200).send('Password reset link sent to your email.');
            } else {
                res.status(404).send('Email not found.');
            }
        }
    });
});

app.get('/posts', (req, res) => {
    const sql = `SELECT * FROM posts ORDER BY created_at DESC`;
    connection.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching posts');
        } else {
            res.json(result);
        }
    });
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Specify the folder where uploaded files will be stored
    },
    filename: function (req, file, cb) {
      // Use a unique name for each uploaded file
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
const upload = multer({ storage: storage });
// Serve static files from the 'uploads' directory
app.use('../client/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/posts', upload.single('image'), (req, res) => {
    console.log('Add post button clicked');
    const { title, content, tags } = req.body;
    const likes = 0;
    const image_path = req.file ? req.file.path : null;
  
    const sql = `INSERT INTO posts (title, content, tags, likes, image_path) VALUES (?, ?, ?, ?, ?)`;
    const values = [title, content, tags, likes, image_path];
  
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error adding post');
      } else {
        res.status(200).send('Post added successfully');
      }
    });
});

// Modify your existing route for updating posts
const upload1 = multer(); // Create a multer instance

app.put('/posts/:postId', upload1.none(), (req, res) => {
    console.log('Update post button clicked');
  // Extract data from the request body
  const { title, content, tags, image_path } = req.body;
  const postId = req.params.postId;

  // Your SQL query for updating an existing post
  const sql = `UPDATE posts SET title=?, content=?, tags=?, image_path=? WHERE id=?`;
  const values = [title, content, tags, image_path, postId];

  // Execute the SQL query
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating post');
    } else {
      res.status(200).send('Post updated successfully');
    }
  });
});

app.get('/posts/:postId', (req, res) => {
    const postId = req.params.postId;

    const sql = `SELECT * FROM posts WHERE id=?`;
    const values = [postId];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching post details');
        } else {
            if (result.length > 0) {
                res.status(200).json(result[0]);
            } else {
                res.status(404).json({ error: 'Post not found' });
            }
        }
    });
});


// Modify your existing route for deleting posts
app.delete('/posts/:postId', (req, res) => {
    console.log('Delete post button clicked');
    const postId = req.params.postId;
  
    // Your SQL query for deleting an existing post
    const sql = `DELETE FROM posts WHERE id=?`;
    const values = [postId];
  
    // Execute the SQL query
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error deleting post');
      } else {
        res.status(200).send('Post deleted successfully');
      }
    });
});

// Search for posts
app.get('/posts/search', (req, res) => {
    const query = req.query.query ? req.query.query.toLowerCase() : '';
  
    // Use SQL query to search for posts in the database
    const sql = 'SELECT * FROM posts WHERE LOWER(title) LIKE ? OR LOWER(tags) LIKE ?';
    const values = [`%${query}%`, `%${query}%`];
  
    connection.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error searching posts', err);
        res.status(500).json({ error: 'Error searching posts', details: err.message });
      } else {
        res.json(results);
      }
    });
  });
  
// Helper function to generate a random token
function generateToken() {
    return Math.random().toString(36).slice(2);
}

// Helper function to save the token to the database (you need to implement this)
function saveTokenToDatabase(email, token) {
    const insertTokenQuery = 'INSERT INTO reset_tokens (email, token) VALUES (?, ?)';
    const insertTokenValues = [email, token];
  
    connection.query(insertTokenQuery, insertTokenValues, (insertErr, insertResult) => {
      if (insertErr) {
        console.error('Error saving reset token to the database:', insertErr);
        // Handle the error as needed, e.g., return an error response
      } else {
        console.log('Reset token saved to the database');
        // You may log or handle success as needed
      }
    });
  }  

// Helper function to send a reset email
function sendResetEmail(email, token) {
    // Configure nodemailer to use your email service
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'akasaairblog@gmail.com',
            pass: 'qwert123456789yuiop',
        },
    });

    // Send an email with the reset link
    transporter.sendMail({
        from: 'akasaairblog@gmail.com',
        to: email,
        subject: 'Password Reset - Your Blog App',
        html: `
            <p>Hello,</p>
            <p>You have requested to reset your password for the Blog App. Click the following link to reset your password:</p>
            <a href="http://your-app.com/reset-password?token=${token}">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email.</p>
            <p>Thank you,</p>
            <p>Your Blog App Team</p>
        `,
    });
}
