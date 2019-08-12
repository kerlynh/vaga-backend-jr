const mongoose = require("mongoose");
// cada schema equivale collection
const Schema = mongoose.Schema;
const CampSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  nome: { type: String, required: true },
  imagem: { type: String, required: true },
  pontos: { type: Number },
  vitorias: { type: Number },
  saldogols: { type: Number },
  golsfeitos: { type: Number},
  empate: { type: Number}
})

// é a nossa coleção de camp
const campModel = mongoose.model("camp", CampSchema);

module.exports = campModel;
