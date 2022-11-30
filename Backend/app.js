const express = require('express')
const database = require("./database")
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.APP_PORT ?? 5000

const welcome = (req, res) => {
    res.send("Welcome to my beer list");
};

const getBeers = (req, res) => {
    let sql  = "select * from beers "
    let sqlParams = []

    if(req.query.name) {
      console.log(req.query)
      sql += `where name = ?`
      sqlParams.push(req.query.name)
    }
    
    database
    .query(sql, sqlParams)
    .then(([beers]) => {
      res.json(beers)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send("Error retrieving data from database")
    })
}

const getBeersById = (req, res) => {    
    const id = parseInt(req.params.id, 10)

    database
    .query("select * from beers where id = ?", [id])
    .then(([beers]) => {
        if (beers[0] != null) {
            res.json(beers[0]);
            } else {
            res.status(404).send("Not Found");
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).send("Error retrieving data from database")
        }) 
}

const postBeer = (req, res) => {
  const {name, tagline, first_brewed, description, image_url, ph, brewers_tips, contributed_by} = req.body
  database
  .query(
    "INSERT INTO beers (name, tagline, first_brewed, description, image_url, ph, brewers_tips, contributed_by) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
    [name, tagline, first_brewed, description, image_url, ph, brewers_tips, contributed_by]
  )
  .then(([result]) => {
    console.log(result)
    res.status(201).send("Success !")
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error saving the beer")
  })
}
  
app.get("/", welcome)

app.get("/beers", getBeers)

app.get("/beers/:id", getBeersById)

app.post("/postbeer", postBeer)

app.put("/putbeer", postBeer)

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
})