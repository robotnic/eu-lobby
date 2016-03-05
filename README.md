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
(there may be some exeptions, but it should still import data)
see: http://stackoverflow.com/questions/24537220/how-to-import-large-json-file-into-mongodb-using-mongoimport

//copy field "_id" to "id"
```
db.dossiers.find().forEach(function(doc){doc.id=doc._id;db.dossiers.save(doc)})

```



## Implementation

* Angular Material
* Backend featherjs

## patch
https://raw.githubusercontent.com/dominictarr/JSONStream/master/index.js
