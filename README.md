# EU-Lobby

UI for http://parltrack.euwiki.org/

## INSTALL

Copy data
---------
```
node install.sh
```

Import to mongo
--------------
```
mongoimport --upsert --db feathers --collection messages --file ep_dossiers.json
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



## Implementation

* Angular Material
* Backend [featherjs](http://feathersjs.com/)

