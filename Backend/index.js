const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnect = require("./config/database");
const CodeFusionRoutes = require("./routes/routes");

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Configure CORS options
const corsOptions = {
  origin: 'https://codefusionfrontend.onrender.com', // Allow only your frontend domain
  credentials: true, // Enable cookies and credentials to be sent
  methods: 'GET, POST, PUT, DELETE', // Allow specific methods
  allowedHeaders: 'Content-Type, Authorization' // Allow specific headers
};

// Enable CORS with the specified options
app.use(cors(corsOptions));

// Cookie parser middleware
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Middleware to parse JSON request body
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("<h1>This is the home page</h1>");
});

// Mount routes
app.use("/api/v1", CodeFusionRoutes);

// Connect to the database
dbConnect();

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
