# labelling-tool


# Virtual server installation:
Mongodb:
- Install mongodb via: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/ 
- Start mongo daemon: `sudo systemctl start mongod`
- Check daemon is running: `sudo systemctl status mongod`
- Automatically load daemon every startup: `sudo systemctl enable mongod`
 
Serve the react side (client):

- install Yarn following https://classic.yarnpkg.com/en/docs/install/#debian-stable (may be needed to 
insert `alias node=nodejs` in your `.bashrc`)
- in the client directory (`cd client`)
- Build the react for production: `npm run build`
- install gserve globally: `sudo npm install -g serve`
- to test eveything is running correctly: `sudo env "PATH=$PATH" serve -s build -l 443`