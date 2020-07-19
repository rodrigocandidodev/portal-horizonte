exports.up = function(knex) {
    return knex.schema.createTable('admin_histories', function(table){
        table.increments('id').primary();
        table.string('content').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

        table.integer('admin_id').unsigned();
        table.foreign('admin_id').references('id').inTable('admins');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('admin_histories');
};