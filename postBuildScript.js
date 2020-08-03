require('dotenv').config();
const backup = require('./routes/backup');

const FileSystem = require("fs");
const targetDir = './client/src/assets/json';

if (!FileSystem.existsSync(targetDir)){
    FileSystem.mkdirSync(targetDir);
}

FileSystem.writeFile(targetDir + '/secrets.json', JSON.stringify({admintoken: process.env.ADMIN_TOKEN}),
    (err) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log("Successfully written");
        }
    }
);

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