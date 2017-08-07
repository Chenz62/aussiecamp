Vincent Porter 1st July 2017

## Setup nodejs on Cloud9
nvm install 6
## Setup MongoDB on Cloud9
#### All of these steps are performed from the root folder with cd ~
<pre>
	cd ~
	mongod --version
</pre>
<h4>Remove a Previous Version</h4>
	<pre>
		sudo apt-get remove mongodb-org mongodb-org-server
		sudo apt-get autoremove
		sudo rm -rf /usr/bin/mongo*
	</pre>
<h4>Install MongoDB</h4>
	Install MongoDB v.2.6.12 (Cloud9 default)
	<pre>sudo apt-get install -y mongodb-org</pre>
	Install MongoDB v.3.4.6
	<pre>
		echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.4  multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
		sudo apt-get update
		sudo apt-get install mongodb-org mongodb-org-server
		sudo touch /etc/init.d/mongod
		sudo apt-get install mongodb-org-server
	</pre>
<h4>Create a Folder to Store Your Data</h4>
	If you already have a "data" folder, then SKIP this step, otherwise, you'll need to set one up with
	<pre>
	mkdir data
	</pre>
	<pre>
	echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
	chmod a+x mongod
	</pre>
<h4>Run MongoDB Daemon</h4>
	From 1 terminal run
	<pre>cd ~
	./mongod</pre>
	From another terminal run (this can be run inside any project folder)
	<pre>mongo</pre>
<h4>Fix MongoDB from a Bad-Shutdown</h4>
	<pre>
	killall mongod
	cd ~
	./mongod --repair
	rm -rfv data/mongod.lock
	./mongod
	</pre>
<h4>Setup Mongoose</h4>
Install latest version of mongoose currently v4.11.4

<pre>npm install mongoose --save</pre>
setup app.js with mongoose
<pre>
var mongoose = require("mongoose");
// replaces the deprecated mongoose.Promise with the JavaScript global.Promise library
mongoose.Promise = global.Promise;
// add useMongoClient:true to remove the open() =>v4.11.0 deprecation warning
mongoose.connect("mongodb://localhost/yelpcamp", { useMongoClient: true });
</pre>
# To-Do-List
- [ ]
- [ ]
- [ ]
