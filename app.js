const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const bcrypt = require('bcrypt');
const db = require('./config/db'); // Your database connection module
const auth = require('./config/auth'); 


// Middlewares
app.use(cors());
app.use(bodyParser.json());
// Middleware for JWT authentication
function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
  
    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });
      req.user = user;
      next();
    });
  }

// Define a secret key for JWT
const jwtSecret = 'your_secret_key';

// Database connection
db.connect((err) => {
    if (err) {
        console.error('Database connection failed');
    } else {
        console.log('Database connected');
    }
});

app.get('/dashboard', authenticateToken, (req, res) => {
    const userId = req.user.userId; // The user's ID extracted from the JWT

    // Use the user's ID to fetch user-specific data from the database
    const userData = fetchUserDataFromDatabase(userId);

    // Respond with the user's data or perform other actions
    res.json({ user: userData });
});

// Fetch upcoming cricket matches
app.get('/upcoming-matches', auth, async (req, res) => {
  try {
      // Query the database to retrieve a list of upcoming matches
      const query = 'SELECT * FROM matches WHERE match_datetime > NOW()';
      const [rows] = await db.query(query);

      res.json(rows);
  } catch (error) {
      console.error('Error fetching upcoming matches:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Join a league for a specific match with a joining fee
app.post('/join-league', auth, async (req, res) => {
  const { userId } = req.user;
  const { matchId, leagueId, joiningFee } = req.body;

  try {
      // Check if the user has sufficient balance to pay the joining fee
      const userBalanceQuery = 'SELECT wallet_balance FROM users WHERE user_id = ?';
      const [[userBalanceRow]] = await db.query(userBalanceQuery, [userId]);

      if (!userBalanceRow || userBalanceRow.wallet_balance < joiningFee) {
          return res.status(400).json({ message: 'Insufficient balance' });
      }

      // Start a database transaction
      await db.beginTransaction();

      // Deduct the joining fee from the user's wallet
      const deductBalanceQuery = 'UPDATE users SET wallet_balance = wallet_balance - ? WHERE user_id = ?';
      await db.query(deductBalanceQuery, [joiningFee, userId]);

      // Add the user to the league
      const addParticipantQuery = 'INSERT INTO league_participants (user_id, league_id) VALUES (?, ?)';
      await db.query(addParticipantQuery, [userId, leagueId]);

      // Commit the transaction
      await db.commit();

      res.json({ message: 'Joined the league successfully' });
  } catch (error) {
      // Roll back the transaction in case of an error
      await db.rollback();

      console.error('Error joining the league:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});
  
// Signup route
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
  
    // Hash and salt the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Store user information in the database
  
    // Generate a JWT token for the user
    const token = jwt.sign({ userId: userId }, jwtSecret);
  
    res.json({ token });
  });
  
  // Login route
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Retrieve user information from the database based on the email
    // Verify the password
    const user = { userId: 1, username: 'example_user', email: 'user@example.com', password: 'hashed_password' };
    const passwordMatch = await bcrypt.compare(password, user.password);
  
    if (passwordMatch) {
      // Generate a JWT token for the user
      const token = jwt.sign({ userId: user.userId }, jwtSecret);
  
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Authentication failed' });
    }
  });

// API routes
app.use('/user', require('./routes/user'));
app.use('/admin', require('./routes/admin'));
app.use('/statement', require('./routes/statement'));
app.use('/contest', require('./routes/contest'));
app.use('/wallet', require('./routes/wallet'));
app.use('/signup',  require('./routes/signup'));
app.use('/login',  require('./routes/login'));


app.post('/upload', upload.single('file'), (req, res) => {
    // Handle file upload here
  });

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
