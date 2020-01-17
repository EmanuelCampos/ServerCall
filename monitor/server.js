const axios = require("axios");
const TotalVoice = require("totalvoice-node")
const client = new TotalVoice('keyaqui')
const servers = [
  {
    name: " Servidor 1",
    url: "http://localhost:4001",
    developer: {
      name: "Emanuel Ferreira",
      telephone: 'telefone',
    },
  },
  {
    name: " Servidor 2",
    url: "http://localhost:4003",
    developer: {
      name: "Emanuel Ferreira",
      telephone: 'telefone',
    }
  }
]

Start()

async function Start() {
  console.log("Iniciando monitoramento dos servidores")
  for (const server of servers) {
    await axios({
      url: server.url,
      method: "get"
    }).then((response) => {
      console.log(`${server.name} está no ar!`)
    }).catch(() => {
      console.log(`${server.name} está fora do ar!`)
      const message = `${server.developer.name} o ${server.name} está fora do ar, por favor faça alguma coisa o mais rápido possivel`
      const options = {
        velocidade: 2,
        tipo_voz: "br-Vitoria"
      }
      client.tts.enviar(server.developer.telephone, message, options).then(() => {
        console.log(`o desenvolvedor ${server.developer.name} já foi avisado`)
      })
    })
  }
  console.log("Finalizando monitoramento dos servidores")
};

