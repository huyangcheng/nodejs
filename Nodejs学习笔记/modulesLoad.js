/*
	一个node.js文件就是一个模块
	require：外部获取模块
	exports：把模块接口公开
*/

var counter = require("./modules");
counter.setOutputVal(10);
counter.setIncrement(10);
counter.printNextCount();
counter.printNextCount();
counter.printNextCount();
counter.printNextCount();

/*
	require多次调用同一个模块不会重复加载
	因为Node.js会根据文件名缓存所有加载过的文件模块，并且文件名缓存是指实际文件名
*/
counter = require("./modules");
console.log("第二次调用");
counter.printNextCount();

//未使用exports将方法对外公开，外部无法调用
//counter.pritnOutputVal();

/*
	exports和module.exports 区别
	exports仅仅是module.exports的一个地址引用。nodejs只会导出module.exports的指向，如果exports指向变了，
	那就仅仅是exports不在指向module.exports，于是不会再被导出

	module.exports才是真正的接口，exports只不过是它的一个辅助工具。　最终返回给调用的是module.exports而不是exports。 
	所有的exports收集到的属性和方法，都赋值给了Module.exports。当然，这有个前提，就是module.exports本身不具备任何属性和方法。
	如果，module.exports已经具备一些属性和方法，那么exports收集来的信息将被忽略。

	exports和module.exports 覆盖
	module.exports最终会覆盖exports
	1.最好别分别定义module.exports和exports
	2.NodeJs开发者建议导出对象用module.exports,导出多个方法和变量用exports

*/
console.log("================================================")
console.log("exports与modules.exports的区别")
counter = require("./modulesDiffExports");
// counter.printNextCount();

counterObj = new counter();
counterObj.printNextCount();

/*
	module.id
　　返回string类型的模块标识，一般为完全解析后的文件名

　　module.filename
　　返回一个string类型的完全解析后文件名

　　module.loaded
　　返回一个bool类型，表示是否加载完成

　　module.parent
　　返回引用该模块的模块

　　module.children
　　返回该模块引用的所有模块对象的数组
*/
