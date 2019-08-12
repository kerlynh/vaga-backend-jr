const mongoose = require("mongoose");
// string de conexão:
// mongodb://dominio:porta/nome_database
const MONGO_URL = "mongodb://localhost:27017/campeonato";

function connect () {
  mongoose.connect(MONGO_URL,
    { useNewUrlParser: true },
    function (error) {
      if(error) {
        console.error("Erro: ", error)
      } else {
        console.log("Banco OK!")
      }
    }
  );
}

module.exports = { connect }

