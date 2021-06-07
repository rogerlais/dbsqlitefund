/*
Main server module.
*/

const express = require("express");
const cors = require("cors");
const nunjucks = require("nunjucks");
const routes = require("./routes");
const Migration = require("./migrations");

let app = express();

//*
// Solução deseperadora para json no body
// https://stackoverflow.com/questions/9177049/express-js-req-body-undefined
//*
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
app.use(jsonParser);

//!Nunjucks configuration
//
app.set("view engine", "njk");

//Registro de rotina global
function getVars() {
	return this.getVariables();
}
const cfg = nunjucks.configure("src/views", {
	express: app,
	autoescape: true,
	noCache: true,
});
nunjucks.defaultCfg = cfg;
cfg.addGlobal("getNunjucksVars", getVars);

app.use(cors());

const port = 3000;
//server.expressApp = this; //* a ser usado para logs posteriormente

app.use(routes);
app.use(express.static("public"));
//app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: true }));
// parse application/json
//app.use(bodyParser.json());
app.use(express.json());

(async () => {
	await Migration.up();
	//!Sempre subir o banco e checar versão do schema
	// if (!fs.existsSync(dbFile)) {
	// 	await Migration.up();
	// }
})();

app.listen(port, () => {
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
	bkUtils.logRoutes(it);
});
