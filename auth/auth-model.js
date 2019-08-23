const db = require("../database/dbConfig");

module.exports = {
  add,
  findBy
};

function add(user) {
  db("users").insert(user);
}

function findBy(filter) {
  return db("users").where(filter);
}
