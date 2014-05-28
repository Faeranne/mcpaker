var fs = require('fs');
var opts = require('nomnom')
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

opts.command('addmod')
	.option('name',{
		position: 0,
		required: true,
		help: 'name of the mod'
	})
	.option('zip',{
		position: 1,
		required: true,
		help: 'zip file of the mod'
	})
	.option('json',{
		abbr: 'j',
		help: 'Specify the mod.json file to generate the mod info from'
	})
	.option('config',{
		abbr: 'c',
		default: './config.json',
		help: 'Specify a config file. defaults to ./config.json'
	})
	.callback(function(opts){
		console.log(opts);
	})
	.help('Add a new mod to the library.');
opts.parse()
