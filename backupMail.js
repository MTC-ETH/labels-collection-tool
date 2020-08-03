require('dotenv').config();
const backup = require('./routes/backup');
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology:true});

backup.sendBackupMail().then(res => {
    console.log(res);
    process.exit();
}).catch(err => {
    console.log(err);
    process.exit(1);
});