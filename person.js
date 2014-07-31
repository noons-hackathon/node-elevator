function Person(config){
	this.id = config.id;
	this.name = config.name;
}
Person.prototype.sayHello = function(){
	console.log('Hello! My name is '+this.name);
}

if(typeof global != 'undefined'){
	module.exports = Person;
}