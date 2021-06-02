//HACK Raiz e hook para todas as rotas da aplicação

//!
const express = require("express");
const router = express.Router();
const hosts = require("./hosts");

router.get("/", (req, res) => {
	console.log(req.url);
	res.redirect("/hosts/index");
});
router.use("/hosts", hosts);

module.exports = router;

//!
/*
const express = require("express");
const router = express.Router();
const PingController = require("../controllers/pingController");
const HostController = require("../controllers/hostController");

router.get("/hosts", HostController.index);
router.get("/hosts/logs", HostController.readAllWithLogs);
router.get("/ping/:host/:count", PingController.create);

module.exports = router;
*/