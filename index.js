const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path'); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); 

let volunteers = [];

app.get('/', (req, res) => {
  res.render('index', { volunteers: volunteers }); 
});

app.post('/addVolunteer', (req, res) => {
  const newVolunteer = {
    id: volunteers.length + 1, 
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    skills: req.body.skills
  };
  volunteers.push(newVolunteer);
  res.redirect('/'); 
});

app.get('/volunteers/:id', (req, res) => {
  const volunteerId = parseInt(req.params.id);
  const volunteer = volunteers.find(v => v.id === volunteerId);
  res.render('volunteers/view', { volunteer: volunteer }); 
});

app.get('/volunteers/edit/:id', (req, res) => {
  const volunteerId = parseInt(req.params.id);
  const volunteer = volunteers.find(v => v.id === volunteerId);
  res.render('volunteers/edit', { volunteer: volunteer });
});

app.post('/volunteers/edit/:id', (req, res) => {
  const volunteerId = parseInt(req.params.id);
  const updatedVolunteer = {
    id: volunteerId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    skills: req.body.skills
  };
  volunteers = volunteers.map(v => (v.id === volunteerId ? updatedVolunteer : v));
  res.redirect('/'); 
});

app.get('/volunteers/delete/:id', (req, res) => {
  const volunteerId = parseInt(req.params.id);
  volunteers = volunteers.filter(v => v.id !== volunteerId);
  res.redirect('/'); 
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
