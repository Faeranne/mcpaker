var Mod = require('./mod.js')

var addMod = function(opts){
	console.log(opts);
	var mod = new Mod(opts.name,opts.file);
	mod.getZip();
	mod.getInfo();
	if(mod.notForge){
		console.log("Not a forge mod. Only forge mods are supported at this time.");
		return 1;
	}
	mod.getId();
	mod.getVersio();
	mod.getDeps();
	console.log(mod);
}

module.exports.addMod = addMod;
