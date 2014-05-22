module.exports = function(config){
	var Elevator = require('./elevator');

	this.persons = [];
	this.elevators = [];
	for(var x=0; x<config.elevators;x++){
		var nw = new Elevator();
		this.elevators.push(nw);

	}

}