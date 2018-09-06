const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const path = require('path');

const { Person } = require('./models/Person');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB Config
const db = 'mongodb://localhost:27017/Person';

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MonboDB Connected'))
  .catch(err => console.log(err));


//ROUTES

//GET PERSON
app.get('/person', (req, res) => {
  Person.find()
    .then(persons => res.json(persons))
    .catch(err => res.status(404).json({nopersonsfount: 'No persons found'}));
});

//POST PERSON
app.post('/person', (req, res) => {
  const person = new Person({
    name: req.body.name,
    surname: req.body.surname,
    city: req.body.city,
    address: req.body.address,
    phone: req.body.phone,
  });

  person.save().then(person => res.json(person));
});

//UPDATE PERSON
app.patch('/person/:id', (req, res) => {
  Person.findByIdAndUpdate(
    req.params.id,
    {$set: {
      name: req.body.name,
      surname: req.body.surname,
      city: req.body.city,
      address: req.body.address,
      phone: req.body.phone,
    }},
    {new: true}
  )
  .then(person => res.json(person))
  .catch(err => res.status(404).json({nopersonsfount: 'No persons found'}));
})

//DELETE PERSON
app.delete('/person/:id', (req, res) => {

  Person.findByIdAndRemove(req.params.id)
    .then((person) => {
      if (person){
        return res.json({success: true})
      }
      throw new Error;
    })
    .catch(err => res.status(404).json({nopersonsfount: 'No persons found'}));
});


// SERVER
const port = 5000;

app.listen(port, () => console.log(`Server started on ${port}`))