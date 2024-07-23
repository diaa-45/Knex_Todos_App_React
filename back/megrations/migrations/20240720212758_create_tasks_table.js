exports.up = function(knex) {
    return knex.schema.createTable('tasks', function(table) {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('description');
      table.boolean('completed').defaultTo(false);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('tasks');
  };
  