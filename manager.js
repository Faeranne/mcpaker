var mod = require('./mod.js')

var addMod = function(opts){
	console.log(opts);
	var newMod = {}
	newMod.file = "./"+opts.zip
	mod.getModZip(newMod); 
	console.log(newMod);
}

module.exports.addMod = addMod;
