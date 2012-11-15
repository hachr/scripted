/*******************************************************************************
 * @license
 * Copyright (c) 2012 VMware, Inc. All Rights Reserved.
 * THIS FILE IS PROVIDED UNDER THE TERMS OF THE ECLIPSE PUBLIC LICENSE
 * ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THIS FILE
 * CONSTITUTES RECIPIENTS ACCEPTANCE OF THE AGREEMENT.
 * You can obtain a current copy of the Eclipse Public License from
 * http://www.opensource.org/licenses/eclipse-1.0.php
 *
 * Contributors:
 *     Andrew Eisenberg
 *     Andrew Clement
 *     Kris De Volder
 *     Christopher Johnson
 ******************************************************************************/
/*global require*/

// Entry point for the node app
// Basic construction.  Some requestHandlers are used for
// specific actions. Other URLs are assumed to be static content.

var server = require("./server");
var router = require("./router");
var servlets = require("./servlets");

var requestHandlers = require("./requestHandlers");

//require("./servlets/hello");
require("./servlets/listFiles");
require("./servlets/jsdepend-servlet");
require("./servlets/exec-servlet");
require("./servlets/kill");

// Request to read a file (returns contents)
servlets.register("/get", requestHandlers.get);
// Request to save a file
servlets.register("/put", requestHandlers.put);
// Request information about a file/directory
servlets.register("/fs_list", requestHandlers.fs_list);

var host = process.argv[2] || process.env.IDE_HOST || 'localhost';
var port= process.argv[3] || process.env.IDE_PORT || 7261;
var path = process.argv[4] || process.env.IDE_PATH || '~/';

console.log('host: ' + host);
console.log('port: ' + port);
console.log('path: ' + path);

requestHandlers.path(path);
server.start(host,port,router.route, servlets.lookup);
