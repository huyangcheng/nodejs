var counter = 0;
exports.printNextCount = function() {
	counter += 2;
	console.log(counter)
}

module.exports = function() {
	counter += 10;
	this.printNextCount = function() {
		console.log(counter);
	}
}


var isEq = (exports === module.exports);
console.log(module.parent);