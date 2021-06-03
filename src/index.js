/*
Main server module.
*/

const fs = require("fs");
const express = require("express");
const cors = require("cors");
const nunjucks = require("nunjucks");
const routes = require("./routes");
const Migration = require("./migrations");
const { dbFile } = require("./db");
const { Server } = require("http");

let app = express();

app.set("view engine", "njk");
nunjucks.configure("src/views", {
	express: app,
	autoescape: true,
	noCache: true,
});
app.use(cors());

const port = 3000;
//server.expressApp = this; //* a ser usado para logs posteriormente

app.use(routes);
app.use(express.static("public"));

(async () => {
	await Migration.up();
	//!Sempre subir o banco e checar versão do schema
	// if (!fs.existsSync(dbFile)) {
	// 	await Migration.up();
	// }
})();

var itself = app.listen(port, ( ) => {
	let it = app; //inserida no escopo com a atribuição let acima
	//console.log( it );
	console.log("Server running");
	console.log("Rotas presentes nesta aplicação:");
	if (app._router.stack) {
		app._router.stack.forEach(function (r) {
			if (r.route && r.route.path) {
				console.log(r.route.path);
			}
		});
	} else {
		console.log("Nenhum registrada");
	}
	const bkUtils = require("./bk_utils");
	bkUtils.logRoutes( it );
});
