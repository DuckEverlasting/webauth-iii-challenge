const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById
}

async function add(user) {
  const [id] = await db('users')
    .insert(user);
  return findById(id);
}

function find() {
  return db('users')
    .select('id', 'username', 'password');
}

function findBy(key, value, first = false) {
  return db('users')
    .where(key, value)    
}

function findById(id) {
  return db('users')
    .where('id', id)
    .first();
}