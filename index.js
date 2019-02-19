//import Express from '/node_modules/express.js'
let express = require('express')
let server = express()
let PORT = 3000

server.get('/', (req, res, next) => {
  //req is the request information from whoever made the request
  //res is all the tools at our disposal on how we can respond to the request
  //next passes the request/other information to the next matching route
  res.send({
    message: "Hello from your first API"
  })
})

let dogs = [{
  name: "champ",
  color: ["black", "white"],
  age: 3.5
}, {
  name: "bilbo waggons",
  color: ["black", "grey", "white"],
  age: 10
}, {
  name: 'leo',
  color: ["brown"],
  age: 3
}]

server.get('/api/dogs', (req, res, next) => {
  //between comment lines is query parameter handling
  //eg: localhost:3000/api/dogs?age=3
  //-----------------------------------------------------
  if('age' in req.query) {
    let age = req.query.age
    let dogsByAge = dogs.filter(dog => dog.age >= age)
    return res.send({
      count: dogsByAge.length,
      age,
      dogs: dogsByAge
    })
  }
  //-----------------------------------------------------
  res.send({
    count: dogs.length,
    dogs
  })
})

// the colon infront of word signifies that that word is a parameter
server.get('/api/dogs/:number', (req, res, next) => {
  let index = req.params.number - 1
  let dog
  if(dog = dogs[index]) {
    return res.send({
      dogNumber: req.params.number,
      dog
    })
  }
  next()
})

//get all dogs with a certain color
server.get('/api/dogs/:color', (req, res, next) => {
  let color = req.params.color
  let coloredDogs = dogs.filter(dog => {
    return dog.color.includes(color)
  })
  if (coloredDogs.length) {
    return res.send({
      count: coloredDogs.length,
      color,
      dogs: coloredDogs
    })
  }
  next()
})





//tells the server to listen to all requests at this port
server.listen(PORT, () => {
  console.log('server is running on port', PORT)
})