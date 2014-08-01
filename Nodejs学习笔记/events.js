/*
	调取events模块，获取events.EventEmitter对象并将其实例化
 */

var EventEmitter = require("events").EventEmitter; 
var ee = newEventEmitter(); 
/*     
	on方法：为事件注册一个监听     
	参数1：event 字符串 事件名     参数2：回调函数
	emitter.on(event, listener); 
*/

ee.on("some_events", function(foo, bar) {
	console.log("some_events监听事件，参数foo=" + foo + ",bar=" + bar);
})


/*
	emit方法:调用指定事件。
	参数1：事件名；
	参数N：当前事件传递给回调函数的参数。
	返回值：该事件是否有监听的布尔值。
	emitter.emit(event, [arg1],[arg2],[..]);
*/
console.log("开始调用事件了！");
var isExist = ee.emit("some_events", "胡", "杨成");
console.log(isExist);
console.log("==============================================================");

/*
	once方法：为事件注册一次性的监听，当被调用过后将移除该事件
	参数1：event 字符串 事件名
	参数2：回调函数
	emitter.once(event, listener);
*/
ee.once("once_events", function(foo, bar) {
	console.log("调用了once_events事件，foo=" + foo + ",bar=" + bar);
});
isExits = ee.emit("once_events", "hu", "yangcheng1");
console.log(isExist);
isExits = false;
var isExits = ee.emit("once_events", "hu", "yangcheng2");
console.log(isExits);
console.log("==============================================================");

/*
	removeListener方法：为指定事件移除指定监听
	参数1：事件名
	参数2：监听函数对象引用，需传递引用！
	emitter.removeListener(event, listener);
*/

var listener1 = function(foo, bar) {
	console.log("调用了listener1事件，foo=" + foo + ",bar=" + bar);
}

function listener2(foo, bar) {
	console.log("调用了listener2事件，foo=" + foo + ",bar=" + bar);
}

ee.on("removeListener_events", listener1);
ee.on("removeListener_events", listener2);
//调用removeListener_events事件会触发所有该事件的监听，触发顺序按照注册顺序
console.log("第一次调用removeListener_events事件");
ee.emit("removeListener_events", "h1", "yc1");
//移除监听1
ee.removeListener("removeListener_events", listener1);
console.log("移除事件1后调用");
ee.emit("removeListener_events", "h1", "yc1");
console.log("==============================================================");

/*
	removeAllListeners方法：移除指定事件/所有事件的所有监听
	参数1：事件名，可选不填将移除所有事件的所有监听
	emitter.removeAllListeners([event]);
*/

var listener3 = function() {
	console.log("listener3被调用了");
}
ee.on("removeListener_events", listener3);
ee.emit("removeListener_events");
//移除所有removeListener_events事件监听
ee.removeAllListeners("removeListener_events");
console.log(ee.emit("removeListener_events"));
console.log("some_events事件是否存在：" + ee.emit("some_events"));
//移除所有事件的监听
ee.removeAllListeners();
console.log("移除了所有事件的监听");
console.log("some_events事件是否存在：" + ee.emit("some_events"));
console.log("");
console.log("==============================================================");

/*
	listeners方法：返回指定事件的所有监听集合
	emitter.listeners(event);
	event参数:事件名
*/
ee.on("some_events", listener1);
ee.on("some_events", listener2);
ee.on("some_events", listener3);
var listeners = ee.listeners("some_events");
console.log("some_events事件的监听有" + listeners.length + "个");
for (var i = 0; i < listeners.length; i++) {
	console.log(listeners[i])
};

/*
	setMaxListeners方法：设置事件的监听上限，nodejs默认为10
	emitter.setMaxListeners(n);
	n参数：数值，事件的最大监听数。
*/

ee.setMaxListeners(20);

for (var i = 0; i < 10; i++) {
	ee.on("some_events", function() {
		console.log("我是循环事件" + i);
	});
};

/*
	其他方法：
		emitter.defaultMaxListeners(n)：设置所有事件的最大监听数
		emitter.listenerCount(emitter, event)：返回指定事件的监听数
*/
ee.on("error",function(){
	console.log("报错了！");
});