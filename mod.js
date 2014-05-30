var admZip = require('adm-zip');
var fs = require('fs');

function getExtension(filename) {
	    var ext = path.extname(filename||'').split('.');
		    return ext[ext.length - 1];
}

var Mod = function(name, file){
	this.document = {}
	var mod = this.document
	mod.name = name
	mod.file = file || ""
}

Mod.prototype.setMod = function(mod){
	this.document = mod;
	return this
}

Mod.prototype.getMod = function(){
	return this.document;
}

Mod.prototype.getName = function(){
	return this.document.name;
}

Mod.prototype.setFile = function(file){
	this.document.file = file;
	return mod;
}

Mod.prototype.getFile = function(){
	return this.document.file;
}

Mod.prototype.loadZip = function(){
	var mod = this.document;
	var file = mod.file
	mod.zip = admZip(file); 
	return mod;
}

Mod.prototype.setZip = function(file){
	var mod = this.document;
	mod.file = file
	mod.zip = admZip(file); 
	return mod;
}

Mod.prototype.getZip = function(){
	var mod = this.document;
	return mod.zip;
}

Mod.prototype.loadInfo = function(){
	var mod = this.document;
	if(!mod.zip.getEntry("mcmod.info")){
		console.log("Mod "+mod.file+" is something other than a forge mod.");
		mod.notForge = true;
		return mod
	}
	// the .replace is to fix the fact that many mods seem to put returns in the description line, breaking JSON.parse
	mod.info = JSON.parse(mod.zip.readAsText("mcmod.info").replace(/[\n\r]/g, ' '))	
	return mod;
}

Mod.prototype.getInfo = function(){
	var mod = this.document;
	return mod.info;
}

Mod.prototype.loadVersion = function(){
	var mod = this.document;
	if(mod.info.modinfoversion){
		if(mod.info.modinfoversion == 2){
			mod.version = mod.info.modlist[0].version
		}else{
			throw('unknown modinfoversion.  cannot continue');
		}
	}else{
		mod.version = mod.info[0].version
	}
	return mod;
}

Mod.prototype.setVersion = function(version){
	var mod = this.document;
	mod.version = version
	return mod;
}

Mod.prototype.getVersion = function(){
	var mod = this.document;
	return mod.version;
}

Mod.prototype.setMCVersion = function(version){
	var mod = this.document;
	mod.MCVersion;
	return mod;
}

Mod.prototype.loadMCVersion = function(){
	var mod = this.document;
	if(mod.info.modinfoversion){
		if(mod.info.modinfoversion == 2){
			mod.version = mod.info.modlist[0].mcversion
		}else{
			throw('unknown modinfoversion.  cannot continue');
		}
	}else{
		mod.MCVersion = mod.info[0].mcversion
	}
	return mod;
}


Mod.prototype.getMCVersion = function(){
	var mod = this.document;
	return mod.MCVersion;
}

Mod.prototype.loadDeps = function(){
	var mod = this.document;
	if(mod.info.modinfoversion){
		if(mod.info.modinfoversion == 2){
			mod.dependencies = mod.info.modlist[0].requiredMods
		}else{
			throw('unknown modinfoversion.  cannot continue');
		}
	}else{
		mod.dependencies = mod.info[0].requiredMods
	}
	return mod;
}

Mod.prototype.setDeps = function(deps){
	var mod = this.document;
	if(deps){
		deps.forEach(function(dep){
			if(mod.dependencies.indexOf(dep)<0){
				mod.dependencies.push(dep);
			}
		})
	}
	return mod;
}

Mod.prototype.getDeps = function(){
	var mod = this.document;
	return mod.deps;
}

Mod.prototype.loadId = function(){
	var mod = this.document;
	if(mod.info.modinfoversion){
		if(mod.info.modinfoversion == 2){
			mod.id = mod.info.modlist[0].modid
		}else{
			throw('Unknown modinfo version. cannot continue');
		}
	}else{
		mod.id = mod.info[0].modid
	}
	return mod;
}

Mod.prototype.setId = function(id){
	var mod = this.document;
	mod.id = id;
	return mod;
}

Mod.prototype.getId = function(){
	var mod = this.document;
	return mod.id;
}

Mod.prototype.isForge = function(){
	var mod = this.document;
	return !mod.notForge;
}

Mod.prototype.checkDeps = function(modList){
	var mod = this.document;
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

module.exports = Mod
