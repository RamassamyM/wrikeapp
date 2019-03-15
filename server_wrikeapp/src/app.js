const { GraphQLServer } = require('graphql-yoga')
const mongoose = require('mongoose')
require('dotenv').config()
const resolvers = require('./resolvers')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error"))
db.once("open", function(callback){
  console.log("Connection Succeeded")
})

// Autre possibilité
// const db = "Put your database URL here.";
// mongoose
//   .connect(
//     db,
//     {
//       useCreateIndex: true,
//       useNewUrlParser: true
//     }
//   )
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err));

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: context => ({ request: context.request })
})

const options = {
  port: process.env.PORT || 5500,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground'
}

server.start(options, ({ port }) => console.log(`Server is running on port ${port}`))
