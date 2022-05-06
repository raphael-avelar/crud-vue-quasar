import { createServer } from 'miragejs'

import mockUsersJSON from '@/data/mockUsers.json'

createServer({
  routes () {
    this.namespace = 'api'

    this.get('/users', () => {
      if (!window.localStorage.getItem('users')) window.localStorage.setItem('users', JSON.stringify(mockUsersJSON))

      const mockUsers = JSON.parse(window.localStorage.getItem('users'))
      return mockUsers
    })

    this.post('/users', (schema, request) => {
      const attrs = JSON.parse(request.requestBody)
      const users = JSON.parse(window.localStorage.getItem('users'))

      users.push({ ...attrs })
      window.localStorage.setItem('users', JSON.stringify(users))
    })

    this.put('/users/:id', (schema, request) => {
      const attrs = JSON.parse(request.requestBody)
      const id = parseInt(request.params.id)
      let users = JSON.parse(window.localStorage.getItem('users'))

      users = users.map(user => user.id === id ? { ...attrs } : user)
      window.localStorage.setItem('users', JSON.stringify(users))
    })

    this.delete('/users/:id', (schema, request) => {
      const id = parseInt(request.params.id)
      const users = JSON.parse(window.localStorage.getItem('users'))

      users.splice(users.findIndex(user => user.id === id), 1)
      window.localStorage.setItem('users', JSON.stringify(users))
    })
  }
})
