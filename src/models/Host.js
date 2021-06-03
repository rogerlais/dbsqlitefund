const { conn } = require("../db");

async function create(data) {
	const sql = `
  INSERT INTO
    hosts (name, address)
  VALUES
    (?, ?)
  `;

	const db = await conn();

	const { name, address } = data;

	const { lastID } = await db.run(sql, [name, address]);

	return lastID;
}

async function readAll() {
	const sql = `
    SELECT
      *
    FROM
      hosts
  `;

	const db = await conn();

	const hosts = await db.all(sql);

	return hosts;
}

async function readByName(name) {
	const sql = `
    SELECT
      *
    FROM
      hosts
    WHERE
      name = ?
  `;

	const db = await conn();

	const hosts = await db.all(sql, [name]);

	return hosts;
}

async function readAllWithLogs() {
	const sql = `
    SELECT
      hosts.id,
      hosts.name,
      hosts.address,
      SUM(logs.transmitted) as transmitted,
      SUM(logs.received) as received
    FROM
      hosts INNER JOIN logs
    WHERE
      hosts.id = logs.host_id
    GROUP BY
      hosts.name,
      hosts.address
  `;

	const db = await conn();

	const hosts = await db.all(sql);

	return hosts;
}

async function readById(id) {
	const q = `
    SELECT
		*
	FROM
      hosts
    WHERE
      hosts.id = ?
	`;

	// const q = `
	// SELECT
	//   hosts.id,
	//   hosts.name,
	//   hosts.address,
	//   hosts.online,
	//   hosts.lastcheck
	// FROM
	//   hosts
	// WHERE
	//   hosts.id = ?
	// `;
	const db = await conn();
	//const hosts = await db.get(q, { id });
	// const ret = db.get(q, id).then((data) => {
	// 	const hosts = data;
	// 	console.log( hosts );
	// });
	const ret = db.get(q, id);
	return ret;
}

async function remove(id) {
	const q = `
    DELETE
    FROM
      hosts
    WHERE
      hosts.id = ?
	`;
	const db = await conn();
	const hosts = await db.all(q);
	return hosts;
}

module.exports = {
	create,
	readById,
	remove,
	readAll,
	readByName,
	readAllWithLogs,
};
