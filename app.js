var fs = require('fs');
var opts = require('nomnom')
opts.command('generate')
	.option('modpak',{
		abbr: 'm',
		help: 'Specify the modpak.json file to generate the pack from'
	})
	.option('destination',{
		abbr: 'd',
		help: 'set the destination folder for the modpack. defaults to the current working directory'
	})
	.callback(function(opts){
		console.log(opts);
	})
	.help('Generate a new modpack from a modpack.json file');
opts.parse()
