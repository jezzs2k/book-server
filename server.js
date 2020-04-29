// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

app.set('view engine', 'pug')

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.render('./index.pug');
});

app.get('todos', (req, res) =>{
  res.render('./todo/index.pug')
})
 

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
