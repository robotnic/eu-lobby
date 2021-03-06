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
cd eu-lobby
node install.sh
```

Import to mongo
--------------
```
mongoimport --upsert --db eulobby --collection dossiers --file data/dossiers.json 
mongoimport --upsert --db eulobby --collection meps_current --file data/meps_current.json 
mongoimport --upsert --db eulobby --collection votes --file data/votes.json 
mongoimport --upsert --db eulobby --collection amendments --file data/amendments.json 
mongoimport --upsert --db eulobby --collection comagendas --file data/comagendas.json 
```
(there may be lots of exeptions, but it should still import data)


//copy field "_id" to "id"
```
> mongo
use eulobby
db.dossiers.find().forEach(function(doc){doc.id=doc._id;db.dossiers.save(doc)})
db.amendments.find().forEach(function(doc){doc.id=doc._id;db.amendments.save(doc)})
//https://github.com/feathersjs/feathers-mongoose/issues/89

```
create index to speed up queries
```
db.votes.createIndex({"ts":1})
db.dossiers.createIndex({"createdAt":1})
db.dossiers.createIndex({"id":1})
db.dossiers.createIndex({"committees.committee":1})
db.meps_current.createIndex({"Groups.country":1})
db.meps_current.createIndex({"Birth.date":1})
db.votes.createIndex({"For.groups.votes.ep_id":1})
db.votes.createIndex({"Against.groups.votes.ep_id":1})
db.votes.createIndex({"Abstain.groups.votes.ep_id":1})
db.amendments.createIndex({"meps":1})
db.amendments.createIndex({"date":1})
db.amendments.createIndex({"committee":1})
db.amendments.createIndex({"reference":1})
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

## Screenshots

![alt tag](https://raw.githubusercontent.com/robotnic/eu-lobby/master/doc/images/Screenshot%20from%202016-05-01%2010-37-50.png)
![alt tag](https://raw.githubusercontent.com/robotnic/eu-lobby/master/doc/images/Screenshot%20from%202016-05-01%2010-39-54.png)
![alt tag](https://raw.githubusercontent.com/robotnic/eu-lobby/master/doc/images/Screenshot%20from%202016-05-01%2010-41-54.png)
![alt tag](https://raw.githubusercontent.com/robotnic/eu-lobby/master/doc/images/Screenshot%20from%202016-05-01%2010-42-47.png)

