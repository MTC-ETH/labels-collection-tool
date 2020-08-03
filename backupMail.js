require('dotenv').config();
const backup = require('./routes/backup');

backup.sendBackupMail();