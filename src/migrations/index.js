const { conn } = require("../db");

async function up() {
	const db = await conn();

	const rr = await db.get(
		`SELECT count(*) FROM sqlite_master WHERE type='table' AND name='hosts';`
	);

	if (rr["count(*)"] === 0) {
		await db.run(`
CREATE TABLE hosts (
	id        BIGINT    PRIMARY KEY,
	name      TEXT (25) CONSTRAINT [uniq-name] UNIQUE,
	IPV4      TEXT (16),
	online    BOOLEAN   DEFAULT (false),
	lastcheck DATETIME
);

  `);
	}
}

async function down() {
	const db = await conn();

	await db.run("DROP TABLE logs");

	await db.run("DROP TABLE hosts");
}

module.exports = { up, down };
