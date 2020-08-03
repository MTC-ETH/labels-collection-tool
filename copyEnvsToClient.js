require('dotenv').config();

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