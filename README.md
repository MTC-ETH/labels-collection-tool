# labelling-tool


## Deployment on any machine
This guide applies to any general deployment, also on ETH D-INFK virtual servers.
### General requirements
Mongodb:
- Install mongodb via: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/ 
- Start mongo daemon: `sudo systemctl start mongod`
- Check daemon is running: `sudo systemctl status mongod`
- Automatically load daemon every startup: `sudo systemctl enable mongod`

Nodejs and npm:
- Please follow any tutorial on nodejs and npm installation, for example:
https://nodejs.org/en/download/package-manager/

### Code from the repo
Clone this repository, then 

#### Client:
- Build the react client for production: `cd client && npm run build`. This
will create an optimized version of the react client and will allow the 
backend in node to serve it.

#### Backend:
- Create in the main directory of the project a `.env` file with the right information:
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

Where `ADMIN_TOKEN` is just a secret sequence of letters and numbers that will
allow you to access the "hidden" admin page at the address: `maindomain.com//admindashboard?token=<token>`. Note
that to access this page you'll also need to be running the server on localhost or
accessing from the same subnet. (For ETH network just turn on the VPN)

`MONGODB_URI` is the URI of mongodb, it can be localhost if running a local
mongo deployment or remote otherwise.
`NODE_ENV` should be set to production for deployment. This will make sure
the connections at https work and the http ones will be redirected to https.
`KEY_PATH` and `CERT_PATH` should point to the local `*.key` and `*.pem` files
for the https / TLS deployment.

Test that everything is up and running:
- `sudo node app.js`

You should be able to access the server from the usual links and the DNS redirection, 
for example: `https://idvm-infk-mtc01.inf.ethz.ch/ `

For ETH deployment, in order to add a new DNS alias, it's necessary to contact the ISG.

#### Make the server a daemon
In order to make the server run at startup and re-start in case of crashes we need
to make it a daemon. This is done by defining one in the file `utils/labelling-tool-backend.service`
- copy the service file in the service directories: `sudo cp utils/labelling-tool-backend.service /lib/systemd/system/labelling-tool-backend.service`
- make the service run at startup: `sudo systemctl enable labelling-tool-backend.service`
- reboot or alternatively reload the service via `sudo systemctl daemon-reload labelling-tool-backend.service`
- check that the server is running in the background by looking at the logs: `sudo journalctl -u labelling-tool-backend`


### Troubleshooting
Which service is running on which port: `sudo netstat -tulp` 