## Add 1 new project on Firebase
## Import this json into Firebase Database
`{
  "folders" : {
    "a" : {
      "name" : "animals"
    },
    "f" : {
      "name" : "fruits"
    }
  }
}
`
## Development process
* `$ npm install -g firebase-tools`
* `$ firebase login`
* `$ mkdir firebase_graphQL`
* `$ cd firebase_graphQL`
* `$ firebase init functions`
## Deployment process
* `$ firebase deploy --only functions`
* "Windows": "firebase.json" > Replace $RESOURCE_DIR with %RESOURCE_DIR% if deployment fails
## Test on graphiQL
* Select data
`query {
  folders {
    id
    name
  }
}`
* Create data
`mutation createFolder($data:FolderCreateInput!) {
  createFolder(input: $data) {
		id
    name
  }
}`
`{
  "data": {
    "name": "abc"
  }
}`
