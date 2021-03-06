
var mockServer = require('node-mock-server');
var path = require('path');

mockServer({
	'restPath': path.join(__dirname, '/rest'),
	'uiPath': '/',
	'title': 'Api mock server',
	'version': 1,
	'urlBase': 'http://localhost:8080',
	'urlPath': '/v1',
	'port': 8080,
	'contentType': 'application/json',
	'accessControlExposeHeaders': 'X-Total-Count',
	'accessControlAllowOrigin': '*',
	'accessControlAllowMethods': 'GET, POST, PUT, OPTIONS, DELETE, PATCH, HEAD',
	'accessControlAllowHeaders': 'origin, x-requested-with, content-type',
	'headers': {},
	'open': true,
	'dirName': __dirname
});
