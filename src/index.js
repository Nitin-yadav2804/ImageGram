import express from 'express';
import connectDB from './config/dbConfig.js';
import apiRouter from './routers/apiRouter.js';
import { rateLimit } from 'express-rate-limit';

const PORT = 3000; // Port number
 
const app = express(); // Create express app server instance

const limiter = rateLimit({
    windowMs: 0.5 * 60 * 1000, // 30 seconds
    max: 5 // limit each IP to 5 requests per windowMs
});

app.use(limiter); // apply rate limiter to all requests

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.text()); // Middleware to parse text request bodies
app.use(express.urlencoded()); // Middleware to parse URL-encoded request bodies

app.use('/api', apiRouter); // If the url starts with /api then the request is forwarded to the apiRouter

app.get('/ping', (req, res) => {
    console.log(req.query);
    console.log(req.body);
    console.log(req.user);
    return res.json({ message: "pong" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});

