import express from 'express';
import connectDB from './config/dbConfig.js';
import apiRouter from './routers/apiRouter.js';

const PORT = 3000; // Port number
 
const app = express(); // Create express app server instance

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.text()); // Middleware to parse text request bodies
app.use(express.urlencoded()); // Middleware to parse URL-encoded request bodies

app.use('/api', apiRouter); // If the url starts with /api then the request is forwarded to the apiRouter

app.get('/', (req, res) => {
    console.log(req.query);
    console.log(req.body);
    return res.send('Home');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});

