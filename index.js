const express = require('express');
// const basicAuth = require('express-basic-auth');
const app = express()
// const port = 8080;

// Information Frank Sinatra 

const songsFrank = [
  "Ac-cent-tchu-ate the Positive", "Accidents Will Happen", 
  "Adeste Fideles", "Ad-Lib Blues",
  "An Affair to Remember (Our Love Affair)", "After You've Gone",
  "Ain't She Sweet", "Ain't Cha Ever Comin' Back?",
  "Air For English Horn", "Alice Blue Gown",
  "All Alone", "All of You",
  "All of Me", "All My Tomorrows",
  "All I Need is the Girl", "All I Do Is Dream of You",
  "All By Myself", "All the Way",
  "All the Way Home", "All This and Heaven Too",
  "All Through the Day", "And Then You Kissed Me"
];

app.get('/', (req, res) => {
  res.send(songsFrank[Math.floor(Math.random() * songsFrank.length)]);
});

app.get('/birth_date', function(req, res){
  res.send("December 12, 1915");
});

app.get('/birth_city', function(req, res){
  res.send(" Hoboken, New Jersey");
});

app.get('/wives', function(req, res){
  res.send("Nancy Barbato, Ava Gardner, Mia Farrow, Barbara Marx")
});

app.get('/picture', function(req, res){
  res.redirect("https://upload.wikimedia.org/wikipedia/commons/a/af/Frank_Sinatra_%2757.jpg"); // Redirect rasmni yuborish uchun ishlatiladi.
});

app.get('/public',(req, res) => {
  res.send("Everybody can see this page");
});

// Authorization
app.use("/protected", (req, res, next) => {
  const auth = {
    login: 'admin',
    password: 'admin'
  }
  const [, b64auth = ''] = (req.headers.authorization || '').split(' ')
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')
  if (login && password && login === auth.login && password === auth.password) {
      res.send("Welcome, authenticated client");
      return next()
  }
  res.set('WWW-Authenticate', 'Basic realm="401"')
  res.status(401).send('401 Not authorized')
})

app.listen(8080, () =>{
  console.log("server started on 8080");
},'0.0.0.0');