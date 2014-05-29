

var Pak = function(name,id){
	this.document = {}
	this.document.name = name||"";
	this.document.id = id||"";
	this.document.mods = [];
	this.document.configs = {};
}

Pak.prototype.setPak = function(json){
	var pak = this.document;
	for(key in json){
		pak[key]=json[key];
	};
	return pak
}

Pak.prototype.getPak = function(){
	return this.document;
}

Pak.prototype.setName = function(name){
	var pak = this.document;
	pak.name = name;
	return pak;
}

Pak.prototype.getName = function(){
	var pak = this.document;
	return pak.name;
}

Pak.prototype.setId = function(id){
	var pak = this.document;
	pak.id = id;
	return pak;
}

Pak.prototype.getId = function(){
	var pak = this.document;
	return pak.id;
}

Pak.prototype.setVersion = function(version){
	var pak = this.document;
	pak.version = version;
	return pak;
}

Pak.prototype.getVersion = function(){
	var pak = this.document;
	return pak.version;
}

Pak.prototype.setMCVersion = function(version){
	var pak = this.document;
	pak.MCVersion = version;
	return pak;
}

Pak.prototype.getMCVersion = function(){
	var pak = this.document;
	return pak.MCVersion;
}

Pak.prototype.addMod = function(mod){
	var pak = this.document;
	pak.mods.push(mod);
	return pak;
}

Pak.prototype.getMods = function(mod){
	var pak = this.document;
	return pak.mods;
}

module.exports = Pak
