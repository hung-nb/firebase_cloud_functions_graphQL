## Add 1 new project on Firebase
## Import this json into Firebase Database
`{ "categories" : { "category1" : { "name" : "ABC" }, "category2" : { "name" : "DEF" } } }
`
## Development process
* `$ npm install -g firebase-tools`
* `$ firebase login`
* `$ mkdir firebase_graphQL`
* `$ cd firebase_graphQL`
* `$ firebase init functions`
## Or if you already configured your firebase environment
* `$ cd functions`
* `$ yarn`
* `$ cd ..`
* `$ firebase use --add`
## Deployment process
* `$ firebase deploy --only functions`
* "Windows": "firebase.json" > Replace $RESOURCE_DIR with %RESOURCE_DIR% if deployment fails
* If deployment fails because of Node 6, it is necessary to update Cloud function into Node 8 by set this into the "functions/package.json" file
`"engines": {
    "node": "8"
},`
## Test on graphiQL
* `https://[xxxxxxxx].cloudfunctions.net/api/graphiql`
* Select data
`query {
categories{
    id
    name
}
}`
* Create data
`mutation createCategory($data:CategoryCreateInput!) {
createCategory(input: $data) {
  id
  name
}
}`
`{
  "data": {
    "name": "aaaaaa"
  }
}`
