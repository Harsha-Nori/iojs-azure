/*const http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(`Hello World from iojs ${process.version}!\n`);
}).listen(process.env.port);*/
var port = process.env.port || 1337
var express = require('express');
var app = express();

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

app.get('/', function(req, res) {
    res.send('Hello World!');
});

/*const PORT = 8085;
const IP = '127.0.0.1';

var SteamUser = require('steam-user');
var Express = require('express');

var userOptions = {};

var user = new SteamUser(null, userOptions);
user.logOn(); // Log onto Steam anonymously

var app = new Express();
app.listen(PORT, IP);

app.use(cors);
app.use(checkLogOn);

app.get('/', function(req, res) {
	res.redirect("https://google.com");
});

app.get('/changes/:changenumber', function(req, res) {
	var changenumber = parseInt(req.params.changenumber, 10);
	if(isNaN(changenumber)) {
		sendJsonResponse(req, res, "Invalid changenumber", 400);
		return;
	}
	
	var timedOut = false;
	
	var timeout = setTimeout(function() {
		sendJsonResponse(req, res, "Steam request timed out", 504);
		timedOut = true;
	}, 15000); // 15 seconds
	
	user.getProductChanges(changenumber, function(currentChangenumber, apps, packages) {
		if(timedOut) {
			return;
		}
		
		var appData = {};
		var packageData = {};
		
		apps.forEach(function(app) {
			appData[app.appid] = app.change_number;
		});
		
		packages.forEach(function(pkg) {
			packageData[pkg.packageid] = pkg.change_number;
		});
		
		sendJsonResponse(req, res, {"success": 1, "current_changenumber": currentChangenumber, "apps": appData, "packages": packageData});
		clearTimeout(timeout);
	});
});

app.get('/info', function(req, res) {
	if(!req.query || (!req.query.apps && !req.query.packages)) {
		sendJsonResponse(req, res, "No apps or packages specified", 400);
		return;
	}
	
	var apps = req.query.apps ? req.query.apps.split(',') : [];
	var packages = req.query.packages ? req.query.packages.split(',') : [];
	
	if(apps.concat(packages).some(function(id) {
		return isNaN(id);
	})) {
		sendJsonResponse(req, res, "Invalid input ID", 400);
		return;
	}
	
	apps = apps.map(function(appid) {
		return parseInt(appid, 10);
	});
	
	packages = packages.map(function(packageid) {
		return parseInt(packageid, 10);
	});
	
	var timedOut = false;
	var timeout = setTimeout(function() {
		timedOut = true;
		sendJsonResponse(req, res, "Steam request timed out", 504);
	}, 30000); // 30 seconds
	
	user.getProductInfo(apps, packages, function(appData, packageData, unknownApps, unknownPackages) {
		if(timedOut) {
			return;
		}
		
		var outApps = {};
		var outPackages = {};
		
		var i;
		for(i in appData) {
			if(!appData.hasOwnProperty(i)) {
				continue;
			}
			
			outApps[i] = appData[i].appinfo;
			outApps[i].change_number = appData[i].changenumber;
		}
		
		for(i in packageData) {
			if(!packageData.hasOwnProperty(i)) {
				continue;
			}
			
			outPackages[i] = packageData[i].packageinfo;
		}
		
		sendJsonResponse(req, res, {"success": 1, "apps": outApps, "packages": outPackages, "unknown_apps": unknownApps, "unknown_packages": unknownPackages});
		
		clearTimeout(timeout);
	});
});

function cors(req, res, next) {
	res.set('Access-Control-Allow-Origin', '*');
	next();
}

function checkLogOn(req, res, next) {
	if(req.url != '/' && !user.steamID) {
		sendJsonResponse(req, res, "Not logged onto Steam", 503);
	} else {
		next();
	}
}

function sendJsonResponse(req, res, response, statusCode) {
	if(typeof response === 'string') {
		response = {"success": 0, "error": response};
	}
	
	if(typeof statusCode === 'number') {
		res.status(statusCode);
	}
	
	res.set('Content-Type', 'application/json');
	res.send(JSON.stringify(response, null, (req.query && req.query.prettyprint && req.query.prettyprint != 0) ? "\t" : null));
}*/
