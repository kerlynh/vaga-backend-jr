const { connect } = require('./CampRepository')
const campsModel = require('./CampSchema')

connect() // para conectar no mongoDB

const getAll = () => {
  return campsModel.find((error, camps) => {
    return camps
  })
}

const getById = (id) => {
  return campsModel.findById(id) 
}

const add = (camp) => {
  const novacamp = new campsModel(camp)
  return novacamp.save()
}

const remove = (id) => {
  return campsModel.findByIdAndDelete(id)
}

const update = (id, camp) => {
  return campsModel.findByIdAndUpdate(
    id,
    { $set: camp },
    { new: true }, 
  )
}

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update
}