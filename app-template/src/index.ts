import * as express from "express"

const PORT_NUMBER = 8080

const app = express()

app.get("/", (request, response) => {
  response.sendStatus(200)
})

app.listen(PORT_NUMBER, () => {
  console.log(`App listening on port ${PORT_NUMBER}`)
})
