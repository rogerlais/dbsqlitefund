//HACK Raiz e hook para todas as rotas da aplicação

const express = require("express");
const router = express.Router();
const hosts = require("./hosts");
const tests = require("./tests");

router.get("/", (req, res) => {
	console.log(req.url);
	res.redirect("/hosts");
});
router.use("/hosts", hosts);
router.use("/tests", tests);

module.exports = router;
