var dash = require('underscore');
var util = require('util');

function inspectToConsole(offender) { //
	offender = dash.flatten(arguments, true);
	dash.each(offender, function(item) {
			console.log(util.inspect(item, false, null)); //
			console.log(); //
		});
}

function inspectAndKill(offender) {
	offender = dash.flatten(arguments, true);
	inspectToConsole(offender); //
	process.exit();
}

//console.Console.iprototype.kill = inspectAndKill; //
global.pk = inspectAndKill;
global.i = inspectToConsole;
////console.Console.prototype.inspect = inspectToConsole; //
//
module.exports = {
	i: inspectToConsole,
	pk: inspectAndKill
};
