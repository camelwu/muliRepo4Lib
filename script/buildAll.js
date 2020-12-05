const fs = require('fs-extra');
const path = require('path');
const shelljs = require('shelljs');

var root = path.join(__dirname, '..', '/packages')
 
readDirSync(root)
function readDirSync(path){
	var pa = fs.readdirSync(path);
	pa.forEach(function(ele,index){
		var info = fs.statSync(path+"/"+ele)	
		if(info.isDirectory()){
            console.log("dir: "+ele);
            shelljs.exec("yarn build "+ele);
			// readDirSync(path+"/"+ele);
		}
	})
}