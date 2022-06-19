const express = require('express')
var bodyParser = require('body-parser')
const port = 5000 ;
const app = express();
const db = require('./Config/dbase')
const cookieParser = require('cookie-parser');

require('dotenv').config()
const cors = require('cors');

// parse application/json 
app.use(bodyParser.json())

// to read body from request
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())


app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
 

app.get("/getfile/:document", function (req, res) {
    res.sendFile(__dirname + "/upload/" + req.params.document);
  });
  
  app.get("/file/:avatar", function (req, res) {
    res.sendFile(__dirname + "/upload/" + req.params.avatar);
});

app.get('/',(req,res)=>{res.send('Ghofrane PFE')})

const demandeRouter=require('./Routers/demandeRouter')
app.use('/demande',demandeRouter)

const userRouter=require('./Routers/userRouter');
app.use('/user',userRouter)

const echeancierRouter=require('./Routers/echeancierRouter');
app.use('/echeancier',echeancierRouter)

const clientRouter=require('./Routers/clientRouter');
app.use('/client',clientRouter)

const comiteRouter=require('./Routers/comiteRouter');
app.use('/comite',comiteRouter)


// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req,res, next) {
    let err = new Error();
       err.status = 404;
       next(err);
   });

   // handle errors
   app.use(function(err, req, res, next) {
    console.log(err);
     if(err.status === 404)
      res.status(404).json({message: " Path Not found"});
     else 
       res.status(500).json({message: "Something looks wrong "});
   });



app.listen(port,console.log(`server running at http://localhost:${port}`))