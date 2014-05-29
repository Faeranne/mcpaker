var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

var Pak = require('./pak');

var library = {}

library.loadLibrary = function(dir){
	if(!fs.existsSync(path.join(dir,"library.json"))){
		throw("ERROR: Library not initalized yet.");
	}
	var json = fs.readFileSync(path.join(dir,"library.json"));
	var json = JSON.parse(json);
	library.document = json;
	return true;
}

library.initLibrary = function(opts){
	if(fs.existsSync(opts.dir)){
		if(fs.readdirSync(opts.dir).length>0){
			throw("ERROR: Directory is not empty. Cant continue");
		}
	}else{
		fs.mkdirSync(opts.dir);
	}
	var json = {}
	json.name = opts.name;
	json.version = 0;
	json.mods = {};
	json.paks = {};
	fs.writeFileSync(path.join(opts.dir,"library.json"),JSON.stringify(json))
}

library.addMod = function(id,name,dir){
	var mod = library.document.mods[id] = {};
	mod.versions = {}
	mod.id = id;
	mod.name = name;
	try{
	fs.mkdir(path.join(dir,id));
	}
	catch (e){

	}
}

library.modExists = function(id){
	if(library.document.mods[id]){
		return true;
	}else{
		return false;
	}
}

library.getMod = function(id){
	return library.document.mods[id];
}

library.addVersion = function(mod,dir){
	library.loadLibrary(dir);
	if(!library.modExists(mod.getId())){
		library.addMod(mod.getId(),mod.getName(),dir);
	}
	var doc = library.getMod(mod.getId());
	var version = doc.versions[mod.getVersion()] = {};
	version.file = path.join(mod.getId(),mod.getVersion()+path.extname(mod.getFile()));
	version.mcVersion = mod.getMCVersion();
	version.hash = getFileHash(mod.getFile());
	copyFile(mod.getFile(),version.file,function(){library.saveLibrary(dir)});
}

library.savePak = function(pak,dir){
	library.loadLibrary(dir);
	library.document.paks[pak.getId()] = pak.getPak();
	library.saveLibrary(dir);
}

library.loadPak = function(id,dir){
	library.loadLibrary(dir);
	var pak = new Pak();
	pak.setPak(library.document.paks[id]);
	return pak;
}

	

library.saveLibrary = function(dir){
	fs.writeFileSync(path.join(dir,"library.json"),JSON.stringify(library.document));
	return true;
}

var getFileHash = function(file){
	var md5 = crypto.createHash('md5')
	var s = fs.readFileSync(file);
	var digest = md5.update(s).digest('hex');
	return digest;
}

function copyFile(source, target, cb) {
  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on("error", function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function(err) {
    done(err);
  });
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}

module.exports = library;
