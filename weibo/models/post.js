var mongodb = require('./db');

function Post(username, post, time) {
	this.user = username;
	this.post = post;
	this.time = time || new Date();
}

Post.get = function(username, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}

		db.collection('posts', function(err, collection) {
			
			if (err) {
				mongodb.close();
				return callback(err);
			}

			var query = {};
			if (username) {
				query.user = username;
			}

			collection.find(query).sort({
				time: -1
			}).toArray(function(err, docs) {
				console.log(docs);
				mongodb.close();
				if (err) {
					callback(err, null);
				}
				//封装posts 为Post 对象
				var posts = [];
				docs.forEach(function(doc, index) {
					var post = new Post(doc.user, doc.post, doc.time);
					posts.push(post);
				});
				callback(null, posts);
			});
		});
	});
}

Post.prototype.save = function save(callback) {
	var post = {
		user: this.user,
		post: this.post,
		time: this.time
	};

	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		console.log('1');
		db.collection('posts', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			// 为 user 属性添加索引
			collection.ensureIndex('user', function(err, post) {});
			// 写入 post 文档
			collection.insert(post, {
				safe: true
			}, function(err, post) {
				mongodb.close();
				callback(err, post);
			});
		});
	});
}

module.exports = Post;