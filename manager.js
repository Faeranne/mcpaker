var fs = require('fs');

var Mod = require('./mod.js');
var library = require('./library');

var addMod = function(opts){
	console.log(opts);
	var mod = new Mod(opts.name,opts.zip);
	mod.loadZip();
	mod.loadInfo();
	console.log(mod);
	if(!mod.isForge()){
		if(!opts.force){
			console.log("Not a forge mod. Use addForgeless instead.  To proceed anyways, use -f.");
			return 1;
		}else{
			console.log("NOTICE: Forcing forge add will almost certanly not work, since this mod appears to lack a mcmod.info file.  Expect breakage.");
		}
	}
	mod.loadId();
	mod.loadVersion();
	mod.loadDeps();
	console.log(mod.getMod());
	library.addVersion(mod,opts.dir);
}

var addForgeless = function(opts){
	console.log(opts);
	var mod = new Mod(opts.name,opts.file);
	mod.getZip();
	mod.getInfo();
	if(mod.isForge()){
		if(!opts.force){
			console.log("Forge mod found.  Use addmod instead.  To proceed anyways, use -f to force")
			return 1;
		}else{
			console.log("Mod has mcmod.info.  Forcing custom options instead.");
		}
	}
	mod.setId(opts.id);
	mod.setVersion(opts.modVersion);
	mod.setDependencies(opts.dependencies);
	console.log(mod);
}


module.exports.addMod = addMod;
module.exports.addForgeless = addForgeless;
