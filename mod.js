var admZip = require('adm-zip');
var fs = require('fs');

var checkModDeps = function(mod,modList){
	if(mod.notForge){
		console.log('Mod is not a forge mod.  Cannot check dependencies');
		return false;
	}else{
		if(typeof mod.dependencies == 'undefined'){
			return true;
		}
		var invalid = false;
		mod.dependencies.forEach(function(mod){
			if(!modList[mod]){
				if(mod.split('@')[0] == "Forge" || mod.split('@')[0] == "mod_MinecraftForge"){
					return;
				}
				invalid = true
			}
		})
		return !invalid
	}
}

function getExtension(filename) {
	    var ext = path.extname(filename||'').split('.');
		    return ext[ext.length - 1];
}

var getModZip = function(mod){
	mod.zip = admZip(mod.file); 
	return mod;
}

var getModInfo = function(mod){
	if(!mod.zip.getEntry("mcmod.info")){
		console.log("Mod "+mod.file+" is something other than a forge mod.  Double check it\'s properly installed, otherwise, add it via the \'manager addmod\' command");
		mod.notForge = true;
		return mod
	}
	console.log(mod.zip.readAsText("mcmod.info"));
	// the .replace is to fix the fact that many mods seem to put returns in the description line, breaking JSON.parse
	mod.info = JSON.parse(mod.zip.readAsText("mcmod.info").replace(/[\n\r]/g, ' '))	
	return mod;
}

var getModVersion = function(mod){
	if(mod.info.modinfoversion){
		if(mod.info.modinfoversion == 2){
			mod.version = mod.info.modlist[0].version
		}else{
			console.error('unknown modinfoversion.  cannot continue');
		}
	}else{
		mod.version = mod.info[0].version
	}
	return mod;
}

var getModDependencies = function(mod){
	if(mod.info.modinfoversion){
		if(mod.info.modinfoversion == 2){
			mod.dependencies = mod.info.modlist[0].requiredMods
		}else{
			console.error('unknown modinfoversion.  cannot continue');
		}
	}else{
		mod.dependencies = mod.info[0].requiredMods
	}
	return mod;
}

var getModId = function(mod){
	if(mod.info.modinfoversion){
		if(mod.info.modinfoversion == 2){
			mod.id = mod.info.modlist[0].modid
		}else{
			console.error('Unknown modinfo version. cannot continue');
		}
	}else{
		mod.id = mod.info[0].modid
	}
	return mod;
}

module.exports.getModInfo = getModInfo
module.exports.getModZip = getModZip
module.exports.getModId = getModId
module.exports.checkModDeps = checkModDeps
module.exports.getMods = getMods
