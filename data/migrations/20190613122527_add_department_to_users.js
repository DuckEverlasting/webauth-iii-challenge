exports.up = function(knex) {
  return knex.schema.table('users', users => {
    users.string('department', 128)
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', users => {
    users.dropColumn('department')
  });
};