const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const Database = require('./Database');

const jwt = require('jsonwebtoken');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = new Database({
    user:'root',
    host: 'localhost',
    password:'',
    database:'node',
  })


var del = db.connection._protocol._delegateError;

db.connection._protocol._delegateError = function (err, sequence) {
  if (err.fatal) {
    console.trace('fatal error: ' + err.message);
  }
  return del.call(this, err, sequence);
};

app.get('/', (req, res) => {
    res.send('Hello World! This a test for TP4')
  });
  
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});
  
  

app.get(`/items`, (req, res) => {
        db.query("SELECT * FROM item ", [
        ])
          .then((result) => {
            res.json({
                result
              })
          })
          .catch((err) => {
            if (err) {
              console.log(err);
              res.status(404).send({
                statusCode: 404,
                id: 1,
                message: err.data,
                content: err
              })
            }
          })
    });


    app.get(`/commandes`, (req, res) => {
        db.query("SELECT * FROM commande ", [
        ])
          .then((result) => {
            res.json({
                result
              })
          })
          .catch((err) => {
            if (err) {
              console.log(err);
              res.status(404).send({
                statusCode: 404,
                id: 1,
                message: err.data,
                content: err
              })
            }
          })
    });



app.get(`/commandewithitems/:idCommand`, (req, res) => {
    let id = req.params.idCommand;
    db.query("SELECT i.id, libelle, tarif, quantite FROM item i INNER JOIN commande c ON i.command_id = c.id WHERE c.id = ?", [
      id,
    ])
    
      .then((result) => {
        res.json({
            type: 'collection',
            result,
          })
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          res.status(404).send({
            statusCode: 404,
            id: 1,
            message: err.data,
            content: err
          })
        }
      })
  });



  app.get(`/commandewithclients/:idCommand`, (req, res) => {
    let id = req.params.idCommand;
    db.query("SELECT id, mail, nom, created_at, livraison,montant FROM commande c WHERE c.id = ?", [
      id,
    ])
      .then((result) => {
        res.json({
            type: 'resource',
            result,
            "links": {
                "items": { "href": `http://localhost:3001/commandewithitems/`+id },
                "self": { "href": "/commandes/"+id }
            }
          })
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          res.status(404).send({
            statusCode: 404,
            id: 1,
            message: err.data,
            content: err
          })
        }
      })
  });


  app.get(`/commandes/:idCommand`, (req, res) => {
    let id = req.params.idCommand;
    db.query("SELECT * FROM commande c WHERE c.id = ?", [
      id,
    ])
      .then((result) => {
        res.json({
            result,
          })
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          res.status(404).send({
            statusCode: 404,
            id: 1,
            message: err.data,
            content: err
          })
        }
      })
  });


  app.get(`/items/:idCommand`, (req, res) => {
    let id = req.params.idCommand;
    db.query("SELECT * FROM item i WHERE i.command_id = ?", [
      id,
    ])
      .then((result) => {
        res.json({
            result
          })
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          res.status(404).send({
            statusCode: 404,
            id: 1,
            message: err.data,
            content: err
          })
        }
      })
  });


  app.post(`/commande/:idCommand`, (req, res) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    let id = req.params.idCommand;
    let nom = req.body.nom;
    let mail = req.body.mail;
    let montant=0;
    let token = jwt.sign({ id },'RANDOM_TOKEN_SECRET');
    db.query("INSERT INTO commande (id,created_at, updated_at, livraison, nom, mail, montant, remise, token, client_id, ref_paiement, date_paiement, mode_paiement, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
      id,
      today,
      today,
      today,
      nom,
      mail,
      montant,
      "NULL",
      token,
      "NULL",
      "NULL",
      today,
      "NULL",
      1
    ])
      .then((result) => {
        res.json({
            message:"Commande créée",
          })
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          res.status(404).send({
            statusCode: 404,
            id: 1,
            message: err.data,
            content: err
          })
        }
      })
  });


