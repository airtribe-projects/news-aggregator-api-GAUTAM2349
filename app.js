require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const newsRoutes = require('./routes/newsRoutes');
const requestTracker = require('./middlewares/requestsTracker');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestTracker);
app.use('/users', userRoutes);
app.use('/news', newsRoutes);


app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});




module.exports = app;