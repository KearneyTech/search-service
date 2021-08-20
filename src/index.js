import 'dotenv/config.js'
import cors from 'cors'
import express from 'express'

const app = express();
const port = 8081;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Received GET HTTP method - 002')
})

app.post('/', (req, res) => {
    res.send('Received POST HTTP method')
})

app.put('/', (req, res) => {
    res.send('Received PUT HTTP method')
})

app.delete('/', (req, res) => {
    res.send('Received DELETE HTTP method')
})

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`)
})
