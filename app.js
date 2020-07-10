const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const tagCommentRouter = require('./routes/entryPoint');
app.use('/entrypoint', tagCommentRouter);

app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`);
});
