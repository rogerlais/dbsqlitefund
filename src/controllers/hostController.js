const Host = require("../models/Host");
const nunjucks = require("nunjucks");

const index = async (req, res) => {
	const hosts = await Host.readAll();
	//* forma original 
	res.render("hosts/hosts.index.njk.html", { viewDebug: true, hosts: hosts, data : JSON.stringify( hosts ) });
};

const create = async (req, res) => {
	const { name } = req.body;
	const ret = await Host.create(name);
	res.json(ret);
};

const readAll = async (req, res) => {
	const hosts = await Host.readAllWithLogs();
	res.json(hosts);
};

const read = async (req, res) => {
	const { name } = req.query;
	const ret = await Host.readByName( name );
	res.json(ret);
};

const readById = async (req, res) => {
	const id = Number(req.params.id);
	const h = await Host.readById(id);
	if (h) {
		return res.json(h);
	} else {
		return res.status(400).json({ error: "Host not found!" });
	}
};

const remove = async (req, res) => {
	const id = Number(req.params.id);
	if (Host.remove(id)) {
		return res.status(204).send();
	} else {
		return res.status(400).json({ error: "Host not found!" });
	}
};

module.exports = { index, create, read, remove, readById, readAll };
