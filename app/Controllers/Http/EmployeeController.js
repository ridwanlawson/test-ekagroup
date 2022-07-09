'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Employee = use('App/Models/Employee')

class EmployeeController {
  /**
   * Show a list of all employees.
   * GET employees
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index({ response }) {
    try {
      const employees = await Employee.query()
        .select(
          'employees.id',
          'name',
          'email',
          'address',
          'phone',
          'role',
          'role_id'
        )
        .innerJoin('roles', 'employees.role_id', 'roles.id')
        .fetch()

      return response.json(employees)
    } catch (error) {
      return response.status(500).json({ message: 'There was an error' })
    }
  }

  /**
   * Create/save a new employee.
   * POST employees
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const { name, email, address, phone, role_id } = request.body

    try {
      const newEmployee = await Employee.create({
        name,
        email,
        address,
        phone,
        role_id,
      })
      return response.json(newEmployee)
    } catch (error) {
      return response.status(500).json({ message: 'There was an error' })
    }
  }

  /**
   * Update employee details.
   * PUT or PATCH employees/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const { id } = params
    const { name, email, address, phone, role_id } = request.body

    // try {
    const updatedEmployee = await Employee.query().where({ id: id }).update({
      name,
      email,
      address,
      phone,
      role_id,
    })

    return response.json({
      message: `Employee with ID: ${id} was updated successfully`,
    })
    // } catch (error) {
    // return response.status(500).json({ message: 'There was an error' })
    // }
  }

  /**
   * Delete a employee with id.
   * DELETE employees/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    const { id } = params

    try {
      await Employee.query().where({ id: id }).delete()

      return response.json({
        message: `Employee with ID: ${id} was deleted successfully`,
      })
    } catch (error) {
      return response.status(500).json({ message: 'There was an error' })
    }
  }
}

module.exports = EmployeeController
