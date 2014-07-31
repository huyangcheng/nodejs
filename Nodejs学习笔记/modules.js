/*
	计数器
*/
var outputVal = 0; //输出变量
var increment = 1; //增量

function setOutputVal(val) {
	outputVal = val;
}

function setIncrement(incrementVal) {
	increment = incrementVal;
}


function printOutoutVal() {
	console.log(outputVal);
}

function printNextCount() {
	outputVal += increment;
	console.log(outputVal);
}
exports.setOutputVal = setOutputVal;
exports.setIncrement = setIncrement;
module.exports.printNextCount = printNextCount;
console.log(exports === module.exports);