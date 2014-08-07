var settings = require('../settings'),
	MongoDB = require('mongodb'),
	Db = MongoDB.Db,
	Connection = MongoDB.Connection,
	Server = MongoDB.Server;
module.exports = new DB(settings.db, new Server(settings.host, Connection.DEFAULT_ PORT, {}));