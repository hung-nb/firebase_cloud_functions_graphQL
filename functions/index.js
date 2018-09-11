const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const functions = require('firebase-functions');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schemaPrinter = require('graphql/utilities/schemaPrinter');
const schema = require('./graphql/schema');

const app = express();
// BODYPARSER IS ALREADY IMPLEMENTED BY FIREBASE
app.use(cors());
app.options('*', cors());
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  return next();
});
app.use('/graphql', graphqlExpress({ schema: schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/api/graphql' }));
app.use('/schema', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(schemaPrinter.printSchema(schema));
});
exports.api = functions.https.onRequest(app);