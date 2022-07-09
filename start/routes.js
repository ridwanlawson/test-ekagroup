'use strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', (req, res) => 'Welcome to the Employees CRUD API')

Route.group(() => {
  Route.get('/employees', 'EmployeeController.index')
  Route.post('/employees', 'EmployeeController.store')
  Route.patch('/employees/:id', 'EmployeeController.update')
  Route.delete('/employees/:id', 'EmployeeController.destroy')
}).prefix('api/v1')
