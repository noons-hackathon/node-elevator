function Elevator(config){

	var currentFloor = 0;
	var personsInside = 0;

	this.getCurrentFloor = function(){
		return currentFloor;
	}

	this.getCurrentFloor = function(){
		return personsInside;
	}


}

if(typeof global != 'undefined'){
	module.exports = Elevator;
}