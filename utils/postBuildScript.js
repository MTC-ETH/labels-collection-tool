// Copyright 2020-2021, ETH Zurich, Media Technology Center
//
// This file is part of Labels Collection Tool (LCT) at MTC, in the scope of the project
// Emotion and Stance detection for German text.
//
// Labels Collection Tool (LCT) is a free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Labels Collection Tool (LCT) is distributed in the hope that it will be useful for similar projects,
// but Labels Collection Tool (LCT); without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser Public License for more details.
//
// You should have received a copy of the GNU Lesser Public License
// along with Labels Collection Tool (LCT). If not, see <https://www.gnu.org/licenses/>.

const fs = require('fs');

console.log("REACT_APP_AUTOMATIC_REGISTRATION = " + process.env.REACT_APP_AUTOMATIC_REGISTRATION);
if(process.env.REACT_APP_AUTOMATIC_REGISTRATION) {
    fs.writeFile('./client/.env', "REACT_APP_AUTOMATIC_REGISTRATION=\"true\"\n",
        (err) => {
            if (err) {
                console.log(err);
                process.exit(1);
            } else {
                console.log("Successfully written");
                process.exit();
            }
        }
    );
}



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