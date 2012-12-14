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
 *     Kris De Volder - initial API and implementation
 ******************************************************************************/
 
/*global console require*/ 

var servlets = require('../servlets');
var makeRequestHandler = require('./servlet-utils').makeRequestHandler; 

var cpExec = require('child_process').exec;

//default path so people can't access outside of this
var rootPath = "/home/pi/depot/node";

function path(root){
	console.log("setting the path: " + root);
	if(!!root){
		rootPath = root;
		console.log('new root is: ' + rootPath);
	}
}

function exec(cmd, callback, errback) {

	//cmd looks like this:
	// {cmd: "ls -la", ...other options to pass to the nodejs exec function...}

	var options = cmd; 
	cmd = cmd.cmd;
	if (options['cwd'] == '.') {
		options['cwd'] = rootPath;
	}

	/*var process = */cpExec(cmd, options, callback);
}
exec.remoteType = ['JSON', 'callback'];

servlets.register('/exec', makeRequestHandler(exec));

exports.path = path;