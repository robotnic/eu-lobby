# EU-Lobby

UI for http://parltrack.euwiki.org/

## INSTALL
```
git clone git@github.com:robotnic/eu-lobby.git
```

Copy data
---------
This script copies data from parltrack and unpacks it to the "data" folder. After db import you can delete the files in "data" folder.
```
node install.sh
```

Import to mongo
--------------
```
mongoimport --upsert --db eulobby --collection dossiers --file data/dossiers.json 
mongoimport --upsert --db eulobby --collection meps_current --file data/meps_current.json 
mongoimport --upsert --db eulobby --collection votes --file data/votes.json 
mongoimport --upsert --db eulobby --collection amendments --file data/amendments.json 
```
(there may be lots of exeptions, but it should still import data)


//copy field "_id" to "id"
```
db.dossiers.find().forEach(function(doc){doc.id=doc._id;db.dossiers.save(doc)})

```
use eulobby
create index to speed up queries
```
db.votes.createIndex({"ts":1})
db.dossiers.createIndex({"createdAt":1})
db.dossiers.createIndex({"id":1})
db.meps_current.createIndex({"Groups.country":1})
db.meps_current.createIndex({"Birth.date":1})

```
Start
--------
```
npm start
```
open in browser [http://localhost:3030](http://localhost:3030)





## Implementation

* Frontend [Angular Material](https://material.angularjs.org/latest/)
* Backend [featherjs](http://feathersjs.com/)

