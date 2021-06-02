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

async function readByNameAddress(name, address) {
	const sql = `
    SELECT
      *
    FROM
      hosts
    WHERE
      name = ? AND address = ?
  `;

	const db = await conn();

	const hosts = await db.all(sql, [name, address]);

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

async function read(id) {
	const q = `
    SELECT
      hosts.id,
      hosts.name,
      hosts.address,
	  hosts.online, 
	  hosts.lastcheck
    FROM
      hosts
    WHERE
      hosts.id = ?
	`;
	const db = await conn();
	const hosts = await db.all(q);
	return hosts;
}

async function remove( id ){
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

};

module.exports = { create, read, remove, readAll, readByNameAddress, readAllWithLogs };
