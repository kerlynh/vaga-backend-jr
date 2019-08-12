const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const controller = require('./CampController')

const servidor = express()
servidor.use(cors())
servidor.use(bodyParser.json())

// ------ Retorna todos os dados cadastrados no banco -------
servidor.get('/clubes', (request, response) => {
  controller.getAll()
    .then(camps => response.send(camps))
})

// ------ Retonar dados pelo ID-------
servidor.get('/clubes/:id', (request, response) => {
  const id = request.params.id
  controller.getById(id)
    .then(camp => {
      if(!camp){ 
        response.sendStatus(404)
      } else {
        response.send(camp)
      }
    })
    .catch(error => {
      if(error.name === "CastError"){
        response.sendStatus(400)
      } else {
        response.sendStatus(500) 
      }
    })
})

// ------ Inserir dados -------
servidor.post('/clubes', (request, response) => {
  controller.add(request.body)
    .then(camp => {
      const _id = camp._id
      response.send(_id)
    })
    .catch(error => {
      if(error.name === "ValidationError"){
        response.sendStatus(400)
      } else {
        response.sendStatus(500)
      }
    })
})

// ------ Atualizar dados -------
servidor.patch('/clubes/:id', (request, response) => {
  const id = request.params.id
  controller.update(id, request.body)
    .then(camp => {
      if(!camp) { response.sendStatus(404) } 
      else { response.send(camp) }
    })
    .catch(error => {
      if(error.name === "MongoError" || error.name === "CastError"){
        response.sendStatus(400)
      } else {
        response.sendStatus(500)
      }
    })
})

// ------ Remover dados do banco -------
servidor.delete('/clubes/:id', (request, response) => {
  controller.remove(request.params.id)
    .then(camp => {
      if(camp === null || camp === undefined){ 
        response.sendStatus(404) 
      } else {
        response.sendStatus(204)
      }
    })
    .catch(error => {
      if(error.name === "CastError"){
        response.sendStatus(400)
      } else {
        response.sendStatus(500)
      } 
    })
})


servidor.listen(3000)
console.log("servidorzinho rodando na porta 3000")
