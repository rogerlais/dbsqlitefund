//HACK Raiz e hook para todas as rotas da aplicação

const express = require("express");
const router = express.Router();
const hosts = require("./hosts");

router.get("/", (req, res) => {
	console.log(req.url);
	res.redirect("/hosts/index");
});
router.use("/hosts", hosts);

module.exports = router;
