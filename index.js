const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sqlDbFactory = require("knex");
const process = require("process");

let sqlDb;

function initSqlDB() {
	if (process.env.TEST) {
		sqlDb = sqlDbFactory({
			client: "sqlite3",
			debug: true,
			connection: {
			filename: "./other/childrensHopeDb.sqlite"
			},
			useNullAsDefault: true
		});
	} else {
		sqlDb = sqlDbFactory({
			debug: true,
			client: "pg",
			connection: process.env.DATABASE_URL,
			ssl: true
		});
	}
}

function initDb() {
	let result;
	result = sqlDb.schema.hasTable("locations").then(exists => {
		if (!exists) {
			sqlDb.schema
			.createTable("locations", table => {
				table.increments();
				table.string("name");
				table.string("img");
				table.string("description");
			})
			.then(() => {
				return Promise.all(
				_.map(locationsList, p => {
					delete p.id;
					return sqlDb("locations").insert(p);
				})
				);
			});
		} else {
			return true;
		}
	});

	if (result){
		result = sqlDb.schema.hasTable("events").then(exists => {
			if (!exists) {
				sqlDb.schema
				.createTable("events", table => {
					table.increments();
					table.string("name");
					table.string("description"),
					table.string("img"),
					table.date("date");
				})
				.then(() => {
					return Promise.all(
					_.map(eventsList, p => {
						delete p.id;
						return sqlDb("events").insert(p);
					})
					);
				});
			} else {
				return true;
			}
		});
	}else
		return false;

	if (result){
		result = sqlDb.schema.hasTable("news").then(exists => {
			if (!exists) {
				sqlDb.schema
				.createTable("news", table => {
					table.increments();
					table.string("tittle");
					table.string("body"),
					table.string("img"),
					table.date("date");
				})
				.then(() => {
					return Promise.all(
					_.map(newsList, p => {
						delete p.id;
						return sqlDb("news").insert(p);
					})
					);
				});
			} else {
				return true;
			}
		});
	}else
		return false;

	if (result){
		result = sqlDb.schema.hasTable("people").then(exists => {
			if (!exists) {
				sqlDb.schema
				.createTable("people", table => {
					table.increments();
					table.string("name");
					table.string("email"),
					table.string("description"),
					table.string("role");
					table.string("image");
				})
				.then(() => {
					return Promise.all(
					_.map(peopleList, p => {
						delete p.id;
						return sqlDb("people").insert(p);
					})
					);
				});
			} else {
				return true;
			}
		});
	}else
		return false;

	if (result){
		result = sqlDb.schema.hasTable("services").then(exists => {
			if (!exists) {
				sqlDb.schema
				.createTable("services", table => {
					table.increments();
					table.string("name");
					table.string("description"),
					table.string("image");
				})
				.then(() => {
					return Promise.all(
					_.map(servicesList, p => {
						delete p.id;
						return sqlDb("services").insert(p);
					})
					);
				});
			} else {
				return true;
			}
		});
	}else
		return false;

	if (result){
		result = sqlDb.schema.hasTable("placed").then(exists => {
			if (!exists) {
				sqlDb.schema
				.createTable("placed", table => {
					table.string("id_s");
					table.string("id_l");
				})
				.then(() => {
					return Promise.all(
					_.map(placedList, p => {
						delete p.id;
						return sqlDb("placed").insert(p);
					})
					);
				});
			} else {
				return true;
			}
		});
	}else
		return false;

	if (result){
		result = sqlDb.schema.hasTable("participates").then(exists => {
			if (!exists) {
				sqlDb.schema
				.createTable("participates", table => {
					table.string("id_p");
					table.string("id_s");
				})
				.then(() => {
					return Promise.all(
					_.map(participatesList, p => {
						delete p.id;
						return sqlDb("participates").insert(p);
					})
					);
				});
			} else {
				return true;
			}
		});
	}else
		return false;
}

const _ = require("lodash");

let serverPort = process.env.PORT || 5000;

let locationsList = require("./other/locationstoredata.json");
let eventsList = require("./other/eventstoredata.json");
let newsList = require("./other/newstoredata.json");
let peopleList = require("./other/personstoredata.json");
let servicesList = require("./other/servicestoredata.json");
let placedList = require("./other/placedstoredata.json");
let participatesList = require("./other/participatestoredata.json");

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/locations/:id", function(req, res) {
	let id = parseInt(req.params.id);
	let myQuery = sqlDb("locations").where("id",id);

	myQuery
	.then(result => {
		res.send(JSON.stringify(result));
	});
});

app.get("/locations", function(req, res) {
	let myQuery = sqlDb("locations");

	myQuery
	.then(result => {
		res.send(JSON.stringify(result));
	});
});

app.get("/news", function(req, res) {
	let myQuery = sqlDb("news");
	let sortby = _.get(req, "query.sort", "none");
	myQuery.orderBy("date","desc")

	if (sortby === "date") {
		myQuery = myQuery.orderBy("date", "asc");
	} else if (sortby === "-date") {
		myQuery = myQuery.orderBy("date","desc");
	}

	myQuery
	.then(result => {
		res.send(JSON.stringify(result));
	});
});

app.get("/services", function(req, res) {
	let myQuery = sqlDb("services");

	myQuery
	.then(result => {
		res.send(JSON.stringify(result));
	});
});

app.get("/services/:id", function(req, res) {
	let id = parseInt(req.params.id);
	let myQuery = sqlDb("services").where("id",id);

	myQuery
	.then(result => {
		res.send(JSON.stringify(result));
	});
});

app.get("/people", function(req, res) {
	let idStart = parseInt(req.params.idStart);
	let start = parseInt(_.get(req, "query.start", 1));
	let limit = parseInt(_.get(req, "query.limit", 6));
	let sortby = _.get(req, "query.sort", "none");
	let myQuery = sqlDb("people");

	if (sortby === "name") {
		myQuery = myQuery.orderBy("name", "asc");
	} else if (sortby === "-name") {
		myQuery = myQuery.orderBy("name","desc");
	}

	myQuery
		.limit(limit)
		.offset(start)
		.then(result => {
			res.send(JSON.stringify(result));
		});
});
app.get("/people/numberPeople", function(req, res) {
	let myQuery = sqlDb("people");
	

	myQuery
	.then(result => {
		res.send((JSON.stringify(result.length)));
	});
});
app.get("/people/:id", function(req, res) {
	let id = parseInt(req.params.id);
	let myQuery = sqlDb("people").where("id",id);

	myQuery
	.then(result => {
		res.send(JSON.stringify(result));
	});
});

app.get("/events", function(req, res) {
	let myQuery = sqlDb("events");

	myQuery
	.then(result => {
		res.send(JSON.stringify(result));
	});
});

app.get("/events/:id", function(req, res) {
	let id = parseInt(req.params.id);
	let myQuery = sqlDb("events").where("id",id);

	myQuery
	.then(result => {
		res.send(JSON.stringify(result));
	});
});

app.get("/locations/:id_l/services", function(req, res) {
	let id_l = parseInt(req.params.id_l);
	let myQuery = sqlDb("placed").where("id_l",id_l);

	myQuery
	.then(result => {
		res.send(JSON.stringify(result));
	});
});

app.get("/services/:id_s/locations", function(req, res) {
	let id_s = parseInt(req.params.id_s);
	let myQuery = sqlDb("placed").where("id_s",id_s);

	myQuery
	.then(result => {
		res.send(JSON.stringify(result));
	});
});


app.get("/people/:id_p/services", function(req, res) {
	let id_p = parseInt(req.params.id_p);
	let myQuery = sqlDb("participates").where("id_p",id_p);

	myQuery
	.then(result => {
		res.send(JSON.stringify(result));
	});
});


app.get("/services/:id_s/people", function(req, res) {
	let id_s = parseInt(req.params.id_s);
	let myQuery = sqlDb("participates").where("id_s",id_s);

	myQuery
	.then(result => {
		res.send(JSON.stringify(result));
	});
});

app.set("port", serverPort);

initSqlDB();
initDb();

/* Start the server on port 3000 */
app.listen(serverPort, function() {
	console.log(`Your app is ready at port ${serverPort}`);
});
