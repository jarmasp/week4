import express from 'express';
import bodyParser from 'body-parser';
import { router } from './routes/routes'

const userRouter = router

const server = express()
const port = 4040

server.use(bodyParser.json())

server.use(
  bodyParser.urlencoded({
    extended: true
  })
)

server.get('/', (req, res) => {
  res.json({ info: "it's alive!"})
})

server.use("/api/", userRouter)

server.listen(port, () => {
  console.log(`server running on ${port}`)
})

