import { createServer, Model } from 'miragejs'
import mockUsersJSON from '@/data/mockUsers.json'

const REQUEST_MS = 1000 // Simular carregamento

createServer({
  models: {
    user: Model
  },

  seeds (server) {
    server.db.loadData({
      users: JSON.parse(JSON.stringify(mockUsersJSON))
    })
  },

  routes () {
    this.namespace = 'api'

    this.get('/users', () => {
      return this.schema.all('user')
    }, { timing: REQUEST_MS })

    this.get('/users/:id', (schema, request) => {
      const id = request.params.id
      return schema.find('user', id)
    }, { timing: REQUEST_MS })

    this.post('/users', (schema, request) => {
      const user = JSON.parse(request.requestBody)
      return schema.create('user', user)
    }, { timing: REQUEST_MS })

    this.put('/users/:id', (schema, request) => {
      const id = request.params.id
      const user = schema.find('user', id)
      const requestBody = JSON.parse(request.requestBody)

      return user.update(requestBody)
    }, { timing: REQUEST_MS })

    this.delete('/users/:id', (schema, request) => {
      const id = request.params.id
      return schema.find('user', id).destroy()
    }, { timing: REQUEST_MS })
  }
})
