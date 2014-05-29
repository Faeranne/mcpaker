var fs = require('fs');

var Mod = require('./mod');
var Pak = require('./pak');
var library = require('./library');

var addMod = function(opts){
	var mod = new Mod(opts.name,opts.zip);
	mod.loadZip();
	mod.loadInfo();
	if(!mod.isForge()){
		if(!opts.force){
			throw("Not a forge mod. Use addForgeless instead.  To proceed anyways, use -f.");
		}else{
			console.warn("NOTICE: Forcing forge add will almost certanly not work, since this mod appears to lack a mcmod.info file.  Expect breakage.");
		}
	}
	mod.loadId();
	mod.loadVersion();
	mod.loadDeps();
	library.addVersion(mod,opts.dir);
}

var addForgeless = function(opts){
	var mod = new Mod(opts.name,opts.file);
	mod.loadZip();
	mod.loadInfo();
	if(mod.isForge()){
		if(!opts.force){
			throw("Forge mod found.  Use addmod instead.  To proceed anyways, use -f to force")
		}else{
			console.warn("Mod has mcmod.info.  Forcing custom options instead.");
		}
	}
	mod.setId(opts.id);
	mod.setVersion(opts.modVersion);
	mod.setMCVersion(opts.mcVersion);
	mod.setDependencies(opts.dependencies);
	library.addVersion(mod,opts.dir);
}

var createPak = function(opts){
	var pak = new Pak(opts.name,opts.id);
	library.savePak(pak,opts.dir);
}

var editPak = function(opts){
	var pak = library.loadPak(opts.id,opts.dir);
	var mod = {}
	mod.id = opts[3];
	mod.version = opts[4];
	pak.addMod(mod);
	library.savePak(pak,opts.dir);
}


module.exports.addMod = addMod;
module.exports.addForgeless = addForgeless;
module.exports.createPak = createPak;
module.exports.editPak = editPak;
