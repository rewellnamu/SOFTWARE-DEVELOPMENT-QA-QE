import { setupAliases } from 'import-aliases'
setupAliases()

import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import booksRouter from '@app/routes/routes'
import authroutes from '@app/routes/authroutes'

dotenv.config();

const app = express()

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3001'],
  methods:"DELETE ,GET,POST,PUT",
  credentials:  true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



const port = process.env.PORT;

app.use('/api', booksRouter);
app.use('/api',authroutes);




app.listen(port, () => {
  console.log(`Server is running on port ${port}😊😊`)
})
 


// app.use(cors({
//   origin: 'http://localhost:3000',
//methods: 'GET,POST,PUT,DELETE',
// credentials: true}))