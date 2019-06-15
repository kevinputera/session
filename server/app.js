const express = require('express');
const cookieParser = require('cookie-parser');
const response = require('./utils/response');
const accountService = require('./services/accountService');
const { enableCors } = require('./middlewares/corsMiddleware');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(enableCors);

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const id = accountService.authenticate(username, password);

  if (id) {
    res.cookie('id', id, { httpOnly: true });
    response.ok(res, { authenticate: true });
    return;
  }
  response.ok(res, { authenticate: false });
});

app.post('/logout', (req, res) => {
  if (req.cookies.id) {
    res.clearCookie('id', { httpOnly: true });
  }
  response.ok(res, { successful: true });
})

app.get('/', (req, res) => {
  const id = req.cookies.id;
  if (!id) {
    response.ok(res, { authenticate: false });
    return;
  }
  
  const name = accountService.getName(id);
  if (name) {
    response.ok(res, { authenticate: true, name });
    return;
  }
  response.ok(res, { authenticate: false });
});

app.get('/foods', (req, res) => {
  const id = req.cookies.id;
  if (id) {
    const foods = accountService.getFood(id);
    response.ok(res, { foods });
  }
});

app.get('/movies', (req, res) => {
  const id = req.cookies.id;
  if (id) {
    const movies = accountService.getMovie(id);
    response.ok(res, { movies })
  }
})

app.listen(
  8080, 
  () => console.log('session-server started!')
);