const express = require('express')
const app = express()
const port = 3000

 
// GET HTTP request to get all of the commandes
app.get('/commandes', (req, res) => {
  res.json(json)
})

// GET HTTP request to get one commande by its ID
app.get('/commande/:id', function (req, res) {
  res.json({
    type: 'resource',
    commande: getData(req.params.id),
  })
})

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
