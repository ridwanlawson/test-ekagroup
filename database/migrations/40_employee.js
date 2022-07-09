'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmployeeSchema extends Schema {
  up() {
    this.create('employees', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('email').notNullable()
      table.string('address').notNullable()
      table.specificType('phone', 'bigint(10)').notNullable()
      table.integer('role_id', 10).unsigned().references('roles.id')
      table.timestamps()
    })
  }

  down() {
    this.drop('employees')
  }
}

module.exports = EmployeeSchema
