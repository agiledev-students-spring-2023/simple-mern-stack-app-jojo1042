require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const express = require('express') // CommonJS import style!
const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
const mongoose = require('mongoose')

const app = express() // instantiate an Express object
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })) // log all incoming requests, except when in unit test mode.  morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(cors()) // allow cross-origin resource sharing

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// connect to database
mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`)
  .then(data => console.log(`Connected to MongoDB`))
  .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

// load the dataabase models we want to deal with
const { Message } = require('./models/Message')
const { User } = require('./models/User')

// a route to handle fetching all messages
app.get('/messages', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({})
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})

// a route to handle fetching a single message by its id
app.get('/messages/:messageId', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({ _id: req.params.messageId })
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})

// route for about us
app.get('/aboutus', async (req, res) => {
  // try {

  //   res.json({
  //   name: "JoJo Yang",
  //   text: "Hello! My name is JoJo, and this is my last semester at NYU. I'm a double major in Linguistics and CS, and my interests are mostly in machine learning and AI, though I'm working in IT in the fall after I graduate. Last year I took a natural language processing course that was very challenging but super interesting, to translate English words to their IPA phonetic counterparts. Spoiler alert: not really, it turns out the inconsistencies between English spelling and pronunciation was a little too much for our model to handle. But I'd love to talk more about it! My family is originally from Sichuan, China, but I grew up in the suburbs of Boston, MA. I played a couple of instruments growing up, one that is a traditional Chinese instrument called the hammered dulcimer, as well as the clarinet. I'm also currently learning to play the guitar. My other hobbies include cooking, sleeping, listening to music every minute I'm awake (usually alternative music though who even knows what that genre is really), fencing (though I haven't been able to do that in a while), looking at photos of dogs, and playing Dungeons and Dragons with my friends on the weekend. Hmm... anything else... my favorite dog breed is the corgi, and I had a pet hamster named Athena who passed away last month :( I follow video games and movies/TV shows pretty closely, so naturally my current favorite series is the Last of Us. You should definitely go watch it if you haven't already. Severance and the White Lotus are also both excellent shows. Okay I think that is enough about me, see ya! (and go watch the Last of Us"
  // })
  // }
  // catch (err) {
  //   console.error(err)
  //   res.status(400).json({
  //     error: err,
  //     status: 'failed to get'
  //   })
  // }
  return res.json({
    name: "JoJo Yang",
    text: "Hello! My name is JoJo, and this is my last semester at NYU. I'm a double major in Linguistics and CS, and my interests are mostly in machine learning and AI, though I'm working in IT in the fall after I graduate. Last year I took a natural language processing course that was very challenging but super interesting, to translate English words to their IPA phonetic counterparts. Spoiler alert: not really, it turns out the inconsistencies between English spelling and pronunciation was a little too much for our model to handle. But I'd love to talk more about it! My family is originally from Sichuan, China, but I grew up in the suburbs of Boston, MA. I played a couple of instruments growing up, one that is a traditional Chinese instrument called the hammered dulcimer, as well as the clarinet. I'm also currently learning to play the guitar. My other hobbies include cooking, sleeping, listening to music every minute I'm awake (usually alternative music though who even knows what that genre is really), fencing (though I haven't been able to do that in a while), looking at photos of dogs, and playing Dungeons and Dragons with my friends on the weekend. Hmm... anything else... my favorite dog breed is the corgi, and I had a pet hamster named Athena who passed away last month :( I follow video games and movies/TV shows pretty closely, so naturally my current favorite series is the Last of Us. You should definitely go watch it if you haven't already. Severance and the White Lotus are also both excellent shows. Okay I think that is enough about me, see ya! (and go watch the Last of Us"
  })
  
})

// a route to handle logging out users
app.post('/messages/save', async (req, res) => {
  // try to save the message to the database
  try {
    const message = await Message.create({
      name: req.body.name,
      message: req.body.message,
    })
    return res.json({
      message: message, // return the message we just saved
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: 'failed to save the message to the database',
    })
  }
})

// export the express app we created to make it available to other modules
module.exports = app // CommonJS export style!
