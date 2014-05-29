var fs = require('fs');
var path = require('path');

var library = {}

library.loadLibrary = function(dir){
	if(!fs.existsSync(path.join(dir,"library.json"))){
		console.log("Library not initalized yet.");
		return false;
	}
	var json = fs.readFileSync(path.join(dir,"library.json"));
	var json = JSON.parse(json);
	library.document = json;
	return true;
}

library.initLibrary = function(opts){
	if(fs.existsSync(opts.dir)){
		if(fs.readdirSync(opts.dir).length>0){
			console.log("Directory is not empty. Cant continue");
			return 1;
		}
	}else{
		fs.mkdirSync(opts.dir);
	}
	var json = {}
	json.name = opts.name;
	json.version = 0;
	json.mods = {};
	json.packs = {};
	fs.writeFileSync(path.join(opts.dir,"library.json"),JSON.stringify(json))
}

library.saveLibrary = function(dir){
	fs.writeFileSync(path.join(dir,"library.json"),JSON.stringify(library.document));
	return true;
}

module.exports = library;
