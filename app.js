var fs = require('fs');
var opts = require('nomnom');
var manager = require('./manager');
var library = require('./library');

opts.command('init')
	.option('name',{
		position: 1,
		required: true,
		help: 'Name of the library.  Will be used for the online editor'
	})
	.option('dir',{
		abbr: 'd',
		default: process.cwd(),
		help: 'set the library directory.  Defaults to current working directory'
	})
	.callback(library.initLibrary)
	.help('Start a new library in an empty directory.');

opts.command('newpak')
	.option('modpak',{
		abbr: 'm',
		help: 'Specify the modpak.json file to generate the pack from'
	})
	.option('config',{
		abbr: 'c',
		default: './config.json',
		help: 'Specify a config file. defaults to ./config.json'
	})
	.callback(function(opts){
		console.log(opts);
	})
	.help('Generate a new modpack.');

opts.command('addMod')
	.option('name',{
		position: 1,
		required: true,
		help: 'name of the mod'
	})
	.option('zip',{
		position: 2,
		required: true,
		help: 'zip file of the mod'
	})
	.option('dir',{
		abbr: 'd',
		default: process.cwd(),
		help: 'set the library directory.  Defaults to current working directory'
	})
	.option('config',{
		abbr: 'c',
		default: './config.json',
		help: 'Specify a config file. defaults to ./config.json'
	})
	.option('force',{
		abbr: 'f',
		flag: true,
		help: 'Force adding mod as a Forge mod, even if it\'s detected as another mod type'
	})
	.callback(manager.addMod)
	.help('Add a new mod to the library.');

opts.command('addForgeless')
	.option('name',{
		position: 1,
		required: true,
		help: 'name of the mod'
	})
	.option('zip',{
		position: 2,
		required: true,
		help: 'zip file of the mod'
	})
	.option('id',{
		position: 3,
		required: true,
		help: 'ID of non forge mod'
	})
	.option('modVersion',{
		position: 4,
		required: true,
		help: 'Mod version number.  May be internal mod version or MC version.'
	})
	.option('MCVersion',{
		position: 5,
		required: true,
		help: 'Minecraft Version number.  Determines version compatability.'
	})
	.option('deps',{
		list: true,
		abbr: "d",
		help: 'Mod dependencies.  Can specify multiple dependencies by specifing -d several times.'
	})
	.option('config',{
		abbr: 'c',
		default: './config.json',
		help: 'Specify a config file. defaults to ./config.json. Doesn\'t actually do anything yet.'
	})
	.option('force',{
		abbr: 'f',
		flag: true,
		help: 'Force adding mod as a non-forge mod, even if it\'s detected as forge compatable.'
	})
	.callback(manager.addForgeless)
	.help('Add a new mod to the library.');

opts.parse()
