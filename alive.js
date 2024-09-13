const express = require('express')
const http = require('http')
const PORT = 5000

const app = express()
app.get('/', (req, res) => {
  res.send('Bot Is Alive ✅')
})

function alive() {
  const server = http.createServer(app)
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}\nhttp://localhost:${PORT}`)
  })
}

module.exports = alive
