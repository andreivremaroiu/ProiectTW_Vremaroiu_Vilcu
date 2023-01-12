const express = require('express');
const bugRouter = require('./routes/bugs');
const userRouter = require('./routes/users');
const projectRouter = require('./routes/projects');

const app = express();

app.use(express.json());

app.use('/bugs', bugRouter);
app.use('/users', userRouter);
app.use('/projects', projectRouter);

app.use((req, res) => {
    return res.status(400).json({"message": "error"})
})

module.exports = app;