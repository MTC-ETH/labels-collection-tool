# labelling-tool


## Virtual server installation
### General requirements
Mongodb:
- Install mongodb via: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/ 
- Start mongo daemon: `sudo systemctl start mongod`
- Check daemon is running: `sudo systemctl status mongod`
- Automatically load daemon every startup: `sudo systemctl enable mongod`

Nodejs and npm:
- Please follow any tutorial on nodejs and np installation 

### Code from the repo
Clone this repository, then

#### Client:
- Build the react for production: `cd client && npm run build`

#### Backend:
- copy the .env file with the right information:
```
ADMIN_TOKEN="<token>"
EMAIL="emotionandstance.mtc@gmail.com"
EMAIL_PASS="<email-pass>"
EMAIL_BACKUP="luca.campanella1@gmail.com"
MONGODB_URI="mongodb://localhost/labelling_tool"
NODE_ENV="production"
PORT=443
KEY_PATH="/etc/ssl/private/voice-recordings.mtc.ethz.ch.key"
CERT_PATH="/etc/ssl/certs/voice-recordings.mtc.ethz.ch.crt.pem"
```
Optionally a different port for the http redirection service can be specified by: `HTTP_ONLY_PORT=8080`
Test that everything is up and running:
- `sudo node app.js`

You should be able to access the server from the usual links and the DNS redirection, 
for example: https://idvm-infk-mtc01.inf.ethz.ch/ 

In order to add a new DNS alias, it's necessary to contact the ISG.

#### Make the server a daemon
- copy the service file in the service directories: `sudo cp utils/labelling-tool-backend.service /lib/systemd/system/labelling-tool-backend.service`
- make the service run at startup: `sudo systemctl enable labelling-tool-backend.service`
- reboot or alternatively reload the service via `sudo systemctl daemon-reload labelling-tool-backend.service`
- check that the server is running in the background by looking at the logs: `sudo journalctl -u labelling-tool-backend`


### Troubleshooting
Which service is running on which port: `sudo netstat -tulp` 