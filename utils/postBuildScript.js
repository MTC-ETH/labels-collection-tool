const fs = require('fs');
let path = '.env';

try {
    if (!fs.existsSync(path)) {
        path = "../.env"
    }
} catch(err) {
    console.error(err);
}

require('dotenv').config({path: path});
const backup = require('../routes/backup');

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