
// const Host = require("../models/Host");
let nunjucks = require("nunjucks");

const index = async (req, res) => {
	const hosts = [
		{
			v1: "v1",
			v2: "v2"
		}
	];
	//* forma original 
	//res.render("hosts/_njk_index.html", { hosts });
	console.log( "TESTESTSTESTES");
	const h = nunjucks.render("tests/_njk_index_tests.html", { viewDebug: true, hosts: hosts, data : JSON.stringify( hosts ) });
	res.send( h );
};

const create = async (req, res) => {
	const { name } = req.query;
	const ret = await Host.create(name);
	res.json(ret);
};

const readAll = async (req, res) => {
	const hosts = await Host.readAllWithLogs();
	res.json(hosts);
};

const read = async (req, res) => {
	const { name } = req.query;
	//const ret = Host.read( name );
	const ret = "Host.read( name )";
	res.json(ret);
};

const readById = (req, res) => {
	const id = Number(req.params.id);
	const h = Host.readById(id);
	if (h) {
		return res.json(h);
	} else {
		return res.status(400).json({ error: "Host not found!" });
	}
};

const remove = (req, res) => {
	const id = Number(req.params.id);
	if (Host.remove(id)) {
		return res.status(204).send();
	} else {
		return res.status(400).json({ error: "Host not found!" });
	}
};

module.exports = { index, create, read, remove, readById, readAll };
