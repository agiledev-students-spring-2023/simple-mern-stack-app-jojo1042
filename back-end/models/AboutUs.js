const mongoose = require('mongoose')
const Schema = mongoose.Schema

const aboutSchema = new Schema(
  {
    name: "JoJo Yang",
    text: "Hello! My name is JoJo, and this is my last semester at NYU. I'm a double major in Linguistics and CS, and my interests are mostly in machine learning and AI, though I'm working in IT in the fall after I graduate. Last year I took a natural language processing course that was very challenging but super interesting, to translate English words to their IPA phonetic counterparts. Spoiler alert: not really, it turns out the inconsistencies between English spelling and pronunciation was a little too much for our model to handle. But I'd love to talk more about it! My family is originally from Sichuan, China, but I grew up in the suburbs of Boston, MA. I played a couple of instruments growing up, one that is a traditional Chinese instrument called the hammered dulcimer, as well as the clarinet. I'm also currently learning to play the guitar. My other hobbies include cooking, sleeping, listening to music every minute I'm awake (usually alternative music though who even knows what that genre is really), fencing (though I haven't been able to do that in a while), looking at photos of dogs, and playing Dungeons and Dragons with my friends on the weekend. Hmm... anything else... my favorite dog breed is the corgi, and I had a pet hamster named Athena who passed away last month :( I follow video games and movies/TV shows pretty closely, so naturally my current favorite series is the Last of Us. You should definitely go watch it if you haven't already. Severance and the White Lotus are also both excellent shows. Okay I think that is enough about me, see ya! (and go watch the Last of Us"
  },
)

// create mongoose Model
const AboutUs = mongoose.model('AboutUs', aboutSchema)

// export the model so other modules can import it
module.exports = {
  AboutUs,
}