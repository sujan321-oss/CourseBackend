
import express from "express" 
import router from "./router"
import cors from 'cors';

const app = express()
const PORT: number = Number(process.env.PORT) || 8001;


app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

app.use(router);

// now create the api endpoints for handling  databases

// course  creation 

//  folder creation 

//   uploading the videos inside the particular  folder



app.listen(PORT,()=>{
    console.log("Server is Listening in PORT " +PORT)
})


