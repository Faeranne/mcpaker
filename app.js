#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
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
	.option('name',{
		position: 1,
		required: true,
		help: 'Name of the new modpack.  This is what users will see.'
	})
	.option('id',{
		position: 2,
		required: true,
		help: 'Interal id of the modpack.  This should have only lowercase letters, numbers, dashes, and underscores.'
	})
	.option('dir',{
		abbr: 'd',
		default: process.cwd(),
		help: 'set the library directory.  Defaults to current working directory'
	})
	.callback(manager.createPak)
	.help('Generate a new modpack.');

opts.command('addpakmod')
	.option('id',{
		position: 1,
		required: true,
		help: 'Interal id of the modpack.  This should have only lowercase letters, numbers, dashes, and underscores.'
	})
	.option('command',{
		position: 2,
		required: true,
		choices:[
			'addMod',
			'rmMod',
			'addConfig',
			'rmConfig',
			'setForge'
		],
		help: 'Command to execute on pak.' 
	})
	.option('dir',{
		abbr: 'd',
		default: process.cwd(),
		help: 'set the library directory.  Defaults to current working directory'
	})
	.callback(manager.addPakMod)
	.help('Generate a new modpack.');

opts.command('release')
	.option('id',{
		position: 1,
		required: true,
		help: 'Interal id of the modpack.  This should have only lowercase letters, numbers, dashes, and underscores.'
	})
	.option('dest',{
		default: path.join(process.cwd(),'dest'),
		help: "Destination for the release"
	})
	.option('dir',{
		abbr: 'd',
		default: process.cwd(),
		help: 'set the library directory.  Defaults to current working directory'
	})
	.callback(manager.release)
	.help("Release the modpak.  This will auto increment the version number");

opts.command('dev')
	.option('id',{
		position: 1,
		required: true,
		help: 'Interal id of the modpack.  This should have only lowercase letters, numbers, dashes, and underscores.'
	})
	.option('dest',{
		default: path.join(process.cwd(),'dest'),
		help: "Destination for the release"
	})
	.option('dir',{
		abbr: 'd',
		default: process.cwd(),
		help: 'set the library directory.  Defaults to current working directory'
	})
	.callback(manager.dev)
	.help("Release Test version of the package.  Useful for testing a modpak will download correctly before releasing to your users.");

	


opts.command('addmod')
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
	.option('server',{
		flag: true,
		help: 'Specifies the mod is server side only.  Keeps it from being added to a release package'
	})
	.option('client',{
		flag: true,
		help: 'Specifies the mod is client side only.  Keeps it from being added to a server push'
	})
	.callback(manager.addMod)
	.help('Add a new mod to the library.');

opts.command('addforgeless')
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
	.option('mcVersion',{
		position: 5,
		required: true,
		help: 'Minecraft Version number.  Determines version compatability.'
	})
	.option('deps',{
		list: true,
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
	.option('dir',{
		abbr: 'd',
		default: process.cwd(),
		help: 'set the library directory.  Defaults to current working directory'
	})
	.callback(manager.addForgeless)
	.help('Add a new mod to the library.');

opts.command('editmod')
	.option('id',{
		position: 1,
		required: true,
		help: 'ID of mod'
	})
	.option('version',{
		position: 2,
		required: true,
		help: 'Mod version number.'
	})
	.option('zip',{
		help: 'zip file of the mod'
	})
	.option('name',{
		help: 'name of the mod'
	})
	.option('mcVersion',{
		help: 'Add another MC version to the mod.  This allows the mod to be used with multiple versions of MC.'
	})
	.option('deps',{
		list: true,
		help: 'Mod dependencies.  Can specify multiple dependencies by specifing -d several times.'
	})
	.option('dir',{
		abbr: 'd',
		default: process.cwd(),
		help: 'set the library directory.  Defaults to current working directory'
	})
	.callback(manager.editMod)
	.help('Edit a mod in the library.');

opts.parse()
